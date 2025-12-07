import { IChat } from "../models/Chat";
import ChatRepository from "../repositories/ChatRepository";

export default class ChatService {

    public constructor(
        private chatRepository: ChatRepository
    ) { }

    public async getById(id: string): Promise<IChat> {
        const chat: IChat | null = await this.chatRepository.get(id);
        if (chat === null)
            throw new Error("Chat not found");
        return chat;
    }

    public async getByOfferAndBuyer(offerID: string, buyerID: string): Promise<IChat> {
        const chat: IChat | null = await this.chatRepository.getByOfferAndBuyer(offerID, buyerID);
        if (chat === null)
            throw new Error("Chat not found");
        return chat;
    }

    public async getOrCreateWithMessage(offerID: string, buyerID: string, message: string): Promise<IChat> {
        const chat: IChat | null = await this.chatRepository.getByOfferAndBuyer(offerID, buyerID);
        if (chat !== null) {
            await this.chatRepository.sendMessage(chat._id, buyerID, message);
            return chat;
        }
        const newChat: IChat = await this.chatRepository.create(offerID, buyerID);
        await this.chatRepository.sendMessage(newChat._id, buyerID, message);
        return newChat;
    }

    public async getMessages(chatID: string): Promise<IChat> {
        const chat: IChat | null = await this.chatRepository.getMessages(chatID);
        if (chat === null)
            throw new Error("Chat not found");
        return chat;
    }

    public async sendMessage(chatID: string, senderID: string, content: string): Promise<void> {
        const chat: IChat | null = await this.chatRepository.get(chatID);
        if (chat === null)
            throw new Error("Chat not found");
        await this.chatRepository.sendMessage(chatID, senderID, content);
    }
}