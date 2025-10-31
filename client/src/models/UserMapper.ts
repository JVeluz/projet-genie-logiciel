import User from "./User";

type UserDTO = {
    _id: string;
    name: string;
    email: string;
};

export default class UserMapper {

    public static fromJSON(json: string): User {
        const data: UserDTO = JSON.parse(json);
        const user: User = new User();
        user.id = data._id;
        user.name = data.name;
        user.email = data.email;
        return user;
    }

    public static toJSON(user: User): string {
        const data: UserDTO = {
            _id: user.id,
            name: user.name,
            email: user.email
        };
        return JSON.stringify(data);
    }
}