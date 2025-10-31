import OfferRepository from "../repositories/OfferRepository";

export default class OfferService {

    public static async getAll(): Promise<any[]> {
        return OfferRepository.findAll();
    }

    public static async getById(id: string): Promise<any> {
        const offer = await OfferRepository.findById(id);
        if (!offer)
            throw new Error("Offer not found");
        return offer;
    }

    public static async getByTerms(terms: string): Promise<any[]> {
        return OfferRepository.findByTerms(terms);
    }

    public static async create(data: any): Promise<any> {
        if (!data.title || !data.description)
            throw new Error("Title and description are required");
        return OfferRepository.create(data);
    }

    public static async update(id: string, data: any): Promise<any> {
        const offer = await OfferRepository.findById(id);
        if (!offer)
            throw new Error("Offer not found");
        return OfferRepository.update(id, data);
    }

    public static async delete(id: string): Promise<void> {
        const offer = await OfferRepository.findById(id);
        if (!offer)
            throw new Error("Offer not found");
        return OfferRepository.delete(id);
    }
}