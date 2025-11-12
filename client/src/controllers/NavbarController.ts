import Application from "../models/Application";
import NavbarElement from "../elements/NavbarElement";
import User from "../models/User";

export default class NavbarController {

    // Models
    private application: Application = Application.getInstance();
    private currentUser: User | null = this.application.user.get();

    constructor(
        // Views
        private navbarElement: NavbarElement,
    ) {
        navbarElement.updateUser(this.currentUser);
        this.application.loading.addObserver(this.onLoadingChange.bind(this));
        this.application.user.addObserver(this.onUserChange.bind(this));
    }

    private onUserChange(user: User | null): void {
        this.currentUser = user;
        this.navbarElement.updateUser(this.currentUser);
    }

    private onLoadingChange(loading: boolean): void {
        this.navbarElement.updateLoading(loading);
    }
}