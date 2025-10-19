import Page from "@pages/page"
import SearchPageModel from "./search_page_model"
import SearchPageView from "./search_page_view"
import SearchPageController from "./search_page_controller"

export default class SearchPage extends Page {
    public constructor() {
        super(new SearchPageModel(), new SearchPageView(), new SearchPageController())
    }
}