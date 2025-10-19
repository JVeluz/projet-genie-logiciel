import LoginPageView from "./login_page_view"
import User from "@models/user"

const USER_NOT_FOUND_MESSAGE: string = "Aucun utilisateur trouvé."
const INCORRECT_PASSWORD_MESSAGE: string = "Mot de passe incorrect."

export default class LoginPageModel {

    private view: LoginPageView | null = null

    private user: User | null = null
    private errorMessage: string = ""

    public setView(view: LoginPageView): void {
        this.view = view
    }

    public setUser(user: User): void {
        this.user = user
        this.view?.onUserConnected(this.user.getName())
    }

    public userNotFound(): void {
        this.errorMessage = USER_NOT_FOUND_MESSAGE
        this.view?.onLoginFailed(this.errorMessage)
    }

    public incorrectPassword(): void {
        this.errorMessage = INCORRECT_PASSWORD_MESSAGE
        this.view?.onLoginFailed(this.errorMessage)
    }
}