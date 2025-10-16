import SearchView from "./search_view"
import Offer from "@models/offer"

export default class SearchModel {

    private view: SearchView | null = null

    private offers: Offer[] = []

    public setView(view: SearchView): void {
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