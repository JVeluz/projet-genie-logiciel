import ApplicationModel from "../core/ApplicationModel";
import UserService from "../services/UserService";

export default class RegisterController {

    private model: ApplicationModel = ApplicationModel.getInstance();

    constructor(private form: HTMLFormElement) {
        this.form.onsubmit = (event: Event) => this.onSubmit(event);
    }

    private async onSubmit(event: Event): Promise<void> {
        event.preventDefault();
        const formData: FormData = new FormData(this.form);
        const name: string = formData.get("name") as string;
        const email: string = formData.get("email") as string;
        const password: string = formData.get("password") as string;
        try {
            const response = await UserService.register(name, email, password);
            const { token, user } = response;
            this.model.set("currentUser", user);
            this.model.set("authToken", token);
            window.location.href = "/";
        } catch (error: any) {
            alert(error.message);
        }
    }
}