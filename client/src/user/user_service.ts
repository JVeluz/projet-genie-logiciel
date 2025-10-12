import User from "./user"
import DataBaseAPI from "../data_base_api"

export default class UserService {

    /**
     * get User from Data Base
     */
    public getUser(id: number): User {
        const json: string = DataBaseAPI.getInstance().getUser(0)
        return User.fromJSON(json)
    }

    /**
     * Save an User in the Data Base
     */
    public saveUser(user: User) {
        const json: string = user.toJSON()
        DataBaseAPI.getInstance().saveUser(json)
    }
}