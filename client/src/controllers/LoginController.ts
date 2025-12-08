import Application from "../models/Application";
import UserService from "../services/UserService";

export default class LoginController {

    private application: Application = Application.getInstance();
    private userService: UserService = new UserService();

    public constructor(
        private form: HTMLFormElement,
        private logoutButton?: HTMLButtonElement
    ) {
        this.form = form;
        this.form.onsubmit = (event: Event) => this.onSubmit(event);
        if (logoutButton) logoutButton.onclick = (event: Event) => this.onLogout(event);
    }

    public async onSubmit(event: Event): Promise<void> {
        event.preventDefault();
        const formData: FormData = new FormData(this.form);
        const email: string = formData.get("email") as string;
        const password: string = formData.get("password") as string;

        const { token, user } = await this.userService.login(email, password);
        this.application.user.set(user);
        this.application.token.set(token);

        // if (window.location.pathname === "/login") {
        //     window.location.href = "/";
        // } else {
        //     window.location.reload();
        // }
    }

    public onLogout(event: Event): void {
        event.preventDefault();
        this.application.token.set(null);
        this.application.user.set(null);
        window.location.reload();
    }
}