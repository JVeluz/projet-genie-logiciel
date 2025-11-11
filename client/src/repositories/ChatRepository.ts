import Chat from "../models/Chat";
import ServerAPI from "../ServerAPI";

export default class ChatRepository {

    public static async getByID(chatID: string): Promise<any> {
        return Chat.fromJSON(
            await ServerAPI.get(`/chats/${chatID}`)
        );
    }

    public static async getOrCreateWithMessage(offerID: string, userID: string, message: string): Promise<Chat> {
        const body: BodyInit = JSON.stringify({
            offerID, buyerID: userID, message
        });
        return Chat.fromJSON(
            await ServerAPI.post(`/chats`, body)
        );
    }

    public static async sendMessage(chatID: string, senderID: string, content: string): Promise<void> {
        const body: BodyInit = JSON.stringify({
            senderID, content
        });
        await ServerAPI.post(`/chats/${chatID}`, body);
    }
}