import { IUser } from "shared";
import UserRepository from "../repositories/UserRepository";

export default class UserService {

    public constructor(
        private userRepository = new UserRepository()
    ) { }

    public async getByID(userID: string): Promise<IUser> {
        return await this.userRepository.getByID(userID);
    }

    public async login(email: string, password: string): Promise<{ token: string, user: IUser }> {
        return await this.userRepository.login(email, password);
    }

    public async register(user: Partial<IUser>, password: string): Promise<{ token: string, user: IUser }> {
        if (!user.name) throw Error("Name requiered");
        if (!user.email) throw Error("Email requiered");
        return await this.userRepository.register(user.name, user.email, password);
    }

    public async update(user: IUser): Promise<IUser> {
        return await this.userRepository.update(user);
    }
}