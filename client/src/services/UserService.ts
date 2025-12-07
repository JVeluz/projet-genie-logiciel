import UserRepository from "../repositories/UserRepository";
import User from "../models/User";

export default class UserService {

    public static async getByID(userID: string): Promise<User> {
        console.log(await UserRepository.getByID(userID));
        return await UserRepository.getByID(userID);
    }

    public static async login(email: string, password: string): Promise<{ token: string, user: User }> {
        return await UserRepository.login(email, password);
    }

    public static async register(user: User, password: string): Promise<{ token: string, user: User }> {
        return await UserRepository.register(user.name, user.email, password);
    }

    public static async update(user: User): Promise<User> {
        return await UserRepository.update(user);
    }
}