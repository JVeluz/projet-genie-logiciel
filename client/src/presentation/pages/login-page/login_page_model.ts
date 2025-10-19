import Model from "@pages/model"
import LoginPageView from "./login_page_view"
import User from "@models/user"


const USER_NOT_FOUND_MESSAGE: string = "Aucun utilisateur trouvé."
const PASSWORD_FAILED_MESSAGE: string = "Mot de passe incorrect."
const REGISTRATION_FAILED_MESSAGE: string = "Échec de l'inscription de l'utilisateur."
const REGISTRATION_SUCCESS_MESSAGE: string = "Utilisateur enregistré avec succès."


export default class LoginPageModel extends Model<LoginPageView> {
    private user: User | null = null

    public setUser(user: User): void {
        this.user = user
        this.view?.onLoginSuccess(this.user.getName())
    }

    public userNotFound(): void {
        this.view?.onLoginFailure(USER_NOT_FOUND_MESSAGE)
    }

    public passwordFailed(): void {
        this.view?.onLoginFailure(PASSWORD_FAILED_MESSAGE)
    }

    public userRegistered(): void {
        this.view?.onRegisterSuccess(REGISTRATION_SUCCESS_MESSAGE)
    }

    public userRegistrationFailed(): void {
        this.view?.onRegisterFailure(REGISTRATION_FAILED_MESSAGE)
    }
}