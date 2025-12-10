// import { IChat } from "shared";
// import Application from "../models/Application";
// import OfferChatPage, { Message, OfferChatPageModel } from "../pages/OfferChatPage";
// import ChatService from "../services/ChatService";
// import OfferService from "../services/OfferService";
// import UserService from "../services/UserService";

// const UPDATE_WAIT_TIME: number = 10000; // 10 seconds

// export default class OfferChatPageController {

//     // Services
//     private userService = new UserService();
//     private offerService = new OfferService();
//     private chatService = new ChatService();
//     // URLSearchParams
//     private urlParams: URLSearchParams = new URLSearchParams(window.location.search);
//     private chatID: string | null = this.urlParams.get("id");
//     // Models
//     private application: Application = Application.getInstance();
//     private currentUser: any = this.application.user.get();
//     private model: OfferChatPageModel = new OfferChatPageModel();
//     // view
//     private view: OfferChatPage;
//     // Other
//     private updateInterval!: NodeJS.Timeout;

//     public constructor(view: OfferChatPage) {
//         this.view = view;
//         this.initialize();
//     }

//     public async initialize(): Promise<void> {
//         // Preconditions
//         if (!this.currentUser)
//             throw new Error("user not connected");
//         // URL Parameters
//         if (!this.chatID)
//             throw new Error("missing chat ID");

//         let chat: IChat;
//         try {
//             // Fetch data
//             chat = await this.chatService.getByID(this.chatID);
//             if (!chat)
//                 throw new Error("chat not found");

//             this.model.offer = await this.offerService.getByID(chat.offerID._id);
//             if (!this.model.offer)
//                 throw new Error("offer not found");

//             this.model.seller = await this.userService.getByID(this.model.offer.sellerID?._id!);
//             if (!this.model.seller)
//                 throw new Error("seller not found");

//         } catch (error) {
//             console.error(`Error Fetching data: ${error}`);
//             return;
//         }

//         // Processing data
//         for (let i = 0; i < chat.messages.length; i++) {
//             const message = chat.messages[i];
//             this.model.messages.push({
//                 isMine: message.sender ?
//                     message.sender._id === this.currentUser._id
//                     :
//                     (message as any).senderID === this.currentUser._id,
//                 content: message.content,
//                 timestamp: message.timestamp
//             });
//         }

//         if (this.model.offer.sellerID._id === this.currentUser._id) {
//             this.model.isMyOffer = true;
//             this.model.buyer = chat.buyerID;
//         }

//         this.connectEvents();
//         this.view.create(this.model);
//     }

//     private connectEvents(): void {
//         const messageForm = this.view.querySelector(".message-form") as HTMLFormElement;
//         messageForm.onsubmit = (event) => this.onSubmitMessage(event);

//         const reserveBtn = this.view.querySelector(".ask-for-exchange");
//         if (reserveBtn) reserveBtn.addEventListener("click", (e) => this.onReserve(e));

//         const confirmBtn = this.view.querySelector(".accept-exchange");
//         if (confirmBtn) confirmBtn.addEventListener("click", (e) => this.onConfirm(e));

//         const cancelBtn = this.view.querySelector(".refuse-exchange");
//         if (cancelBtn) cancelBtn.addEventListener("click", (e) => this.onCancel(e));

//         if (this.updateInterval)
//             clearInterval(this.updateInterval);
//         this.updateInterval = setInterval(() => this.keepUpdated(), UPDATE_WAIT_TIME);
//     }

//     private async onReserve(event: Event): Promise<void> {
//         event.preventDefault();
//         if (!this.model.offer || !this.chatID) return;
//         try {
//             const chat = await this.chatService.getByID(this.chatID);
//             const buyerID = typeof chat.buyerID === 'string' ? chat.buyerID : chat.buyerID._id;
//             await this.offerService.reserve(this.model.offer._id, buyerID);
//             window.location.reload();
//         } catch (error) {
//             console.error("Erreur lors de la réservation :", error);
//             alert("Impossible de réserver cette offre.");
//         }
//     }

//     private async onConfirm(event: Event): Promise<void> {
//         event.preventDefault();
//         if (!this.model.offer) return;
//         try {
//             await this.offerService.confirm(this.model.offer._id);
//             window.location.reload();
//         } catch (error) {
//             console.error("Erreur lors de la confirmation :", error);
//             alert("Impossible de confirmer l'échange.");
//         }
//     }

//     private async onCancel(event: Event): Promise<void> {
//         event.preventDefault();
//         if (!this.model.offer) return;
//         if (!confirm("Voulez-vous vraiment annuler la transaction ?")) return;
//         try {
//             await this.offerService.cancel(this.model.offer._id);
//             window.location.reload();
//         } catch (error) {
//             console.error("Erreur lors de l'annulation :", error);
//         }
//     }

//     private async onSubmitMessage(event: SubmitEvent): Promise<void> {
//         event.preventDefault();
//         const form = event.target as HTMLFormElement;
//         const formData: FormData = new FormData(form);
//         const content = formData.get("message") as string;
//         await this.chatService.sendMessage(this.chatID!, content, this.currentUser);
//         const message: Message = {
//             content,
//             isMine: true,
//             timestamp: new Date()
//         }
//         this.model.messages.push(message);
//         this.view.update(this.model);
//         form.reset();
//     }

//     private async keepUpdated(): Promise<void> {
//         let newChat: IChat;
//         try {
//             newChat = await this.chatService.getByID(this.chatID!);
//         } catch (error) {
//             console.error(`Error updating chat: ${error}`);
//         }

//         const oldMessagesCount = this.model.messages.length;
//         const newMessagesCount = newChat!.messages.length;

//         const newMessages = newChat!.messages.map(message => ({
//             isMine: message.sender ?
//                 message.sender._id === this.currentUser._id
//                 :
//                 (message as any).senderID === this.currentUser._id,
//             content: message.content,
//             timestamp: message.timestamp
//         }));

//         if (newMessagesCount > oldMessagesCount) {
//             this.view.update(this.model);
//         }

//         this.model.messages = newMessages;
//     }
// }