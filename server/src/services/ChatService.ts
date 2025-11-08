import { IChat } from "../models/Chat";
import ChatRepository from "../repositories/ChatRepository";

export default class ChatService {

    public static async getById(id: string): Promise<IChat> {
        const chat: IChat | null = await ChatRepository.get(id);
        if (chat === null)
            throw new Error("Chat not found");
        return chat;
    }

    public static async getByOfferAndBuyer(offerID: string, buyerID: string): Promise<IChat> {
        const chat: IChat | null = await ChatRepository.getByOfferAndBuyer(offerID, buyerID);
        if (chat === null)
            throw new Error("Chat not found");
        return chat;
    }

    public static async getOrCreate(offerID: string, buyerID: string): Promise<IChat> {
        const chat: IChat | null = await ChatRepository.getByOfferAndBuyer(offerID, buyerID);
        if (chat !== null)
            return chat;
        const newChat: IChat = await ChatRepository.create(offerID, buyerID);
        return newChat;
    }

    public static async getMessages(chatID: string): Promise<IChat> {
        const chat: IChat | null = await ChatRepository.getMessages(chatID);
        if (chat === null)
            throw new Error("Chat not found");
        return chat;
    }

    public static async sendMessage(chatID: string, senderID: string, content: string): Promise<void> {
        const chat: IChat | null = await ChatRepository.get(chatID);
        if (chat === null)
            throw new Error("Chat not found");
        await ChatRepository.sendMessage(chatID, senderID, content);
    }
}