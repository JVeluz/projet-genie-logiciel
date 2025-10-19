import SearchModel from "@pages/search-page/search_page_model"
import SearchController from "@pages/search-page/search_page_controller"
import SearchView from "@pages/search-page/search_page_view"
import LoginPageModel from "@pages/login-page/login_page_model"
import LoginPageController from "@pages/login-page/login_page_controller"
import LoginPageView from "@pages/login-page/login_page_view"


enum Page { SEARCH, LOGIN }


function changePage(page: Page): void {
    let root: HTMLElement = document.getElementById("root")!
    let model, controller, view
    switch (page) {
        case Page.SEARCH:
            model = new SearchModel()
            controller = new SearchController()
            view = new SearchView()
            break
        case Page.LOGIN:
            model = new LoginPageModel()
            controller = new LoginPageController()
            view = new LoginPageView()
            break
    }

    root.innerHTML = ""
    root.appendChild(view.getElement())
}

window.addEventListener("DOMContentLoaded", () => {
    changePage(Page.LOGIN)
})