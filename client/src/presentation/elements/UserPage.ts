import HTML from "@html/user-page.html";
import UserElement from "./UserElement";
import UserController from "@controllers/UserController";


export default class UserPage extends HTMLElement {

    public connectedCallback(): void {
        this.innerHTML = HTML;
        const urlParams: any = new URLSearchParams(window.location.search);
        const userID: number = parseInt(urlParams.get("id"));
        new UserController(
            this.querySelector('user-element') as UserElement,
            userID
        );
    }
}