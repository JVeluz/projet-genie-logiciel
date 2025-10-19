import View from "@pages/view"
import LoginPageController from "./login_page_controller"
import HTML from "./login_page.html"


export default class LoginPageView extends View<LoginPageController> {

    private loginForm: HTMLFormElement
    private loginButton: HTMLButtonElement
    private registerButton: HTMLButtonElement

    public constructor() {
        super()
        this.setHTML(HTML)
        this.loginForm = this.element.querySelector("#login-form") as HTMLFormElement
        this.loginButton = this.element.querySelector("#login-button") as HTMLButtonElement
        this.registerButton = this.element.querySelector("#register-button") as HTMLButtonElement
        this.connectEvents()
    }

    public connectEvents(): void {
        this.loginButton.onclick = this.onLoginButtonClicked.bind(this)
        this.registerButton.onclick = this.onRegisterButtonClicked.bind(this)
    }

    public onLoginSuccess(userName: string): void {
        alert("Welcome, " + userName + "!")
    }

    public onLoginFailure(errorMessage: string): void {
        alert("Login failed: " + errorMessage)
    }

    public onRegisterSuccess(message: string): void {
        alert("Registration successful: " + message)
    }

    public onRegisterFailure(errorMessage: string): void {
        alert("Registration failed: " + errorMessage)
    }

    private onLoginButtonClicked(event: Event): void {
        event.preventDefault()
        const formData: FormData = new FormData(this.loginForm)
        const email: string = formData.get("email") as string
        const password: string = formData.get("password") as string
        this.controller?.handleLogin(email, password)
    }

    private onRegisterButtonClicked(event: Event): void {
        event.preventDefault()
        const formData: FormData = new FormData(this.loginForm)
        const email: string = formData.get("email") as string
        const password: string = formData.get("password") as string
        this.controller?.handleRegister(email, password)
    }
}