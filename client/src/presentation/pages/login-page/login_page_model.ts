import LoginPageView from "./login_page_view"
import Model from "@presentation/mvc/model"
import User from "@models/user"


export default class LoginPageModel extends Model<LoginPageView> {

    private user: User | null = null
    private loginState: any = {}
    private registerState: any = {}

    public setUser(user: User): void {
        this.user = user
        this.view?.onUserChanged(this.user)
    }

    public setLoginResponse(success: boolean, user: User | null, isPasswordCorrect: boolean): void {
        this.loginState = { success, user, isPasswordCorrect }
        this.view?.onLoginResponse(this.loginState)
    }

    public setRegisterResponse(success: boolean, isEmailTaken: boolean): void {
        this.registerState = { success, isEmailTaken }
        this.view?.onRegisterResponse(this.registerState)
    }
}