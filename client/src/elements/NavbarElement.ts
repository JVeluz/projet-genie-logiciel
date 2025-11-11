import NavbarController from "../controllers/NavbarController";
import HTML from "../html/navbar-element.html";
import User from "../models/User";
import UserElement from "../elements/UserElement";
import LoginController from "../controllers/LoginController";

export class NavbarModel {
    public displayLogin: boolean = true;
    public displayProfile: boolean = false;
    public displayNewOfferButton: boolean = false;
    public currentUser: User | null = null;
}

export default class NavbarElement extends HTMLElement {

    private loginDropdown!: HTMLElement;
    private logoutButton!: HTMLButtonElement;
    private newOfferButton!: HTMLButtonElement;
    private loginForm!: HTMLFormElement;
    private userElement!: UserElement;

    public async connectedCallback(): Promise<void> {
        await customElements.whenDefined("user-element");

        this.innerHTML = HTML;

        this.loginDropdown = this.querySelector(".login-dropdown") as HTMLElement;
        this.logoutButton = this.querySelector(".logout-button") as HTMLButtonElement;
        this.newOfferButton = this.querySelector(".new-offer-button") as HTMLButtonElement;
        this.loginForm = this.querySelector(".login-form") as HTMLFormElement;
        this.userElement = this.querySelector(".navbar-user") as UserElement;

        new NavbarController(this);
        new LoginController(this.loginForm, this.logoutButton);
    }

    public update(model: NavbarModel): void {
        this.loginDropdown.style.display = model.displayLogin ? "block" : "none";
        this.userElement.style.display = model.displayProfile ? "block" : "none";
        this.newOfferButton.style.display = model.displayNewOfferButton ? "block" : "none";
        if (model.currentUser)
            this.userElement.update(model.currentUser);
    }
}