import SearchPageModel from "./search_page_model"
import Offer from "@models/offer"
import OfferService from "@services/offer_service"

export default class SearchPageController {

    private model: SearchPageModel | null = null

    public setModel(model: SearchPageModel): void {
        this.model = model
    }

    public handleSearch(query: string): void {
        const service: OfferService = new OfferService()
        const results: Offer[] = service.search(query)
        this.model?.setOffers(results)
    }
}