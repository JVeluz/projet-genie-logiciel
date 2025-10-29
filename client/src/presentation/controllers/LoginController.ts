import ApplicationModel from "@core/ApplicationModel";
import UserService from "@services/UserService";
import navigateTo from "../../router";


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

    private userService: UserService = new UserService();

    public onSubmit(event: Event): void {
        event.preventDefault();
        const formData: FormData = new FormData(this.form);
        const email: string = formData.get("email") as string;
        const password: string = formData.get("password") as string;
        console.log(`onSubmit(${email}, ${password})`);
        const response: any = this.userService.tryLogin(email, password)
        console.log(response);
        if (response.success) {
            this.model.set("currentUser", response.user);
            navigateTo("/");
        }
    }

    public onLogout(event: Event): void {
        event.preventDefault();
        console.log("onLogout()");
        this.model.set("currentUser", null);
        navigateTo("/");
    }
}