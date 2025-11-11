import Chat from "../models/Chat";
import User from "../models/User";
import ChatRepository from "../repositories/ChatRepository";

export default class ChatService {

    public static async getByID(chatID: string): Promise<Chat> {
        return await ChatRepository.getByID(chatID);
    }

    public static async getOrCreateWithMessage(offerID: string, userID: string, message: string): Promise<Chat> {
        return await ChatRepository.getOrCreateWithMessage(offerID, userID, message);
    }

    public static async sendMessage(chatID: string, content: string, currentUser: User): Promise<void> {
        if (!currentUser)
            throw new Error("Unauthorized: You must be logged in to send messages.");
        return await ChatRepository.sendMessage(chatID, currentUser._id, content);
    }
}