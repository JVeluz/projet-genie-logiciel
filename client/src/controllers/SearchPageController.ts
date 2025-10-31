import OfferSearchPage from "elements/OfferSearchPage";

export default class SearchPageController {

    public constructor(
        private view: OfferSearchPage,
        private searchForm: HTMLFormElement,
        private filterForm: HTMLFormElement,
    ) {
        this.searchForm.onsubmit = (event) => this.onSearchSubmit(event);
        this.filterForm.onsubmit = (event) => this.onSearchSubmit(event);
    }

    public onSearchSubmit(event: Event): void {
        event.preventDefault();

        const search: Object = Object.fromEntries(new FormData(this.searchForm));
        const filter: Object = Object.fromEntries(new FormData(this.filterForm));
        const query: Object = { search, filter }

        console.log(`onSearchSubmit(${JSON.stringify(query)})`);

        // const result = this.offerService.search(query);
        // console.log(result);

        // this.view.update(result);
    }
}