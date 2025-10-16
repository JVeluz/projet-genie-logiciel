import User from "@models/user"
import UserRepository from "@repositories/user_repository"

export default class UserService {

    private repository: UserRepository = new UserRepository()

    public get(id: number): User {
        return this.repository.get(id)
    }

    public save(user: User): void {
        this.repository.save(user)
    }
}