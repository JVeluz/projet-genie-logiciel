import DataBaseAPI from "@data/DataBaseAPI"
import User from "@models/User"
import UserMapper from "@models/UserMapper"


export default class UserRepository {

    public get(id: number): User {
        const user: User = new User();
        user.id = 123;
        user.email = "j.veluz2002@gmail.com";
        user.name = "Jesse";
        user.setPassword("sdf");
        user.rating = 2.5;
        return user;

        const json: string = DataBaseAPI.getInstance().get("users", id);
        return UserMapper.fromJSON(json);
    }

    public save(user: User): void {
        const json: string = UserMapper.toJSON(user);
        DataBaseAPI.getInstance().save("users", json);
    }

    public findByEmail(email: string): User | null {
        const user: User = new User();
        user.email = "j.veluz2002@gmail.com";
        user.name = "Jesse";
        user.setPassword("sdf");
        return user;

        const json: string = DataBaseAPI.getInstance().findByField("users", "email", email);
        if (json) {
            return UserMapper.fromJSON(json);
        }
        return null;
    }
}