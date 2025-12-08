import IChat from "shared/src/interfaces/IChat";
import { Chat } from "../models/Chat";

export default class ChatRepository {

    public async get(chatID: string): Promise<IChat | null> {
        return Chat.findById(chatID)
            .populate("buyerID", "name avatar")
            .populate("offerID", "title price")
            .populate({
                path: "messages.sender",
                select: "name"
            })
            .exec();
    }

    public async getByOfferAndBuyer(offerID: string, buyerID: string): Promise<IChat | null> {
        return Chat.findOne({ offerID: offerID, buyerID })
            .populate("buyerID", "name")
            .populate("offerID", "title")
            .populate("messages.sender", "name")
            .exec();
    }

    public async create(offerID: string, buyerID: string): Promise<IChat> {
        return Chat.create({ offerID: offerID, buyerID, messages: [] });
    }

    public async getMessages(chatID: string): Promise<IChat | null> {
        return Chat.findById(chatID)
            .populate("messages.sender", "name")
            .select("messages")
            .exec();
    }

    public async sendMessage(chatID: string, senderID: string, content: string): Promise<void> {
        await Chat.findByIdAndUpdate(chatID, {
            $push: {
                messages: {
                    sender: senderID,
                    content,
                    timestamp: new Date()
                }
            }
        }).exec();
    }
}