import SearchPageModel from "./search_page_model"
import Offer from "@models/offer"
import Controller from "@pages/controller"
import OfferService from "@services/offer_service"


export default class SearchPageController extends Controller<SearchPageModel> {

    public handleSearch(query: string): void {
        const service: OfferService = new OfferService()
        const results: Offer[] = service.search(query)
        this.model?.setOffers(results)
    }
}