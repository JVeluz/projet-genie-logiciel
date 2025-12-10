import { IChat, IOffer, IUser, OfferStatus } from "shared";
import Application from "../models/Application";
import ChatService from "../services/ChatService";
import OfferService from "../services/OfferService";
import UserService from "../services/UserService";
import HTMLLoader from "../html/HTMLLoader";
import HTML from "../html/offer-chat-page.html";
import OfferElement from "../elements/OfferElement";
import UserElement from "../elements/UserElement";

export class Message {
    public isMine: boolean = false;
    public content: string = "";
    public timestamp: Date = new Date();
}

type PageState = 'DISCUSSION' | 'PROPOSED' | 'CONFIRMED' | 'UNAVAILABLE';

const MESSAGE_TEMPLATE = (isMine: boolean, content: string, date: string) => `
    <div class="d-flex justify-content-${isMine ? "end" : "start"} mb-3">
        <div class="${isMine ? "bg-primary text-white" : "border"} rounded-3 p-3 shadow-sm" style="max-width: 75%;">
            <p class="mb-1 text-break">${content}</p>
            <small class="${isMine ? "text-white-50" : "text-muted"} d-block text-end" style="font-size: 0.7rem;">${date}</small>
        </div>
    </div>
`;

export default class OfferChatPage extends HTMLElement {

    private userService = new UserService();
    private offerService = new OfferService();
    private chatService = new ChatService();
    private application = Application.getInstance();

    private currentUser: IUser | null = this.application.user.get();
    private chatID: string | null = new URLSearchParams(window.location.search).get("id");

    private offer!: IOffer;
    private chat!: IChat;
    private messages: Message[] = [];
    private buyer?: IUser;
    private seller?: IUser;

    private isMyOffer: boolean = false;
    private pageState: PageState = 'DISCUSSION';

    private proposeButton!: HTMLButtonElement;
    private cancelButton!: HTMLButtonElement;
    private acceptButton!: HTMLButtonElement;
    private refuseButton!: HTMLButtonElement;
    private statusBadge!: HTMLElement;
    private chatBox!: HTMLDivElement;

    private updateInterval!: NodeJS.Timeout;
    private readonly UPDATE_WAIT_TIME: number = 5000;

    public async connectedCallback(): Promise<void> {
        this.innerHTML = HTML;
        this.cacheDomElements();

        if (!this.currentUser || !this.chatID) {
            console.error("Missing user or chatID");
            return;
        }

        this.bindEvents();
        await this.fetchData();
        this.updateInterval = setInterval(() => this.pollMessages(), this.UPDATE_WAIT_TIME);
    }

    public disconnectedCallback(): void {
        if (this.updateInterval) clearInterval(this.updateInterval);
    }

