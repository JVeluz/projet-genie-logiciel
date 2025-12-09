import { IUser } from "shared";
import Application from "../models/Application";
import NavbarElement from "../elements/NavbarElement";

export default class NavbarController {

    // Models
    private application: Application = Application.getInstance();
    private currentUser: IUser | null = this.application.user.get();

    constructor(
        // Views
        private navbarElement: NavbarElement,
    ) {
        navbarElement.updateUser(this.currentUser);
        this.application.loading.addObserver(this.onLoadingChange.bind(this));
        this.application.user.addObserver(this.onUserChange.bind(this));
    }

    private onUserChange(user: IUser | null): void {
        this.currentUser = user;
        this.navbarElement.updateUser(this.currentUser);
    }

    private onLoadingChange(loading: boolean): void {
        this.navbarElement.updateLoading(loading);
    }
}