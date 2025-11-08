import HTML from "../html/offer-chat-page.html";
import HTMLLoader from "../html/HTMLLoader";
import Application, { Item } from "../models/Application";
import Chat from "../models/Chat";
import Offer from "../models/Offer";
import User from "../models/User";
import ChatFetch from "../fetches/ChatFetch";
import OfferFetch from "../fetches/OfferFetch";
import UserFetch from "../fetches/UserFetch";
import OfferElement from "./OfferElement";
import UserElement from "./UserElement";

const UPDATE_WAIT_TIME: number = 10000; // 10 seconds

const MESSAGE_TEMPLATE = `
<div class="d-flex justify-content-start mb-3">
    <div class="bg-secondary rounded-3 p-2">
        <p></p>
        <small class="text-muted" style="font-size: 0.75rem;"></small>
    </div>
</div>
`;

const MESSAGE_TEMPLATE_SELF = `
<div class="d-flex justify-content-end mb-3">
    <div class="bg-primary text-white rounded-3 p-2">
        <p></p>
        <small class="text-white-50" style="font-size: 0.75rem;"></small>
    </div>
</div>
`;

export default class OfferChatPage extends HTMLElement {

    // URLSearchParams
    private urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    private chatID: string | null = this.urlParams.get("id");

    // Models
    private application: Application = Application.getInstance();
    private currentUser: User | null = this.application.get(Item.CurrentUser);
    private token: string | null = this.application.get(Item.AuthToken);
    private chat: Chat | null = null;
    private offer: Offer | null = null;
    private otherUser: User | null = null;

    // Other
    private isCurrentUserSeller: boolean = false;
    private updateInterval!: NodeJS.Timeout;

    public async connectedCallback(): Promise<void> {
        await this.initialize();
        this.create();
        this.update();
        this.connectEvents();
        this.updateInterval = setInterval(() => this.keepUpdated(), UPDATE_WAIT_TIME);
    }

    public async disconnectedCallback(): Promise<void> {
        clearInterval(this.updateInterval);
    }

    public async initialize(): Promise<void> {
        if (!this.currentUser || !this.token) {
            console.error("user not connected");
            return;
        }

        if (!this.chatID) {
            console.error("invalid url");
            return;
        }

        await ChatFetch.get(this.chatID, this.token).then(result => {
            this.chat = result ? Chat.fromJSON(result) : null;
        });
        if (!this.chat) {
            console.error("chat not found");
            return;
        }

        await OfferFetch.get(this.chat.offerID).then(result => {
            this.offer = result ? Offer.fromJSON(result) : null;
        });
        if (!this.offer) {
            console.error("offer not found");
            return;
        }

        this.isCurrentUserSeller = this.currentUser._id === this.offer.sellerID;
        const otherUserID: string = this.isCurrentUserSeller ? this.chat.buyerID : this.offer.sellerID;
        await UserFetch.get(otherUserID).then(result => {
            this.otherUser = result ? User.fromJSON(result) : null;
        });

    }

    public create(): void {
        this.innerHTML = HTML;
        const offerElement: OfferElement = this.querySelector("offer-element") as OfferElement;
        const sellerElement: UserElement = this.querySelector(".offer-seller") as UserElement;
        customElements.whenDefined("offer-element").then(() => {
            offerElement.update(this.offer!);
        });
        customElements.whenDefined("user-element").then(() => {
            sellerElement.update(
                this.isCurrentUserSeller ? this.currentUser! : this.otherUser!
            );
        });
        console.log(this.chat);
    }

    public update(): void {
        console.log("update()");

        const chatBox: HTMLDivElement = this.querySelector(".chat-box")!;
        chatBox.innerHTML = "";

        for (const message of this.chat!.messages) {
            const isSelf: boolean = message.senderID === this.currentUser!._id;
            const messageElement: HTMLElement = (isSelf) ?
                HTMLLoader.createElement(MESSAGE_TEMPLATE_SELF) :
                HTMLLoader.createElement(MESSAGE_TEMPLATE);

            const messageContent: HTMLDivElement = messageElement.querySelector("div")!;
            const messageText: HTMLParagraphElement = messageContent.querySelector("p")!;
            const messageTime: HTMLElement = messageContent.querySelector("small")!;
            messageText.textContent = message.content;
            messageTime.textContent = message.timestamp.toLocaleString();
            chatBox.appendChild(messageElement);
        }
    }

    private connectEvents(): void {
        const messageForm = this.querySelector(".message-form") as HTMLFormElement;
        messageForm.onsubmit = (event) => this.onSubmitMessage(event);
    }

    private onSubmitMessage(event: SubmitEvent): void {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData: FormData = new FormData(form);
        const message = formData.get("message") as string;
        ChatFetch.sendMessage(this.chat!._id, this.currentUser!._id, message, this.token!);
        form.reset();
    }

    public async keepUpdated(): Promise<void> {
        await ChatFetch.get(this.chat!._id, this.token!).then(result => {
            this.chat = result ? Chat.fromJSON(result) : null;
        });
        if (!this.chat) {
            // window.location.href = "/404";
            return;
        }
        this.update();
    }
}