import { Chat, IChat } from "../models/Chat";

export default class ChatRepository {

    public static async get(chatID: string): Promise<IChat | null> {
        return Chat.findById(chatID);
    }

    public static async getByOfferAndBuyer(offerID: string, buyerID: string): Promise<IChat | null> {
        return Chat.findOne({ offerID, buyerID });
    }

    public static async create(offerID: string, buyerID: string): Promise<IChat> {
        return Chat.create({ offerID, buyerID });
    }

    public static async getMessages(chatID: string): Promise<IChat | null> {
        return Chat.findById(chatID).populate("messages");
    }

    public static async sendMessage(chatID: string, senderID: string, content: string): Promise<void> {
        await Chat.findByIdAndUpdate(chatID, {
            $push: { messages: { senderID, content } }
        });
    }
}