import LoginController from "@controllers/LoginController";
import NavbarController from "@controllers/NavbarController";
import ApplicationModel from "@core/ApplicationModel";
import HTML from "@html/navbar-element.html";
import User from "@models/User";
import UserElement from "@elements/UserElement";


export default class NavbarElement extends HTMLElement {

    private loginForm!: HTMLFormElement;
    private loginDropdown!: HTMLElement;
    private logoutButton!: HTMLButtonElement;
    private newOfferButton!: HTMLButtonElement;
    private profileDropdown!: HTMLElement;
    private userElement!: UserElement;

    public connectedCallback(): void {
        this.innerHTML = HTML;
        this.loginDropdown = this.querySelector('.login-dropdown')! as HTMLElement;
        this.loginForm = this.querySelector('.login-form')! as HTMLFormElement;
        this.logoutButton = this.querySelector('.logout-button')! as HTMLButtonElement;
        this.newOfferButton = this.querySelector('.new-offer-button')! as HTMLButtonElement;
        this.profileDropdown = this.querySelector('.profile-dropdown')! as HTMLElement;
        this.userElement = this.querySelector('.navbar-user')! as UserElement;

        new NavbarController(this);
        new LoginController(this.loginForm, this.logoutButton);
    }

    public update(model: User | null): void {
        if (model === null) {
            this.loginDropdown.style.visibility = 'visible';
            this.profileDropdown.style.visibility = 'hidden';
            this.newOfferButton.style.visibility = 'hidden';
        } else {
            this.profileDropdown.style.visibility = 'visible';
            this.newOfferButton.style.visibility = 'visible';
            this.loginDropdown.style.visibility = 'hidden';

            customElements.whenDefined('user-element').then(() => {
                this.userElement.update(model);
            });
        }
    }
}