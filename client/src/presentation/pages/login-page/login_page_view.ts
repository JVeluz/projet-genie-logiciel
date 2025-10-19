import LoginPage from "./login_page.html"
import LoginPageController from "./login_page_controller"
import HTMLParser from "@utils/html_parser"

export default class LoginPageView {

    private controller: LoginPageController | null = null

    private element: HTMLElement = HTMLParser.parse(LoginPage, true)
    private loginForm: HTMLFormElement = this.element.querySelector("#login-form") as HTMLFormElement
    private loginButton: HTMLButtonElement = this.element.querySelector("#login-button") as HTMLButtonElement
    private registerButton: HTMLButtonElement = this.element.querySelector("#register-button") as HTMLButtonElement

    public getElement(): HTMLElement {
        return this.element
    }

    public setController(controller: LoginPageController): void {
        this.controller = controller
        this.connectEvents()
    }

    public connectEvents() {
        this.loginButton.addEventListener("click", this.onLoginButtonClicked.bind(this))
        this.registerButton.addEventListener("click", this.onRegisterButtonClicked.bind(this))
    }

    public onUserConnected(userName: string): void {
        alert("Welcome, " + userName + "!")
    }

    public onLoginFailed(errorMessage: string): void {
        alert("Login failed: " + errorMessage)
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
        // Handle registration logic here
    }
}