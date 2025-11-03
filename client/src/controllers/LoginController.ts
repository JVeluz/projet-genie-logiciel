import Application, { Item } from "../models/Application";
import UserFetch from "../fetches/UserFetch";
import User from "../models/User";

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
        const loading: boolean = this.model.get(Item.Loading);
        if (loading)
            return;

        const formData: FormData = new FormData(this.form);
        const email: string = formData.get("email") as string;
        const password: string = formData.get("password") as string;
        try {
            this.model.set(Item.Loading, true);
            const { token, user } = await UserFetch.login(email, password);
            this.model.set(Item.CurrentUser, user);
            this.model.set(Item.AuthToken, token);
            if (window.location.pathname === "/login") {
                window.location.href = "/";
            } else {
                window.location.reload();
            }
        } catch (error: any) {
            alert(error.message);
        } finally {
            this.model.set(Item.Loading, false);
        }
    }

    public onLogout(event: Event): void {
        event.preventDefault();
        this.model.set(Item.CurrentUser, null);
        this.model.set(Item.AuthToken, null);
        window.location.reload();
    }
}