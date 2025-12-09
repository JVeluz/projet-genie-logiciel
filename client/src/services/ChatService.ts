import { IChat, IUser } from "shared";
import ChatRepository from "../repositories/ChatRepository";
import UserService from "./UserService";

export interface ChatSummaryDTO {
    id: string;
    buyerName: string;
    buyerID: string;
    lastMessage: string;
}

export default class ChatService {

    public constructor(
        private chatRepository = new ChatRepository(),
        private userService = new UserService()
    ) { }

    public async getByID(chatID: string): Promise<IChat> {
        return await this.chatRepository.getByID(chatID);
    }

    public async getOrCreateWithMessage(offerID: string, userID: string, message: string): Promise<IChat> {
        return await this.chatRepository.getOrCreateWithMessage(offerID, userID, message);
    }

    public async sendMessage(chatID: string, content: string, currentUser: IUser): Promise<void> {
        if (!currentUser)
            throw new Error("Unauthorized: You must be logged in to send messages.");
        return await this.chatRepository.sendMessage(chatID, currentUser._id, content);
    }

    public async getSummaries(chats: IChat[]): Promise<ChatSummaryDTO[]> {
        const promises = chats.map(async (chat) => {
            let buyerName = "Inconnu";
            let buyerId = "";

            try {
                const idToFetch = typeof chat.buyerID === 'string' ? chat.buyerID : chat.buyerID._id;
                const buyer = await this.userService.getByID(idToFetch);
                buyerName = buyer.name;
                buyerId = buyer._id;
            } catch (e) {
                console.error("Erreur récupération acheteur", e);
            }

            const lastMessage = chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1].content
                : "";

            return {
                id: chat._id,
                buyerName: buyerName,
                buyerID: buyerId,
                lastMessage: lastMessage
            };
        });

        return Promise.all(promises);
    }
}