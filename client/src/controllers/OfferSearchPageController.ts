import OfferSearchPage from "../pages/OfferSearchPage";
import Application from "../models/Application";
import OfferService from "../services/OfferService";
import { WithLoading } from "./decorators";
import IOffer from "shared/src/interfaces/IOffer";

export default class OfferSearchPageController {

    private page: OfferSearchPage;
    private application: Application = Application.getInstance();
    private searchForm: HTMLFormElement;
    private filterForm: HTMLFormElement;

    public constructor(page: OfferSearchPage, searchForm: HTMLFormElement, filterForm: HTMLFormElement) {
        this.page = page;
        this.searchForm = searchForm;
        this.filterForm = filterForm;
        this.searchForm.onsubmit = (event) => this.onSearchSubmit(event);
        this.filterForm.onsubmit = (event) => this.onSearchSubmit(event);
    }

    @WithLoading()
    public async onSearchSubmit(event: Event): Promise<void> {
        event.preventDefault();
        const search: Object = Object.fromEntries(new FormData(this.searchForm));
        const filter: Object = Object.fromEntries(new FormData(this.filterForm));
        const query: Object = { search, filter }
        let result: IOffer[];
        try {
            result = await OfferService.getAll(); // TODO: Pass query to service
        } catch (error) {
            return;
        }
        this.page.update(result);
    }
}