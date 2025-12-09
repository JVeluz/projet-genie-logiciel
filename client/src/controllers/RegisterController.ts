import { IUser } from "shared";
import Application from "../models/Application";
import UserService from "../services/UserService";

export default class RegisterController {

    // Services
    private userService = new UserService();
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
        const user: Partial<IUser> = {};
        user.name = formData.get("name") as string;
        user.email = formData.get("email") as string;

        let newUser: IUser;
        let token: string;
        try {
            const response = await this.userService.register(user, password);
            newUser = response.user;
            token = response.token;
        } catch (error) {
            console.error("Registration failed:", error);
            return;
        }

        this.application.user.set(newUser);
        this.application.token.set(token);

        window.location.href = "/";
    }
}