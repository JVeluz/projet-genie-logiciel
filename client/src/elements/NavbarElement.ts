import IUser from "shared/src/interfaces/IUser";
import NavbarController from "../controllers/NavbarController";
import HTML from "../html/navbar-element.html";
import UserElement from "../elements/UserElement";
import LoginController from "../controllers/LoginController";

export default class NavbarElement extends HTMLElement {

    private loginDropdown!: HTMLElement;
    private logoutButton!: HTMLButtonElement;
    private newOfferButton!: HTMLButtonElement;
    private loginForm!: HTMLFormElement;
    private userElement!: UserElement;
    private loadingBarContainer!: HTMLElement;
    private loadingBar!: HTMLElement;

    public async connectedCallback(): Promise<void> {
        await customElements.whenDefined("user-element");

        this.innerHTML = HTML;

        this.loginDropdown = this.querySelector(".login-dropdown") as HTMLElement;
        this.logoutButton = this.querySelector(".logout-button") as HTMLButtonElement;
        this.newOfferButton = this.querySelector(".new-offer-button") as HTMLButtonElement;
        this.loginForm = this.querySelector(".login-form") as HTMLFormElement;
        this.userElement = this.querySelector(".navbar-user") as UserElement;
        this.loadingBarContainer = this.querySelector(".loading-bar-container") as HTMLElement;
        this.loadingBar = this.querySelector(".loading-bar") as HTMLElement;

        new NavbarController(this);
        new LoginController(this.loginForm, this.logoutButton);
    }

    public updateUser(user: IUser | null): void {
        this.loginDropdown.style.display = user ? "none" : "block";
        this.userElement.style.display = user ? "block" : "none";
        this.newOfferButton.style.display = user ? "block" : "none";
        if (user)
            this.userElement.update(user);
    }

    public updateLoading(loading: boolean): void {
        this.loadingBar.style.width = loading ? "100%" : "0%";
    }
}