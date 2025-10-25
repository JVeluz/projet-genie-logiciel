import LoginElement from "@presentation/login_element";
import User from "@models/user";
import UserService from "@services/user_service";


export default class LoginController {

    private view: LoginElement;
    private model: User | null = null;
    private userService: UserService = new UserService();

    public constructor(view: LoginElement) {
        this.view = view;
    }

    public onLoginClick(event: Event): void {
        event.preventDefault();
        const formData: FormData = new FormData(this.view);
        const email: string = formData.get("email") as string;
        const password: string = formData.get("password") as string;
        this.handleLogin(email, password);
    }

    public onRegisterClick(event: Event): void {
        event.preventDefault();
        const formData: FormData = new FormData(this.view);
        const name: string = formData.get("name") as string;
        const email: string = formData.get("email") as string;
        const password: string = formData.get("password") as string;
    }

    private handleLogin(email: string, password: string): void {
        if (this.isValidPassword(password) === false) {
            alert("Invalid password format");
            return;
        }

        const response = this.userService.tryLogin(email, password);
        if (response.success === false) {
            alert("Login failed");
            return;
        }
        if (response.isPasswordCorrect === false) {
            alert("Wrong password");
            return;
        }
        alert("Login successful");
    }

    private isValidEmail(email: string): boolean {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private isValidPassword(password: string): boolean {
        return password.length >= 6;
    }

    private isValidName(name: string): boolean {
        return name.length >= 2;
    }
}