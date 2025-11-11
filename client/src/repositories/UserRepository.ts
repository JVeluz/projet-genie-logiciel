import User from "../models/User";
import ServerAPI from "../ServerAPI";

export default class UserRepository {

    public static async getByID(userID: string): Promise<User> {
        return User.fromJSON(
            await ServerAPI.get(`/users/${userID}`)
        );
    }

    public static async login(email: string, password: string): Promise<{ token: string, user: User }> {
        const body: BodyInit = JSON.stringify({
            email, password
        });
        const response = await ServerAPI.post(`/users/login`, body);
        return {
            token: response.token, user: User.fromJSON(response.user)
        };
    }

    public static async register(name: string, email: string, password: string): Promise<{ token: string, user: User }> {
        const body: BodyInit = JSON.stringify({
            name, email, password
        });
        const response = await ServerAPI.post(`/users/register`, body);
        return {
            token: response.token, user: User.fromJSON(response.user)
        };
    }

    public static async update(user: User): Promise<User> {
        const body: BodyInit = JSON.stringify(user);
        const response = await ServerAPI.put(`/users/${user._id}`, body);
        return User.fromJSON(response);
    }
}