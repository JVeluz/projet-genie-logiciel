import HTML from "@html/login-page.html";

export default class LoginPage extends HTMLElement {

    public connectedCallback(): void {
        this.innerHTML = HTML;
    }
}