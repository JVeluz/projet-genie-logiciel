import OfferSearchPage from "../elements/OfferSearchPage";
import OfferFetch from "../fetches/OfferFetch";

export default class SearchPageController {

    private view: OfferSearchPage;
    private searchForm: HTMLFormElement;
    private filterForm: HTMLFormElement;

    public constructor(view: OfferSearchPage, searchForm: HTMLFormElement, filterForm: HTMLFormElement) {
        this.view = view;
        this.searchForm = searchForm;
        this.filterForm = filterForm;
        this.searchForm.onsubmit = (event) => this.onSearchSubmit(event);
        this.filterForm.onsubmit = (event) => this.onSearchSubmit(event);
    }

    public async onSearchSubmit(event: Event): Promise<void> {
        event.preventDefault();
        const search: any = Object.fromEntries(new FormData(this.searchForm));
        const filter: Object = Object.fromEntries(new FormData(this.filterForm));
        const query: Object = { search, filter }
        console.log(`onSearchSubmit(${JSON.stringify(query)})`);
        const result = await OfferFetch.getAll();
        this.view.update(result);
    }
}