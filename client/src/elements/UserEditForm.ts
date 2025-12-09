import { IUser } from "shared";

export default class UserEditForm extends HTMLFormElement {

    private nameInput!: HTMLInputElement;
    private bioInput!: HTMLTextAreaElement;
    private emailInput!: HTMLInputElement;
    private passwordInput!: HTMLInputElement;

    public connectedCallback(): void {
        this.nameInput = this.querySelector("input[name='name']") as HTMLInputElement;
        this.bioInput = this.querySelector("textarea[name='bio']") as HTMLTextAreaElement;
        this.emailInput = this.querySelector("input[name='email']") as HTMLInputElement;
        this.passwordInput = this.querySelector("input[name='password']") as HTMLInputElement;
    }

    public update(user: IUser) {
        this.nameInput.value = user.name;
        this.bioInput.value = user.bio || "";
    }

    public getEntries(): any {
        return {
            name: this.nameInput.value,
            bio: this.bioInput.value,
        }
    }
}