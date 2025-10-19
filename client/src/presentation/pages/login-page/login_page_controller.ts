import Controller from "@pages/controller"
import LoginPageModel from "@pages/login-page/login_page_model"
import UserService, { LoginResponse } from "@services/user_service"


export default class LoginPageController extends Controller<LoginPageModel> {

    public handleLogin(email: string, password: string): void {
        const service: UserService = new UserService()
        const result: LoginResponse = service.tryLogin(email, password)
        if (result.user == null) {
            this.model?.userNotFound()
            return
        }
        if (result.passwordCorrect === false) {
            this.model?.passwordFailed()
            return
        }
        this.model?.setUser(result.user)
    }

    public handleRegister(email: string, password: string): void {
        const service: UserService = new UserService()
        const success: boolean = service.tryRegister(email, password)
        if (success) {
            this.model?.userRegistered()
        } else {
            this.model?.userRegistrationFailed()
        }
    }
}