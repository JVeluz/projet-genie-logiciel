import { model, ObjectId, Schema } from "mongoose";
import { Offer } from "./Offer";

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

chatSchema.post("save", async function (chat, next) {
    try {
        await Offer.updateOne(
            { _id: chat.offerID },
            { $push: { chatIDs: chat._id } }
        );
        next();
    } catch (error) {
        throw Error("Error updating user offers");
    }
});

chatSchema.post("findOneAndDelete", async function (chat) {
    try {
        await Offer.updateOne(
            { _id: chat.offerID },
            { $pull: { chatIDs: chat._id } }
        );
    } catch (error) {
        throw Error("Error updating user offers");
    }
});

export const Chat = model<IChat>("Chat", chatSchema);