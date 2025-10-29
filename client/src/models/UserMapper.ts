import User from "./User";

export default class UserMapper {

    public static fromJSON(json: string): User {
        const data = JSON.parse(json);
        const user: User = new User();
        Object.assign(user, data);
        console.log(user);
        return user;
    }

    public static toJSON(user: User): string {
        console.log(JSON.stringify(user));

        return JSON.stringify(user);
    }
}