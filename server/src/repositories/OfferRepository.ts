import { Offer } from "../models/Offer";

export default class OfferRepository {

    public static async findAll(): Promise<any[]> {
        return Offer.find().exec();
    }

    public static async findById(id: string): Promise<any | null> {
        return Offer.findById(id).exec();
    }

    public static async findByTerms(terms: string): Promise<any[]> {
        return Offer.find({
            $or: [
                { title: { $regex: terms, $options: 'i' } },
                { description: { $regex: terms, $options: 'i' } }
            ]
        }).exec();
    }

    public static async create(offerData: any): Promise<any> {
        const newOffer = new Offer(offerData);
        return newOffer.save();
    }

    public static async delete(id: string): Promise<any | null> {
        return Offer.findByIdAndDelete(id).exec();
    }

    public static async update(id: string, updateData: any): Promise<any | null> {
        return Offer.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }
}   
