import User from "@models/user"
import UserRepository from "@repositories/user_repository"

export class LoginResponse {
    constructor(public user: User | null, public passwordCorrect: boolean) { }
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
        if (user && user.getHashedPassword() === password) {
            return new LoginResponse(user, true)
        }
        return new LoginResponse(null, false)
    }

    public tryRegister(email: string, password: string): boolean {
        const existingUser: User | null = this.repository.findByEmail(email)
        if (existingUser) {
            return false
        }
        const newUser: User = new User(email, password)
        this.repository.save(newUser)
        return true
    }
}