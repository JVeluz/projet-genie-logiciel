import { Offer } from "../models/Offer";

export default class OfferRepository {

    public async findAll(): Promise<any[]> {
        return Offer.find().exec();
    }

    public async findById(id: string): Promise<any | null> {
        return Offer.findById(id).exec();
    }

    public async findByTerms(terms: string): Promise<any[]> {
        return Offer.find({
            $or: [
                { title: { $regex: terms, $options: 'i' } },
                { description: { $regex: terms, $options: 'i' } }
            ]
        }).exec();
    }

    public async create(offerData: any): Promise<any> {
        const newOffer = new Offer(offerData);
        return newOffer.save();
    }

    public async delete(id: string): Promise<any | null> {
        return Offer.findByIdAndDelete(id).exec();
    }

    public async update(updateData: any): Promise<any | null> {
        return Offer.findByIdAndUpdate(updateData._id, updateData, { new: true }).exec();
    }
}   
