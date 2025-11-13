import HTML from "../html/offer-page.html";
import OfferPageController from "../controllers/OfferPageController";

export interface ChatPreview {
    id: string;
    buyerName: string;
    lastMessage: string;
}

export interface OfferPageModel {
    offerID: string;
    isOfferMine: boolean;
    isUserLoggedIn: boolean;
    chats: ChatPreview[];
}

const CHAT_PREVIEW = (chat: ChatPreview): string => {
    return `
        <a href="/offer/chat?id=${chat.id}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
                <strong class="mb-1">${chat.buyerName}</strong>    
                <p class="mb-0 text-muted text-truncate" style="max-width: 200px;">
                    ${chat.lastMessage}
                </p>
            </div>
            <span class="badge bg-danger rounded-pill">
                *
            </span>
        </a>
    `;
};

export default class OfferPage extends HTMLElement {

    public async connectedCallback(): Promise<void> {
        this.innerHTML = HTML;
        new OfferPageController(
            this,
            this.querySelector("#offer-element")!,
            this.querySelector("#offer-seller")!,
        );
    }

    public update(model: OfferPageModel): void {
        const editButton = this.querySelector("#offer-edit-button") as HTMLAnchorElement;
        const chatListCard = this.querySelector("#chat-list-card") as HTMLElement;
        const chatList = chatListCard.querySelector("#offer-chat-list") as HTMLElement;
        const tradeCard = this.querySelector("#trade-card") as HTMLElement;
        const newChatForm = this.querySelector("#new-chat-form") as HTMLFormElement;

        editButton.href = `/offer/edit?id=${model.offerID}`;
        editButton.style.display = model.isOfferMine ? "block" : "none";
        chatListCard.style.display = (model.isOfferMine && model.chats.length > 0) ? "block" : "none";
        tradeCard.style.display = (model.isUserLoggedIn && !model.isOfferMine) ? "block" : "none";

        (newChatForm as any).offerID = model.offerID;
        newChatForm.setAttribute("offer-id", model.offerID);

        chatList.innerHTML = "";
        for (const chat of model.chats) {
            const chatElement = document.createElement("div");
            chatElement.innerHTML = CHAT_PREVIEW(chat);
            chatList.appendChild(chatElement);
        }
    }
}