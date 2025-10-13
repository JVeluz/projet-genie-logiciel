import User from "../models/user"

export default class UserMapper {

    public static fromJSON(json: string): User {
        const data = JSON.parse(json)
        return new User(data.name)
    }

    public static toJSON(user: User): string {
        return JSON.stringify({
            name: user.getName()
        })
    }
}