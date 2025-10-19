import LoginPageModel from "@pages/login-page/login_page_model"
import UserService, { LoginResponse } from "@services/user_service"


export default class LoginPageController {

    private model: LoginPageModel | null = null

    public setModel(model: LoginPageModel): void {
        this.model = model
    }

    public handleLogin(email: string, password: string): void {
        const service: UserService = new UserService()
        const result: LoginResponse = service.tryLogin(email, password)

        console.log(`
            Email: ${email}
            Password: ${password}
        `);


        if (!result.user) {
            this.model?.userNotFound()
            return
        }
        if (!result.passwordCorrect) {
            this.model?.incorrectPassword()
            return
        }
        this.model?.setUser(result.user)
    }
}