import { ObjectId, Schema, model } from "mongoose";
import { User } from "./User";
import { Chat } from "./Chat";

export interface IOffer {
    _id: string;
    title: string;
    description: string;
    price: number;
    available: boolean;
    category: string;
    type: string;
    createdAt: Date;

    exchange?: string;
    location?: string;
    pictures?: string[];
    comments?: string[];

    sellerID: ObjectId;
    chatIDs: ObjectId[];
}

export const offerSchema = new Schema<IOffer>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    available: { type: Boolean, default: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },

    exchange: { type: String },
    location: { type: String },
    pictures: { type: [String], default: [] },
    comments: { type: [String], default: [] },

    sellerID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    chatIDs: { type: [Schema.Types.ObjectId], ref: "Chat", default: [] },
});

offerSchema.post("save", async function (offer, next) {
    try {
        await User.updateOne(
            { _id: offer.sellerID },
            { $push: { offers: offer } }
        );
        next();
    } catch (error) {
        throw Error("Error saving offer to user offers");
    }
});

offerSchema.post("findOneAndDelete", async function (offer) {
    try {
        await Chat.deleteMany({ _id: { $in: offer.chatIDs } });
        await User.updateOne(
            { _id: offer.sellerID },
            { $pull: { offers: { _id: offer._id } } }
        );
    } catch (error) {
        throw Error("Error deleting offer from user offers");
    }
});

export const Offer = model<IOffer>("Offer", offerSchema);