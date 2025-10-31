import RegisterController from "controllers/RegisterController";
import HTML from "@html/register-page.html";


export default class RegisterPage extends HTMLElement {

    public connectedCallback(): void {
        this.innerHTML = HTML;
        new RegisterController(
            this.querySelector(".register-form") as HTMLFormElement,
        );
    }
}