import Offer from "@models/Offer"
import OfferRepository from "@data/OfferRepository"

export default class OfferService {

    private repository: OfferRepository = new OfferRepository()

    public async get(id: number): Promise<Offer> {
        return this.repository.get(id)
    }

    public async save(offer: Offer): Promise<void> {
        await this.repository.save(offer)
    }

    public search(query: Object): Offer[] {
        return this.repository.search(JSON.stringify(query))
    }
}