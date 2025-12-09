import { IUser } from "shared";
import UserEditPageController from "../controllers/UserEditPageController";
import UserEditForm from "../elements/UserEditForm";
import UserElement from "../elements/UserElement";
import HTML from "../html/user-edit-page.html";

export default class UserEditPage extends HTMLElement {

    private form!: UserEditForm;
    private preview!: UserElement;

    public async connectedCallback(): Promise<void> {
        await customElements.whenDefined("user-element");
        await customElements.whenDefined("user-edit-form");
        this.innerHTML = HTML;
        this.form = this.querySelector("#user-edit-form") as UserEditForm;
        this.preview = this.querySelector("#user-preview") as UserElement;
        new UserEditPageController(this, this.form);
    }

    public updateForm(user: IUser): void {
        this.form.update(user);
    }

    public updatePreview(user: IUser): void {
        this.preview.update(user);
    }
}