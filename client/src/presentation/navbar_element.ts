import HTML from "./html/navbar.html";

export default class NavbarElement extends HTMLElement {

    public connectedCallback(): void {
        this.innerHTML = HTML;
    }
}

customElements.define("app-navbar", NavbarElement);