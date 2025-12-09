import { IOffer, OfferStatus } from "shared";
import OfferRepository from "../repositories/OfferRepository";

export default class OfferService {

    public constructor(
        private offerRepository = new OfferRepository()
    ) { }

    public async getAll(): Promise<any[]> {
        return this.offerRepository.findAll();
    }

    public async getById(id: string): Promise<any> {
        const offer = await this.offerRepository.findById(id);
        if (!offer)
            throw new Error("Offer not found");
        return offer;
    }

    public async getByTerms(terms: string): Promise<any[]> {
        return this.offerRepository.findByTerms(terms);
    }

    public async create(offer: IOffer): Promise<any> {
        return this.offerRepository.create(offer);
    }

    public async update(data: any): Promise<any> {
        const offer = await this.offerRepository.findById(data._id);
        if (!offer)
            throw new Error("Offer not found");
        return this.offerRepository.update(data);
    }

    public async delete(id: string): Promise<void> {
        const offer = await this.offerRepository.findById(id);
        if (!offer)
            throw new Error("Offer not found");
        await this.offerRepository.delete(id);
    }

    public async reserve(offerID: string, sellerID: string, candidateBuyerID: string): Promise<void> {
        const offer = await this.offerRepository.findById(offerID);
        if (!offer) throw new Error("Offer not found");

        if (offer.sellerID._id.toString() !== sellerID)
            throw new Error("Unauthorized");
        if (offer.status !== OfferStatus.AVAILABLE)
            throw new Error("Offer is not available");

        await this.offerRepository.update({
            _id: offerID,
            status: OfferStatus.PENDING,
            reservedTo: candidateBuyerID
        });
    }

    public async confirm(offerID: string, buyerID: string): Promise<void> {
        const offer = await this.offerRepository.findById(offerID);
        if (!offer)
            throw new Error("Offer not found");

        if (offer.status !== OfferStatus.PENDING)
            throw new Error("Offer is not pending validation");

        if (offer.reservedTo !== buyerID)
            throw new Error("This offer is reserved to someone else");

        await this.offerRepository.update({
            _id: offerID,
            status: OfferStatus.EXCHANGED
        });
    }

    public async cancel(offerID: string, userID: string): Promise<void> {
        const offer = await this.offerRepository.findById(offerID);
        if (!offer)
            throw new Error("Offer not found");

        if (offer.status === OfferStatus.AVAILABLE)
            return;

        if (offer.sellerID._id !== userID && offer.reservedTo !== userID)
            throw new Error("Unauthorized to cancel this offer");

        await this.offerRepository.update({
            _id: offerID,
            status: OfferStatus.AVAILABLE,
            reservedTo: ""
        });
    }
}