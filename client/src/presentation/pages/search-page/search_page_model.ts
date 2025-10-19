import Model from "@presentation/mvc/model"
import SearchPageView from "./search_page_view"
import Offer from "@models/offer"


export default class SearchPageModel extends Model<SearchPageView> {

    private offers: Offer[] = []

    public getOffers(): Offer[] {
        return this.offers
    }

    public setOffers(offers: Offer[]): void {
        this.offers = offers
        this.view?.onOffersUpdated(this.offers)
    }
}