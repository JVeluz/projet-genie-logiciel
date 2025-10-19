import Controller from "@presentation/mvc/controller"
import LoginPageModel from "@pages/login-page/login_page_model"
import UserService, { LoginResponse, RegisterResponse } from "@services/user_service"


export default class LoginPageController extends Controller<LoginPageModel> {

    private service: UserService = new UserService()

    public handleLogin(email: string, password: string): void {
        const result: LoginResponse = this.service.tryLogin(email, password)
        this.model?.setLoginResponse(result.success, result.user, result.isPasswordCorrect)
    }

    public handleRegister(email: string, password: string): void {
        const result: RegisterResponse = this.service.tryRegister(email, password)
        this.model?.setRegisterResponse(result.success, result.isEmailTaken)
    }
}