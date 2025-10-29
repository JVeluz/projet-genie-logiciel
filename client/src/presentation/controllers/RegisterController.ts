import UserService from "@services/UserService";

export default class RegisterController {

    constructor(private form: HTMLFormElement) {
        this.form.onsubmit = (event: Event) => this.onSubmit(event);
    }

    private userService: UserService = new UserService();

    private onSubmit(event: Event): void {
        event.preventDefault();
        const formData: FormData = new FormData(this.form);
        const name: string = formData.get("name") as string;
        const email: string = formData.get("email") as string;
        const password: string = formData.get("password") as string;
        console.log(`onSubmit(${email}, ${password})`);
        const response: any = this.userService.tryRegister(name, email, password);
        console.log(response);
    }
}