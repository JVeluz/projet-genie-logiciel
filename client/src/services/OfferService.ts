import OfferRepository from "../repositories/OfferRepository";
import Offer from "../models/Offer";
import User from "../models/User";

export default class OfferService {

    public static async getAll(): Promise<Offer[]> {
        return await OfferRepository.getAll();
    }

    public static async getByID(offerID: string): Promise<Offer> {
        return await OfferRepository.getByID(offerID);
    }

    public static async create(offer: Offer, currentUser: User): Promise<Offer> {
        offer.sellerID = currentUser._id;
        return await OfferRepository.create(offer);
    }

    public static async update(offer: Offer): Promise<void> {
        return await OfferRepository.update(offer);
    }

    public static async delete(offer: Offer): Promise<void> {
        return await OfferRepository.delete(offer._id);
    }
}