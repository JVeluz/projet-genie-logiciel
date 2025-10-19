import LoginPageController from "./login_page_controller"
import View from "@presentation/mvc/view"
import HTML from "./login_page.html"


const LOGIN_SUCCESS_MESSAGE: string = "Connexion réussie."
const LOGIN_FAILED_MESSAGE: string = "Échec de la connexion."
const USER_NOT_FOUND_MESSAGE: string = "Aucun utilisateur trouvé."
const PASSWORD_FAILED_MESSAGE: string = "Mot de passe incorrect."
const REGISTRATION_SUCCESS_MESSAGE: string = "Utilisateur enregistré avec succès."
const REGISTRATION_FAILED_MESSAGE: string = "Échec de l'inscription de l'utilisateur."
const EMAIL_TAKEN_MESSAGE: string = "L'adresse e-mail est déjà utilisée."


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

        this.loginButton.onclick = this.onLoginButtonClicked.bind(this)
        this.registerButton.onclick = this.onRegisterButtonClicked.bind(this)
    }

    public onUserChanged(user: any): void {
        console.log("User changed:", user)
    }

    public onLoginResponse(response: any): void {
        if (response.success === false) {
            alert(LOGIN_FAILED_MESSAGE)
            return
        }
        if (response.user === null) {
            alert(USER_NOT_FOUND_MESSAGE)
            return
        }
        if (response.isPasswordCorrect === false) {
            alert(PASSWORD_FAILED_MESSAGE)
            return
        }
        alert(LOGIN_SUCCESS_MESSAGE)
    }

    public onRegisterResponse(response: any): void {
        if (response.success === false) {
            alert(REGISTRATION_FAILED_MESSAGE)
            return
        }
        if (response.isEmailTaken === true) {
            alert(EMAIL_TAKEN_MESSAGE)
            return
        }
        alert(REGISTRATION_SUCCESS_MESSAGE)
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