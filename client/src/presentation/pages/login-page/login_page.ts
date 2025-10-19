import LoginPageModel from "./login_page_model"
import LoginPageView from "./login_page_view"
import LoginPageController from "./login_page_controller"
import Page from "@pages/page"

export default class LoginPage extends Page {
    public constructor() {
        super(new LoginPageModel(), new LoginPageView(), new LoginPageController())
    }
}