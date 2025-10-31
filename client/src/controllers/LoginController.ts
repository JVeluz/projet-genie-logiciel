import ApplicationModel from "@core/ApplicationModel";
import UserService from "@services/UserService";

export default class LoginController {

    private model: ApplicationModel = ApplicationModel.getInstance();

    public constructor(
        private form: HTMLFormElement,
        private logoutButton: HTMLButtonElement | null = null,
    ) {
        this.form.onsubmit = (event: Event) => this.onSubmit(event);
        if (this.logoutButton) {
            this.logoutButton.onclick = (event: Event) => this.onLogout(event);
        }
    }

    public async onSubmit(event: Event): Promise<void> {
        event.preventDefault();
        const formData: FormData = new FormData(this.form);
        const email: string = formData.get("email") as string;
        const password: string = formData.get("password") as string;
        try {
            const { token, user } = await UserService.login(email, password);
            this.model.set("authToken", token);
            this.model.set("currentUser", user);
            window.location.href = "/";
        } catch (error) {
            alert("Mauvaise combinaison email/mot de passe.");
        }
    }

    public onLogout(event: Event): void {
        event.preventDefault();
        this.model.set("currentUser", null);
        window.location.href = "/";
    }
}