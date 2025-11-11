import Application, { Item } from "../models/Application";
import NavbarElement, { NavbarModel } from "../elements/NavbarElement";
import User from "../models/User";

export default class NavbarController {

    // Models
    private application: Application = Application.getInstance();
    private navbarModel: NavbarModel = new NavbarModel();

    constructor(
        // Views
        private navbarElement: NavbarElement,
    ) {
        const currentUser: User | null = this.application.get(Item.CurrentUser)
        this.navbarModel.displayLogin = currentUser ? false : true;
        this.navbarModel.displayProfile = currentUser ? true : false;
        this.navbarModel.displayNewOfferButton = currentUser ? true : false;
        this.navbarModel.currentUser = currentUser;
        navbarElement.update(this.navbarModel);
    }

    private onUserUpdate(): void {
        this.navbarElement.update(this.navbarModel);
    }
}