import SearchPageView from "./search_page_view"
import Offer from "@models/offer"

export default class SearchPageModel {

    private view: SearchPageView | null = null

    private offers: Offer[] = []

    public setView(view: SearchPageView): void {
        this.view = view
    }

    public getOffers(): Offer[] { return this.offers }

    public setOffers(offers: Offer[]): void {
        this.offers = offers
        this.offersUpdated()
    }

    private offersUpdated(): void {
        this.view?.onOffersUpdated(this.offers)
    }
}