import User from "@models/user"
import UserRepository from "@repositories/user_repository"


export class LoginResponse {
    public constructor(
        public success: boolean,
        public isPasswordCorrect: boolean,
        public user: User | null = null,
    ) { }
    public static wrongPassword(): LoginResponse { return new LoginResponse(false, false) }
    public static userNotFound(): LoginResponse { return new LoginResponse(false, true) }
    public static success(user: User): LoginResponse { return new LoginResponse(true, true, user) }
}

export class RegisterResponse {
    public constructor(
        public success: boolean,
        public isEmailTaken: boolean,
        public user: User | null = null,
    ) { }
    public static emailTaken(): RegisterResponse { return new RegisterResponse(false, true) }
    public static success(user: User): RegisterResponse { return new RegisterResponse(true, false, user) }
}


export default class UserService {

    private repository: UserRepository = new UserRepository()

    public get(id: number): User {
        return this.repository.get(id)
    }

    public save(user: User): void {
        this.repository.save(user)
    }

    public tryLogin(email: string, password: string): LoginResponse {
        const user: User | null = this.repository.findByEmail(email)
        if (user === null) {
            return LoginResponse.userNotFound()
        }
        if (user.getHashedPassword() !== password) {
            return LoginResponse.wrongPassword()
        }
        return LoginResponse.success(user)
    }

    public tryRegister(email: string, password: string): RegisterResponse {
        const existingUser: User | null = this.repository.findByEmail(email)
        if (existingUser) {
            return RegisterResponse.emailTaken()
        }
        const newUser: User = new User(email, password)
        this.repository.save(newUser)
        return RegisterResponse.success(newUser)
    }
}