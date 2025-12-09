import { Schema, model } from "mongoose";
import { IOffer, OfferStatus } from "shared";

export const offerSchema = new Schema<IOffer>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    available: { type: Boolean, default: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    exchange: { type: String },
    location: { type: String },
    pictures: { type: [String], default: [] },

    sellerID: { type: Schema.Types.ObjectId as any, ref: "User", required: true },
    chatIDs: [{ type: Schema.Types.ObjectId as any, ref: "Chat", default: [] }],

    status: { type: String, enum: Object.values(OfferStatus), default: OfferStatus.AVAILABLE },

    reservedTo: { type: Schema.Types.ObjectId as any, ref: "User", default: null }
});

offerSchema.post("save", async function (offer, next) {
    try {
        await model("User").updateOne(
            { _id: offer.sellerID },
            { $push: { offers: offer._id } }
        );
        next();
    } catch (error) {
        console.error(error);
    }
});

offerSchema.post("findOneAndDelete", async function (offer) {
    if (!offer) return;
    try {
        await model("Chat").deleteMany({ _id: { $in: offer.chatIDs } });
        await model("User").updateOne(
            { _id: offer.sellerID },
            { $pull: { offers: offer._id } }
        );
    } catch (error) {
        console.error("Error cleaning up offer dependencies", error);
    }
});

export const Offer = model<IOffer>("Offer", offerSchema);