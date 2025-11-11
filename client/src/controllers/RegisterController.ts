import Application, { Item } from "../models/Application";
import User from "../models/User";
import UserService from "../services/UserService";

export default class RegisterController {

    // Models
    private application: Application = Application.getInstance();
    // Views
    private form: HTMLFormElement;

    constructor(form: HTMLFormElement) {
        this.form = form;
        // Connect events
        this.form.onsubmit = (event: SubmitEvent) => this.onSubmit(event);
    }

    private async onSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault();
        const formData: FormData = new FormData(this.form);
        const password: string = formData.get("password") as string;
        const user: User = new User();
        user.name = formData.get("name") as string;
        user.email = formData.get("email") as string;

        let response;
        try {
            this.application.loading = true;
            response = await UserService.register(user, password);
        } catch (error) {
            console.error("Registration failed:", error);
            return;
        } finally {
            this.application.loading = false;
        }

        const newUser: User = response.user;
        const token: string = response.token;

        this.application.set(Item.CurrentUser, newUser);
        this.application.set(Item.AuthToken, token);

        window.location.href = "/";
    }
}