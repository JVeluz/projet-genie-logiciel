import ChatFetch from "../fetches/ChatFetch";
import Application, { Item } from "../models/Application";
import Chat from "../models/Chat";
import User from "../models/User";

export default class NewChatForm extends HTMLFormElement {

    // Attributes to inject
    private offerID: string | null = null;

    // Models
    private application = Application.getInstance();
    private currentUser: User | null = this.application.get(Item.CurrentUser);
    private token: string | null = this.application.get(Item.AuthToken);

    public async connectedCallback(): Promise<void> {
        await customElements.whenDefined("new-chat-form");

        this.offerID = this.getAttribute("offer-id");
        if (!this.offerID) {
            console.error("Missing required attributes.");
            return;
        }
        if (!this.currentUser || !this.token) {
            console.error("User is not authenticated.");
            return;
        }
        this.onsubmit = (event) => this.handleSubmit(event);
    }

    private async handleSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const message = formData.get("message") as string;
        const result = await ChatFetch.getOrCreateWithMessage(this.offerID!, this.currentUser!._id, message, this.token!);
        if (!result) {
            console.error("Failed to create or retrieve chat.");
            return;
        }
        const chat: Chat = Chat.fromJSON(result);
        window.location.href = `/offer/chat?id=${chat._id}`;
    }
}