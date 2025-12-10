import { IOffer, IUser } from "shared";
import OfferRepository from "../repositories/OfferRepository";

export default class OfferService {

    public constructor(
        private offerRepository = new OfferRepository()
    ) { }

    public async getAll(): Promise<IOffer[]> {
        return await this.offerRepository.getAll();
    }

    public async getByTerms(terms: string): Promise<IOffer[]> {
        if (!terms || terms.trim() === "") {
            return await this.getAll();
        }
        return await this.offerRepository.getByTerms(terms);
    }

    public async getByID(offerID: string): Promise<IOffer> {
        return await this.offerRepository.getByID(offerID);
    }

    public async create(offer: IOffer, currentUser: IUser): Promise<IOffer> {
        offer.sellerID = currentUser;
        return await this.offerRepository.create(offer as IOffer);
    }

    public async update(offer: IOffer): Promise<void> {
        return await this.offerRepository.update(offer);
    }

    public async delete(offer: IOffer): Promise<void> {
        return await this.offerRepository.delete(offer._id);
    }

    public isOwner(offer: IOffer, user: IUser | null): boolean {
        if (!user) return false;
        const sellerId = typeof offer.sellerID === 'string' ? offer.sellerID : offer.sellerID._id;
        return sellerId === user._id;
    }

    // Action Vendeur : Réserver l'offre pour un acheteur
    public async reserve(offerID: string, candidateBuyerID: string): Promise<void> {
        await this.offerRepository.reserve(offerID, candidateBuyerID);
    }

    // Action Acheteur : Confirmer la transaction
    public async confirm(offerID: string): Promise<void> {
        await this.offerRepository.confirm(offerID);
    }

    // Action Commune : Annuler
    public async cancel(offerID: string): Promise<void> {
        await this.offerRepository.cancel(offerID);
    }
}