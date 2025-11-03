import OfferSearchPage from "../elements/OfferSearchPage";
import OfferFetch from "../fetches/OfferFetch";
import Application, { Item } from "../models/Application";

export default class SearchPageController {

    private view: OfferSearchPage;
    private model: Application = Application.getInstance();
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
        const loading: boolean = this.model.get(Item.Loading);
        if (loading)
            return;

        const search: Object = Object.fromEntries(new FormData(this.searchForm));
        const filter: Object = Object.fromEntries(new FormData(this.filterForm));
        const query: Object = { search, filter }
        try {
            this.model.set(Item.Loading, true);
            const result = await OfferFetch.getAll();
            this.view.update(result);
        } catch (error: any) {
            alert(error.message);
        } finally {
            this.model.set(Item.Loading, false);
        }
    }
}