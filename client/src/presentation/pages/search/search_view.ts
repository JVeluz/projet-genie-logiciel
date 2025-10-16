import SearchPage from "./search_page.html"
import SearchController from "./search_controller"
import HTMLParser from "@utils/html_parser"
import Offer from "@models/offer"
import Card from "@components/card"
import Grid from "@components/grid"

export default class SearchView {

    private controller: SearchController | null = null

    private element: HTMLElement = HTMLParser.parse(SearchPage, true)
    private searchForm: HTMLElement = this.element.querySelector("#search-form") as HTMLElement
    private progressBar: HTMLElement = this.element.querySelector("#progress-bar") as HTMLElement
    private offerContainer: HTMLElement = this.element.querySelector("#offer-container") as HTMLElement

    public setController(controller: SearchController): void {
        this.controller = controller
    }

    public connectEvents() {
        this.searchForm.addEventListener("submit", (event) => this.onSearchFormSubmit(event))
    }

    public getElement(): HTMLElement { return this.element }

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