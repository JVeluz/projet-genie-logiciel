import { IUser } from "shared";
import ServerAPI from "../ServerAPI";
import UserMapper from "../mappers/UserMapper";

export default class UserRepository {

    public async getByID(userID: string): Promise<IUser> {
        const response = await ServerAPI.get(`/users/${userID}`);
        return UserMapper.toDomain(response);
    }

    public async login(email: string, password: string): Promise<{ token: string, user: IUser }> {
        const body: BodyInit = JSON.stringify({
            email, password
        });
        const response = await ServerAPI.post(`/users/login`, body);
        return {
            token: response.token, user: UserMapper.toDomain(response.user)
        };
    }

    public async register(name: string, email: string, password: string): Promise<{ token: string, user: IUser }> {
        const body: BodyInit = JSON.stringify({
            name, email, password
        });
        const response = await ServerAPI.post(`/users/register`, body);
        return {
            token: response.token, user: UserMapper.toDomain(response.user)
        };
    }

    public async update(user: IUser): Promise<IUser> {
        const body: BodyInit = JSON.stringify(user);
        const response = await ServerAPI.put(`/users/${user._id}`, body);
        return UserMapper.toDomain(response);
    }
}