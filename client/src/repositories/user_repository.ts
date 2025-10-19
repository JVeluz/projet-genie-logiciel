import DataBaseAPI from "@data/data_base_api"
import User from "@models/user"
import UserMapper from "@models/user_mapper"

export class LoginResult {
    constructor(public userExists: boolean, public passwordCorrect: boolean) { }
}

export default class UserRepository {

    public get(id: number): User {
        const json: string = DataBaseAPI.getInstance().get("users", id)
        return UserMapper.fromJSON(json)
    }

    public save(user: User): void {
        const json: string = UserMapper.toJSON(user)
        DataBaseAPI.getInstance().save("users", json)
    }

    public findByEmail(email: string): User | null {
        const json: string = DataBaseAPI.getInstance().findByField("users", "email", email)
        if (json) {
            return UserMapper.fromJSON(json)
        }
        return null
    }
}