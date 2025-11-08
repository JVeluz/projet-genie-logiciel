import HTML from "../html/user-page.html";
import Application, { Item } from "../models/Application";
import User from "../models/User";

export default class UserPage extends HTMLElement {

    // URLSearchParams
    private urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    private userID: string | null = this.urlParams.get("id");

    // Models
    private application: Application = Application.getInstance();
    private currentUser: User | null = this.application.get(Item.CurrentUser);

    public async connectedCallback(): Promise<void> {
        await customElements.whenDefined("user-page");

        if (!this.userID) {
            console.error("UserPage: missing user ID");
            return;
        }

        this.innerHTML = HTML;

        const editButton = this.querySelector("#user-edit-button") as HTMLAnchorElement;
        const userElement = this.querySelector("#user-element") as HTMLElement;

        editButton.href = `/user/edit?id=${this.userID}`;
        userElement.setAttribute("user-id", this.userID);

        editButton.style.display = (this.currentUser?._id === this.userID) ? "block" : "none";
    }
}