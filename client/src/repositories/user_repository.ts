import DataBaseAPI from "../data_base_api"
import User from "../models/user"
import UserMapper from "./mappers/user_mapper"

export default class UserRepository {

    public get(id: number): User {
        const json: string = DataBaseAPI.getInstance().get("users", id)
        return UserMapper.fromJSON(json)
    }

    public save(user: User): void {
        const json: string = UserMapper.toJSON(user)
        DataBaseAPI.getInstance().save("users", json)
    }
}