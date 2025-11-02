import HTML from "../html/user-page.html";
import UserElement from "./UserElement";
import UserController from "../controllers/UserController";
import Application, { Item } from "../models/Application";

export default class UserPage extends HTMLElement {

    public connectedCallback(): void {
        this.innerHTML = HTML;
        const urlParams: any = new URLSearchParams(window.location.search);
        const userID: string | null = urlParams.get("id");
        if (userID === null) {
            const currentUser = Application.getInstance().get(Item.CurrentUser);
            if (currentUser) {
                window.location.href = `/user?id=${currentUser._id}`;
                return;
            }
        }
        const userElement = this.querySelector(".page-user") as UserElement;
        new UserController(userElement)
            .load(userID!);
    }
}