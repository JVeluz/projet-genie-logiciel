import Page from "@pages/page"
import SearchPage from "@pages/search-page/search_page"
import LoginPage from "@pages/login-page/login_page"


function changePage(page: Page): void {
    const root: HTMLElement = document.getElementById("root")!
    root.innerHTML = ""
    root.appendChild(page.getElement())
}

window.addEventListener("DOMContentLoaded", () => {
    const loginPage = new LoginPage()
    const searchPage = new SearchPage()
    changePage(loginPage)
})