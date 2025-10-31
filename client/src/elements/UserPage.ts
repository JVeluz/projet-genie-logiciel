import HTML from "@html/user-page.html";
import UserElement from "./UserElement";
import UserController from "controllers/UserController";


export default class UserPage extends HTMLElement {

    public connectedCallback(): void {
        this.innerHTML = HTML;
        const urlParams: any = new URLSearchParams(window.location.search);
        const userID: number = parseInt(urlParams.get("id"));
        const userElement = this.querySelector(".page-user") as UserElement;
        new UserController(userElement)
            .load(userID);
    }
}