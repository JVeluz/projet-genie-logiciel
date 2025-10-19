import SearchPage from "./search_page.html"
import SearchPageController from "./search_page_controller"

import View from "@presentation/mvc/view"
import Offer from "@models/offer"
import Card from "@components/card"
import Grid from "@components/grid"


export default class SearchPageView extends View<SearchPageController> {

    private searchForm: HTMLElement
    private progressBar: HTMLElement
    private offerContainer: HTMLElement

    constructor() {
        super()
        this.setHTML(SearchPage)
        this.searchForm = this.element.querySelector("#search-form") as HTMLElement
        this.progressBar = this.element.querySelector("#progress-bar") as HTMLElement
        this.offerContainer = this.element.querySelector("#offer-container") as HTMLElement
        this.connectEvents()
    }

    public connectEvents() {
        this.searchForm.onsubmit = this.onSearchFormSubmit.bind(this)
    }

    public onOffersUpdated(offers: Offer[]): void {
        const grid: Grid = new Grid()
        for (const offer of offers) {
            const card: Card = new Card()
            card.setTitle(offer.title)
            card.setText(offer.description)
            grid.add(card.getElement())
        }
        this.offerContainer.innerHTML = ""
        this.offerContainer.appendChild(grid.getElement())
    }

    private onSearchFormSubmit(event: SubmitEvent): void {
        event.preventDefault()
        const formData: FormData = new FormData(event.target as HTMLFormElement)
        const query: string = formData.get("query") as string
        this.controller?.handleSearch(query)
    }
}