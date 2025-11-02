import { Schema, model } from "mongoose";
import { User } from "./User";

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

    sellerID: Schema.Types.ObjectId;
}

export const offerSchema = new Schema<IOffer>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },

    exchange: { type: String },
    location: { type: String },
    pictures: { type: [String], default: [] },
    comments: { type: [String], default: [] },

    sellerID: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

offerSchema.post('save', async function (offer, next) {
    try {
        await User.updateOne(
            { _id: offer.sellerID },
            { $push: { offers: offer } }
        );
        next();
    } catch (error) {
        throw Error("Error updating user offers");
    }
});

export const Offer = model<IOffer>("Offer", offerSchema);