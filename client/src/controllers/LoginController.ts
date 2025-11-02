import Application, { Item } from "../models/Application";
import UserService from "../fetches/UserFetch";

export default class LoginController {

    private form: HTMLFormElement;
    private logoutButton?: HTMLButtonElement;
    private model: Application = Application.getInstance();

    public constructor(form: HTMLFormElement) {
        this.form = form;
        this.form.onsubmit = (event: Event) => this.onSubmit(event);
    }

    public setLogoutButton(logoutButton: HTMLButtonElement): void {
        this.logoutButton = logoutButton;
        this.logoutButton.onclick = (event: Event) => this.onLogout(event);
    }

    public async onSubmit(event: Event): Promise<void> {
        event.preventDefault();
        const formData: FormData = new FormData(this.form);
        const email: string = formData.get("email") as string;
        const password: string = formData.get("password") as string;
        try {
            const { token, user } = await UserService.login(email, password);
            this.model.set(Item.CurrentUser, user);
            this.model.set(Item.AuthToken, token);
            if (window.location.pathname === "/login") {
                window.location.href = "/";
            } else {
                window.location.reload();
            }
        } catch (error: any) {
            alert(error.message);
        }
    }

    public onLogout(event: Event): void {
        event.preventDefault();
        this.model.set(Item.CurrentUser, null);
        this.model.set(Item.AuthToken, null);
        window.location.reload();
    }
}