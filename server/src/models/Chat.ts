import { model, ObjectId, Schema } from "mongoose";

export interface IChat {
    _id: string;
    offerID: ObjectId;
    buyerID: ObjectId;
    sellerID: ObjectId;
    messages: {
        senderID: ObjectId;
        content: string;
        timestamp: Date;
    }[];
}

export const chatSchema = new Schema<IChat>({
    offerID: { type: Schema.Types.ObjectId, ref: "Offer", required: true },
    buyerID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sellerID: { type: Schema.Types.ObjectId, ref: "User" },
    messages: [{
        senderID: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }]
})

export const Chat = model<IChat>("Chat", chatSchema);