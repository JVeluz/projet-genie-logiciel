import SearchModel from "./search_model"
import Offer from "@models/offer"
import OfferService from "@services/offer_service"

export default class SearchController {

    private model: SearchModel | null = null

    public setModel(model: SearchModel): void {
        this.model = model
    }

    public handleSearch(query: string): void {
        const service: OfferService = new OfferService()
        const results: Offer[] = service.search(query)
        this.model?.setOffers(results)
    }
}