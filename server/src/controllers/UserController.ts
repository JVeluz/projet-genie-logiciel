import { Request, Response } from "express";
import { UserService } from "../services/UserService";


export default class UserController {

    private service: UserService = new UserService();

    public getUserById = async (request: Request, response: Response): Promise<Response> => {
        const { id } = request.params;
        const user = await this.service.getUserById(id);
        return response.status(200).json(user);
    }

    public getAllUsers = async (request: Request, response: Response): Promise<Response> => {
        const users = await this.service.getAllUsers();
        return response.status(200).json(users);
    }

    public createUser = async (request: Request, response: Response): Promise<Response> => {
        const userData = request.body;
        const newUser = await this.service.createUser(userData);
        return response.status(201).json(newUser);
    }

    public login = async (request: Request, response: Response): Promise<Response> => {
        const userData = request.body;
        const token: string = await this.service.login(userData);
        return response.status(200).json({ token });
    }
}