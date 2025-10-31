import { Schema, model } from "mongoose";

export interface IOffer {
    _id: string;
    title: string;
    description: string;
    price: number;
    available: boolean;
    category: string;
    createdAt: Date;

    askExchange?: string;
    location?: string;
    pictures?: string[];
    comments?: string[];

    sellerID: Schema.Types.ObjectId;
}

const schema = new Schema<IOffer>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },

    askExchange: { type: String },
    location: { type: String },
    pictures: { type: [String], default: [] },
    comments: { type: [String], default: [] },

    sellerID: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Offer = model<IOffer>("Offer", schema);