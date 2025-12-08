import IOffer from "shared/src/interfaces/IOffer";
import IUser from "shared/src/interfaces/IUser";
import IChat from "shared/src/interfaces/IChat";
import Application from "../models/Application";
import OfferPage, { ChatPreview, OfferPageModel } from "../pages/OfferPage";
import OfferElement from "../elements/OfferElement";
import UserElement from "../elements/UserElement";
import OfferService from "../services/OfferService";
import UserService from "../services/UserService";
import ChatService from "../services/ChatService";
import { WithLoading } from "./decorators";

export default class OfferPageController {

    // Services
    private userService = new UserService();
    private chatService = new ChatService();
    private offerService = new OfferService();

    // URL Parameters
    private urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    private offerID: string | null = this.urlParams.get("id");
    // Model
    private application: Application = Application.getInstance();
    private model: OfferPageModel = {
        offerID: "", isOfferMine: false, isUserLoggedIn: false, chats: []
    };
    // View
    private page: OfferPage;
    private offerElement: OfferElement;
    private userElement: UserElement;

    public constructor(page: OfferPage, offerElement: OfferElement, userElement: UserElement) {
        this.page = page;
        this.offerElement = offerElement;
        this.userElement = userElement;
        this.initialize();
    }

    @WithLoading()
    public async initialize(): Promise<void> {
        // URL Parameters
        if (!this.offerID) {
            console.error("Offer ID is missing in URL parameters.");
            return;
        }

        // Fetching Data
        let offer: IOffer
        try {
            offer = await this.offerService.getByID(this.offerID);
        } catch (error) {
            console.error("Error fetching offer data:", error);
            return;
        }

        let seller: IUser;
        try {
            seller = await this.userService.getByID(offer.sellerID);
        } catch (error) {
            console.error("Error fetching seller data:", error);
            return;
        }

        let chats: IChat[] = [];
        let buyers: IUser[] = [];
        for (const chatID of offer.chatIDs) {
            try {
                const chat: IChat = await this.chatService.getByID(chatID);
                const buyer: IUser = await this.userService.getByID(chat.buyerID);
                buyers.push(buyer);
                chats.push(chat);
            } catch (error) {
                console.error(`Error fetching chat data for chat ID ${chatID}:`, error);
            }
        }

        // Updating Model
        this.model.offerID = this.offerID;
        const currentUser: IUser | null = this.application.user.get();
        this.model.isUserLoggedIn = currentUser !== null;
        if (currentUser) {
            this.model.isOfferMine = currentUser.offers.some(offer => offer._id === this.offerID);
            for (let i = 0; i < chats.length; i++) {
                const chat: IChat = chats[i];
                const buyer: IUser = buyers[i];
                const lastMessage: string = (chat.messages.length > 0) ?
                    chat.messages[chat.messages.length - 1].content : "";
                const chatPreview: ChatPreview = {
                    id: chat._id, buyerName: buyer.name, lastMessage: lastMessage
                };
                this.model.chats.push(chatPreview);
            }
        }
        this.page.update(this.model);
        this.offerElement.update(offer);
        this.userElement.update(seller);
    }
}