    private async fetchData(): Promise<void> {
        try {
            this.chat = await this.chatService.getByID(this.chatID!);
            if (!this.chat) throw new Error("Chat not found");

            const offerId = typeof this.chat.offerID === 'string' ? this.chat.offerID : this.chat.offerID._id;
            this.offer = await this.offerService.getByID(offerId);

            const sellerId = this.offer.sellerID._id || (this.offer.sellerID as unknown as string);
            this.seller = await this.userService.getByID(sellerId);

            const buyerId = typeof this.chat.buyerID === 'string' ? this.chat.buyerID : this.chat.buyerID._id;
            this.buyer = await this.userService.getByID(buyerId);

            this.calculateState();
            this.render();

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    private calculateState(): void {
        this.isMyOffer = (this.seller?._id === this.currentUser?._id);

        const currentChatBuyerId = this.buyer?._id;
        const isLinkedToThisChat = (this.offer.reservedTo === currentChatBuyerId);

        if (this.offer.status === OfferStatus.EXCHANGED) {
            if (isLinkedToThisChat) {
                this.pageState = 'CONFIRMED';
            } else {
                this.pageState = 'UNAVAILABLE';
            }
        }
        else if (this.offer.status === OfferStatus.PENDING) {
            if (isLinkedToThisChat) {
                this.pageState = 'PROPOSED';
            } else {
                this.pageState = 'UNAVAILABLE';
            }
        }
        else {
            this.pageState = 'DISCUSSION';
        }

        this.messages = this.chat.messages.map(message => ({
            content: message.content,
            timestamp: new Date(message.timestamp),
            isMine: (message.sender && message.sender._id === this.currentUser?._id)
                || ((message as any).senderID === this.currentUser?._id)
        }));
    }

    private render(): void {
        const offerElement = this.querySelector("offer-element") as OfferElement;
        if (offerElement) offerElement.update(this.offer);
        this.renderHeaderProfile();
        this.renderActionButtons();
        this.renderMessages();
    }

    private renderHeaderProfile(): void {
        const partner = this.isMyOffer ? this.buyer : this.seller;
        const partnerElement = this.querySelector(".chat-partner") as UserElement;
        if (partner && partnerElement) partnerElement.update(partner);
    }

    private renderActionButtons(): void {
        [this.proposeButton, this.cancelButton, this.acceptButton, this.refuseButton].forEach(button => {
            button.classList.add('d-none');
            button.classList.remove('d-flex');
        });

        this.statusBadge.className = "exchange-status badge border p-2 me-2";

        switch (this.pageState) {
            case 'UNAVAILABLE':
                this.statusBadge.textContent = "Offre non disponible";
                this.statusBadge.classList.add("bg-secondary", "text-white");
                break;

            case 'CONFIRMED':
                this.statusBadge.innerHTML = `<i class="bi bi-check-all"></i> Échange terminé`;
                this.statusBadge.classList.add("bg-success", "text-white");
                break;

            case 'PROPOSED':
                if (this.isMyOffer) {
                    this.statusBadge.textContent = "Accepter l'échange ?";
                    this.statusBadge.classList.add("bg-warning", "text-dark");
                    this.showElement(this.acceptButton);
                    this.showElement(this.refuseButton);
                } else {
                    this.statusBadge.textContent = "En attente de validation";
                    this.statusBadge.classList.add("bg-info", "text-dark");
                    this.showElement(this.cancelButton);
                }
                break;

            case 'DISCUSSION':
            default:
                this.statusBadge.textContent = "En discussion";
                this.statusBadge.classList.add("bg-light", "text-dark");

                if (!this.isMyOffer) {
                    this.showElement(this.proposeButton);
                }
                break;
        }
    }

    private renderMessages(): void {
        this.chatBox.innerHTML = "";
        if (this.messages.length === 0) {
            this.chatBox.innerHTML = `<div class="text-center text-muted mt-4">Début de la conversation</div>`;
            return;
        }
        this.messages.forEach(message => {
            this.chatBox.appendChild(HTMLLoader.createElement(
                MESSAGE_TEMPLATE(message.isMine, message.content, message.timestamp.toLocaleString())
            ));
        });
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }

    private async onPropose(): Promise<void> {
        if (!confirm("Proposer un échange pour cet objet ?")) return;
        await this.performApiAction(() => this.offerService.reserve(this.offer._id, this.currentUser!._id));
    }

    private async onAccept(): Promise<void> {
        if (!confirm("Valider cet échange ?")) return;
        await this.performApiAction(() => this.offerService.confirm(this.offer._id));
    }

    private async onCancelRefuse(): Promise<void> {
        const actionName = this.isMyOffer ? "refuser" : "annuler";
        if (!confirm(`Voulez-vous ${actionName} cette demande ?`)) return;
        await this.performApiAction(() => this.offerService.cancel(this.offer._id));
    }

    private async performApiAction(apiAction: () => Promise<void>): Promise<void> {
        try {
            await apiAction();
            await this.fetchData();
        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue.");
        }
    }

    private async onSubmitMessage(event: Event): Promise<void> {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const content = formData.get("message") as string;
        if (!content.trim()) return;

        try {
            await this.chatService.sendMessage(this.chatID!, content, this.currentUser!);
            form.reset();
            this.messages.push({ isMine: true, content, timestamp: new Date() });
            this.renderMessages();
        } catch (error) {
            console.error(error);
            alert("Erreur d'envoi");
        }
    }

    private async pollMessages(): Promise<void> {
        try {
            const freshChat = await this.chatService.getByID(this.chatID!);
            const freshOffer = await this.offerService.getByID(this.offer._id);

            const statusChanged = freshOffer.status !== this.offer.status || freshOffer.reservedTo !== this.offer.reservedTo;
            const messagesChanged = freshChat.messages.length !== this.messages.length;

            if (statusChanged || messagesChanged) {
                await this.fetchData();
            }
        } catch (error) {
            console.error("Polling error", error);
        }
    }

    private cacheDomElements(): void {
        this.proposeButton = this.querySelector(".btn-propose") as HTMLButtonElement;
        this.cancelButton = this.querySelector(".btn-cancel") as HTMLButtonElement;
        this.acceptButton = this.querySelector(".btn-accept") as HTMLButtonElement;
        this.refuseButton = this.querySelector(".btn-refuse") as HTMLButtonElement;
        this.statusBadge = this.querySelector(".exchange-status") as HTMLElement;
        this.chatBox = this.querySelector(".chat-box") as HTMLDivElement;
    }

    private bindEvents(): void {
        const form = this.querySelector(".message-form");
        if (form) form.addEventListener("submit", (event) => this.onSubmitMessage(event));

        this.bindClickEvent(this.proposeButton, () => this.onPropose());
        this.bindClickEvent(this.cancelButton, () => this.onCancelRefuse());
        this.bindClickEvent(this.acceptButton, () => this.onAccept());
        this.bindClickEvent(this.refuseButton, () => this.onCancelRefuse());
    }

    private bindClickEvent(element: HTMLElement, handler: () => void) {
        if (element) element.addEventListener("click", handler);
    }

    private showElement(element: HTMLElement) {
        if (element) {
            element.classList.remove('d-none');
            element.classList.add('d-flex');
        }
    }
}