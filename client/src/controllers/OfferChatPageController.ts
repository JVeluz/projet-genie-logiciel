import Application from "../models/Application";
import Chat from "../models/Chat";
import OfferChatPage, { OfferChatPageModel } from "../pages/OfferChatPage";
import ChatService from "../services/ChatService";
import OfferService from "../services/OfferService";
import UserService from "../services/UserService";

const UPDATE_WAIT_TIME: number = 10000; // 10 seconds

export default class OfferChatPageController {

    // URLSearchParams
    private urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    private chatID: string | null = this.urlParams.get("id");

    // Models
    private application: Application = Application.getInstance();
    private currentUser: any = this.application.user.get();
    private model: OfferChatPageModel = new OfferChatPageModel();

    // view
    private view: OfferChatPage;

    // Other
    private updateInterval!: NodeJS.Timeout;

    public constructor(view: OfferChatPage) {
        this.view = view;
        this.initialize();
    }

    public async initialize(): Promise<void> {
        // Preconditions
        if (!this.currentUser)
            throw new Error("user not connected");
        // URL Parameters
        if (!this.chatID)
            throw new Error("missing chat ID");

        let chat: Chat;
        try {
            // Fetch data
            chat = await ChatService.getByID(this.chatID);
            if (!chat)
                throw new Error("chat not found");

            this.model.offer = await OfferService.getByID(chat.offerID);
            if (!this.model.offer)
                throw new Error("offer not found");

            this.model.seller = await UserService.getByID(this.model.offer.sellerID);
            if (!this.model.seller)
                throw new Error("seller not found");

        } catch (error) {
            console.error(`Error Fetching data: ${error}`);
            return;
        }

        // Processing data
        for (let i = 0; i < chat.messages.length; i++) {
            const message = chat.messages[i];
            this.model.messages.push({
                isMine: message.senderID === this.currentUser._id,
                content: message.content,
                timestamp: message.timestamp
            });
        }
        this.connectEvents();
        this.view.create(this.model);
    }

    private connectEvents(): void {
        const messageForm = this.view.querySelector(".message-form") as HTMLFormElement;
        messageForm.onsubmit = (event) => this.onSubmitMessage(event);
        if (this.updateInterval)
            clearInterval(this.updateInterval);
        this.updateInterval = setInterval(() => this.keepUpdated(), UPDATE_WAIT_TIME);
    }

    private async onSubmitMessage(event: SubmitEvent): Promise<void> {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData: FormData = new FormData(form);
        const message = formData.get("message") as string;
        await ChatService.sendMessage(this.chatID!, message, this.currentUser);
        form.reset();
    }

    private async keepUpdated(): Promise<void> {
        let newChat: Chat;
        try {
            newChat = await ChatService.getByID(this.chatID!);
        } catch (error) {
            console.error(`Error updating chat: ${error}`);
        }

        const oldMessagesCount = this.model.messages.length;
        const newMessagesCount = newChat!.messages.length;

        const newMessages = newChat!.messages.map(msg => ({
            isMine: msg.senderID === this.currentUser._id,
            content: msg.content,
            timestamp: msg.timestamp
        }));

        if (newMessagesCount > oldMessagesCount) {
            this.view.update(newMessages.slice(oldMessagesCount));
        }

        this.model.messages = newMessages;
    }
}