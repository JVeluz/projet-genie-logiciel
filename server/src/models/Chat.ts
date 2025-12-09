import { IChat } from "shared";
import { model, Schema } from "mongoose";

export const chatSchema = new Schema<IChat>({
    offerID: { type: Schema.Types.ObjectId as any, ref: "Offer", required: true },
    buyerID: { type: Schema.Types.ObjectId as any, ref: "User", required: true },
    sellerID: { type: Schema.Types.ObjectId as any, ref: "User" },

    messages: [{
        sender: { type: Schema.Types.ObjectId as any, ref: "User", required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }]
});

chatSchema.post("save", async function (chat, next) {
    try {
        await model("Offer").updateOne(
            { _id: chat.offerID },
            { $push: { chatIDs: chat._id } }
        );
        next();
    } catch (error) {
        console.error(error);
    }
});

export const Chat = model<IChat>("Chat", chatSchema);