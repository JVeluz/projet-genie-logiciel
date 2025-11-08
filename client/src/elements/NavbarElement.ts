import NavbarController from "../controllers/NavbarController";
import HTML from "../html/navbar-element.html";
import User from "../models/User";
import UserElement from "./UserElement";
import LoginForm from "./LoginForm";
import Application, { Item } from "../models/Application";

export default class NavbarElement extends HTMLElement {

    private application: Application = Application.getInstance();
    private currentUser: User | null = this.application.get(Item.CurrentUser);

    private loginDropdown!: HTMLElement;
    private logoutButton!: HTMLButtonElement;
    private newOfferButton!: HTMLButtonElement;
    private profileDropdown!: HTMLElement;
    private loginForm!: LoginForm;
    private userElement!: UserElement;

    public async connectedCallback(): Promise<void> {
        await customElements.whenDefined('user-element');

        this.innerHTML = HTML;

        this.loginDropdown = this.querySelector('.login-dropdown')! as HTMLElement;
        this.logoutButton = this.querySelector('.logout-button')! as HTMLButtonElement;
        this.newOfferButton = this.querySelector('.new-offer-button')! as HTMLButtonElement;
        this.profileDropdown = this.querySelector('.profile-dropdown')! as HTMLElement;
        this.userElement = this.querySelector('.navbar-user')! as UserElement;
        this.loginForm = this.querySelector('.login-form')! as LoginForm;

        if (this.currentUser) {
            this.userElement.setAttribute('user-id', this.currentUser._id);
        }

        new NavbarController(this);

        customElements.whenDefined('login-form').then(() => {
            this.loginForm.controller!.setLogoutButton(this.logoutButton);
        });
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

    public setLoading(isLoading: boolean): void {
        const progressBar = this.querySelector('.navbar-progress-bar') as HTMLElement;
        if (isLoading) {
            progressBar.style.width = '100%';
        } else {
            progressBar.style.width = '0%';
        }
    }
}