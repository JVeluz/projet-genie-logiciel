import { IChat } from "shared";
import ServerAPI from "../ServerAPI";
import ChatMapper from "../mappers/ChatMapper";

export default class ChatRepository {

    public async getByID(chatID: string): Promise<IChat> {
        const response = await ServerAPI.get(`/chats/${chatID}`);
        return ChatMapper.toDomain(response);
    }

    public async getOrCreateWithMessage(offerID: string, userID: string, message: string): Promise<IChat> {
        const body = JSON.stringify({ offerID, buyerID: userID, message });
        const response = await ServerAPI.post(`/chats`, body);
        return ChatMapper.toDomain(response);
    }

    public async sendMessage(chatID: string, senderID: string, content: string): Promise<void> {
        const body = JSON.stringify({ senderID, content });
        await ServerAPI.post(`/chats/${chatID}`, body);
    }
}