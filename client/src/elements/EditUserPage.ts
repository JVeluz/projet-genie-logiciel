import HTML from "@html/user-edit-page.html";
import UserElement from "@elements/UserElement";
import ApplicationModel from "@core/ApplicationModel";
import User from "@models/User";


export default class EditUserPage extends HTMLElement {

    public connectedCallback(): void {
        this.innerHTML = HTML;
        const currentUser: Object | null = ApplicationModel.getInstance().get("currentUser");
        if (currentUser) {
            const userElement = this.querySelector('user-element') as UserElement;
            customElements.whenDefined('user-element').then(() => {
                userElement.update(currentUser as User);
            });
        }
    }
}