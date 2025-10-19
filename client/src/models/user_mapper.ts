import User from "./user"

export default class UserMapper {

    public static fromJSON(json: string): User {
        const data = JSON.parse(json)
        return new User(data.name, data.email, data.password)
    }

    public static toJSON(user: User): string {
        return JSON.stringify({
            name: user.getName(),
            email: user.getEmail(),
            password: user.getHashedPassword()
        })
    }
}