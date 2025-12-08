import IOffer from "shared/src/interfaces/IOffer";
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
}