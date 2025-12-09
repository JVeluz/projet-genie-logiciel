import { IChat } from "shared";
import Application from "../models/Application";
import OfferPage, { ChatPreview, OfferPageModel } from "../pages/OfferPage";
import OfferElement from "../elements/OfferElement";
import UserElement from "../elements/UserElement";
import OfferService from "../services/OfferService";
import UserService from "../services/UserService";
import ChatService, { ChatSummaryDTO } from "../services/ChatService";
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
        if (!this.offerID) return;

        try {
            const offer = await this.offerService.getByID(this.offerID);

            const seller = await this.userService.getByID(
                typeof offer.sellerID === 'string' ? offer.sellerID : offer.sellerID._id
            );

            const currentUser = this.application.user.get();

            const isMine = this.offerService.isOwner(offer, currentUser);

            let chatDTOs: ChatSummaryDTO[] = [];
            if (offer.chatIDs.length > 0) {
                chatDTOs = await this.chatService.getSummaries(offer.chatIDs as unknown as IChat[]);
            }

            const chatPreviews: ChatPreview[] = chatDTOs.filter(dto => isMine || dto.buyerID === currentUser?._id).map(dto => ({
                id: dto.id,
                buyerName: dto.buyerName,
                lastMessage: dto.lastMessage
            }));

            this.model = {
                offerID: this.offerID,
                isUserLoggedIn: !!currentUser,
                isOfferMine: isMine,
                chats: chatPreviews
            };

            this.page.update(this.model);
            this.offerElement.update(offer);
            this.userElement.update(seller);

        } catch (error) {
            console.error("Error initializing page:", error);
        }
    }
}