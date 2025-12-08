import IOffer from "shared/src/interfaces/IOffer";
import IUser from "shared/src/interfaces/IUser";
import OfferChatPageController from "../controllers/OfferChatPageController";
import HTML from "../html/offer-chat-page.html";
import HTMLLoader from "../html/HTMLLoader";
import OfferElement from "../elements/OfferElement";
import UserElement from "../elements/UserElement";

export class OfferChatPageModel {
    messages: Message[] = [];
    offer: Partial<IOffer> = {}
    seller?: IUser;
}

export class Message {
    public isMine: boolean = false;
    public content: string = "";
    public timestamp: Date = new Date();
}

const MESSAGE = `
<div class="d-flex justify-content-start mb-3">
    <div class="bg-secondary rounded-3 p-2">
        <p></p>
        <small class="text-muted" style="font-size: 0.75rem;"></small>
    </div>
</div>
`;

const MESSAGE_SELF = `
<div class="d-flex justify-content-end mb-3">
    <div class="bg-primary text-white rounded-3 p-2">
        <p></p>
        <small class="text-white-50" style="font-size: 0.75rem;"></small>
    </div>
</div>
`;

export default class OfferChatPage extends HTMLElement {

    public async connectedCallback(): Promise<void> {
        this.innerHTML = HTML;
        new OfferChatPageController(this);
    }

    public create(model: OfferChatPageModel): void {
        console.log(model);

        const offerElement: OfferElement = this.querySelector("offer-element") as OfferElement;
        const sellerElement: UserElement = this.querySelector(".offer-seller") as UserElement;

        offerElement.update(model.offer);
        if (model.seller)
            sellerElement.update(model.seller);

        const chatBox: HTMLDivElement = this.querySelector(".chat-box")!;
        for (const message of model.messages) {
            const messageElement: HTMLElement = (message.isMine) ?
                HTMLLoader.createElement(MESSAGE_SELF) :
                HTMLLoader.createElement(MESSAGE);

            const messageContent: HTMLDivElement = messageElement.querySelector("div")!;
            const messageText: HTMLParagraphElement = messageContent.querySelector("p")!;
            const messageTime: HTMLElement = messageContent.querySelector("small")!;
            messageText.textContent = message.content;
            messageTime.textContent = message.timestamp.toLocaleString();
            chatBox.appendChild(messageElement);
        }
    }

    public update(messages: Message[]): void {
        const chatBox: HTMLDivElement = this.querySelector(".chat-box")!;

        for (const message of messages) {
            const messageElement: HTMLElement = (message.isMine) ?
                HTMLLoader.createElement(MESSAGE_SELF) :
                HTMLLoader.createElement(MESSAGE);

            const messageContent: HTMLDivElement = messageElement.querySelector("div")!;
            const messageText: HTMLParagraphElement = messageContent.querySelector("p")!;
            const messageTime: HTMLElement = messageContent.querySelector("small")!;
            messageText.textContent = message.content;
            messageTime.textContent = message.timestamp.toLocaleString();

            chatBox.appendChild(messageElement);
        }

        chatBox.scrollTop = chatBox.scrollHeight;
    }
}