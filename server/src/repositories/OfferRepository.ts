import { Offer } from "../models/Offer";
import IOffer from "shared/src/interfaces/IOffer";

export default class OfferRepository {

    public async findAll(): Promise<IOffer[]> {
        return Offer.find()
            .populate("sellerID", "name rating avatar")
            .exec();
    }

    public async findById(id: string): Promise<IOffer | null> {
        return Offer.findById(id)
            .populate("sellerID", "name rating avatar email")
            .populate("chatIDs")
            .exec();
    }

    public async findByTerms(terms: string): Promise<IOffer[]> {
        return Offer.find({
            $or: [
                { title: { $regex: terms, $options: 'i' } },
                { description: { $regex: terms, $options: 'i' } }
            ]
        })
            .populate("sellerID", "name rating avatar")
            .exec();
    }

    public async create(offerData: IOffer): Promise<IOffer> {
        const newOffer = new Offer(offerData);
        return newOffer.save();
    }

    public async delete(id: string): Promise<IOffer | null> {
        return Offer.findByIdAndDelete(id).exec();
    }

    public async update(updateData: Partial<IOffer> & { _id: string }): Promise<IOffer | null> {
        return Offer.findByIdAndUpdate(
            updateData._id,
            updateData,
            { new: true }
        )
            .populate("sellerID")
            .exec();
    }
}