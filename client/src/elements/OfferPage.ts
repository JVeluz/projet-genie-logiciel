import ChatFetch from "../fetches/ChatFetch";
import OfferFetch from "../fetches/OfferFetch";
import UserFetch from "../fetches/UserFetch";
import HTML from "../html/offer-page.html";
import Application, { Item } from "../models/Application";
import Chat from "../models/Chat";
import Offer from "../models/Offer";
import User from "../models/User";

const CHAT_PREVIEW = (chat: Chat, buyer: User): string => {
    const lastMessage = chat.messages.length > 0 ?
        chat.messages[chat.messages.length - 1].content : "Pas de messages encore.";
    return `
        <a href="/offer/chat?id=${chat._id}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
                <strong class="mb-1">${buyer.name}</strong>    
                <p class="mb-0 text-muted text-truncate" style="max-width: 200px;">
                    ${lastMessage}
                </p>
            </div>
            <span class="badge bg-danger rounded-pill">
                *
            </span>
        </a>
    `;
};

export default class OfferPage extends HTMLElement {

    // URL Parameters
    private urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    private offerID: string | null = this.urlParams.get("id");

    // Models
    private application: Application = Application.getInstance();
    private currentUser: User | null = this.application.get(Item.CurrentUser);
    private token: string | null = this.application.get(Item.AuthToken);
    private offer: Offer | null = null;

    // Computed
    private isOfferMine: boolean = false;

    public async connectedCallback(): Promise<void> {
        await customElements.whenDefined("offer-page");
        await this.ready();
        await this.create();
    }

    private async ready(): Promise<void> {
        if (!this.offerID) {
            console.error("Offer ID is missing in URL parameters.");
            return;
        }
        this.offer = await OfferFetch.get(this.offerID);
        if (!this.offer) {
            console.error("Offer not found.");
            return;
        }
        if (this.currentUser) {
            this.isOfferMine = this.currentUser.offers.some(offer => offer._id === this.offerID);
        }
    }

    private async create(): Promise<void> {
        this.innerHTML = HTML;

        const offerElement = this.querySelector("#offer-element") as HTMLElement;
        const chatForm = this.querySelector("#new-chat-form") as HTMLElement;
        const editButton = this.querySelector("#offer-edit-button") as HTMLAnchorElement;
        const tradeCard = this.querySelector("#trade-card") as HTMLElement;
        const chatListCard = this.querySelector("#chat-list-card") as HTMLElement;
        const chatList = chatListCard.querySelector("#offer-chat-list") as HTMLElement;

        offerElement.setAttribute("offer-id", this.offerID!);
        chatForm.setAttribute("offer-id", this.offerID!);
        editButton.href = `/offer/edit?id=${this.offerID!}`;

        for (const chatID of this.offer!.chatIDs) {
            const chatElement = document.createElement("div");
            const result = await ChatFetch.get(chatID, this.token!);
            const chat: Chat = Chat.fromJSON(result);
            const buyer: User = await UserFetch.get(chat.buyerID);
            chatElement.innerHTML = CHAT_PREVIEW(chat, buyer);
            chatList.appendChild(chatElement);
        }

        const displayChatListCard = this.offer!.chatIDs.length > 0;

        editButton.style.display = this.isOfferMine ? "block" : "none";
        tradeCard.style.display = this.isOfferMine ? "none" : "block";
        chatListCard.style.display = displayChatListCard ? "block" : "none";
    }
}