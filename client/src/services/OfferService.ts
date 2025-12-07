import OfferRepository from "../repositories/OfferRepository";
import User from "../models/User";
import IOffer from "shared/src/interfaces/IOffer";

export default class OfferService {

    public static async getAll(): Promise<IOffer[]> {
        return await OfferRepository.getAll();
    }

    public static async getByID(offerID: string): Promise<IOffer> {
        return await OfferRepository.getByID(offerID);
    }

    public static async create(offer: IOffer, currentUser: User): Promise<IOffer> {
        offer.sellerID = currentUser._id;
        return await OfferRepository.create(offer as IOffer);
    }

    public static async update(offer: IOffer): Promise<void> {
        return await OfferRepository.update(offer);
    }

    public static async delete(offer: IOffer): Promise<void> {
        return await OfferRepository.delete(offer._id);
    }
}