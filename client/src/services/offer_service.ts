import Offer from "../models/offer"
import OfferRepository from "../repositories/offer_repository"

export default class OfferService {

    private repository: OfferRepository = new OfferRepository()

    public get(id: number): Offer {
        return this.repository.get(id)
    }

    public save(offer: Offer): void {
        this.repository.save(offer)
    }
}