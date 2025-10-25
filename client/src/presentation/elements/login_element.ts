import HTML from "@html/login.html";
import LoginController from "@controllers/login_controller";

import User from "@models/user";


export default class LoginElement extends HTMLFormElement {

    private controller!: LoginController;

    private connectButton!: HTMLButtonElement;
    private registerButton!: HTMLButtonElement;

    public connectedCallback(): void {
        this.innerHTML = HTML;
        this.controller = new LoginController(this);
        this.connectButton = this.querySelector("#connect-button") as HTMLButtonElement;
        this.registerButton = this.querySelector("#register-button") as HTMLButtonElement;
        this.connectButton.onclick = (event: Event) => this.controller.onLoginClick(event);
        this.registerButton.onclick = (event: Event) => this.controller.onRegisterClick(event);
    }

    public updateUser(user: User): void {
        return;
    }
}

customElements.define("app-login", LoginElement, { extends: "form" });