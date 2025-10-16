import SearchModel from "@pages/search/search_model"
import SearchController from "@pages/search/search_controller"
import SearchView from "@pages/search/search_view"

window.addEventListener("DOMContentLoaded", () => {
    const root: HTMLElement = document.getElementById("root")!

    const searchModel: SearchModel = new SearchModel()
    const searchController: SearchController = new SearchController()
    const searchView: SearchView = new SearchView()

    searchModel.setView(searchView)
    searchView.setController(searchController)
    searchController.setModel(searchModel)

    searchView.connectEvents()

    root.appendChild(searchView.getElement())
})