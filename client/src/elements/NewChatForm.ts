import IUser from "shared/src/interfaces/IUser";
import Application from "../models/Application";
import ChatService from "../services/ChatService";
import IChat from "shared/src/interfaces/IChat";

export default class NewChatForm extends HTMLFormElement {

    // Services
    private chatService = new ChatService();

    // Attributes to inject
    public offerID: string | null = null;

    // Models
    private application = Application.getInstance();
    private currentUser: IUser | null = this.application.user.get();
    private token: string | null = this.application.token.get();

    public async connectedCallback(): Promise<void> {
        if (!this.currentUser || !this.token) {
            console.log("User is not authenticated.");
            return;
        }
        this.onsubmit = (event) => this.handleSubmit(event);
    }

    private async handleSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault();
        this.offerID = this.getAttribute("offer-id");
        if (!this.offerID) {
            console.error("Missing required attributes.");
            return;
        }
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const message = formData.get("message") as string;
        let chat: IChat;
        try {
            chat = await this.chatService.getOrCreateWithMessage(this.offerID!, this.currentUser!._id, message);
        } catch (error) {
            console.error("Error creating or retrieving chat:", error);
            return;
        }
        window.location.href = `/offer/chat?id=${chat._id}`;
    }
}