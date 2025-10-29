import OfferSearchPage from "@elements/OfferSearchPage";
import OfferService from "@services/OfferService";


export default class SearchPageController {

    public constructor(
        private view: OfferSearchPage,
        private searchForm: HTMLFormElement,
        private filterForm: HTMLFormElement,
    ) {
        this.searchForm.onsubmit = (event) => this.onSearchSubmit(event);
        this.filterForm.onsubmit = (event) => this.onSearchSubmit(event);
    }

    private offerService: OfferService = new OfferService();

    public onSearchSubmit(event: Event): void {
        event.preventDefault();

        const search: Object = Object.fromEntries(new FormData(this.searchForm));
        const filter: Object = Object.fromEntries(new FormData(this.filterForm));
        const query: Object = { search, filter }

        console.log(`onSearchSubmit(${JSON.stringify(query)})`);

        const result = this.offerService.search(query);
        console.log(result);

        this.view.update(result);
    }
}