import IChat from "shared/src/interfaces/IChat";
import IUser from "shared/src/interfaces/IUser";
import ChatRepository from "../repositories/ChatRepository";

export default class ChatService {

    public constructor(
        private chatRepository = new ChatRepository()
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
}