import { Request, Response } from "express";
import UserService from "../services/UserService";

export default class UserController {

    public constructor(
        private userService = new UserService()
    ) { }

    public getById = async (request: Request, response: Response): Promise<Response> => {
        const { id } = request.params;
        const result = await this.userService.getById(id);
        return response.status(200).json(result);
    }

    public register = async (request: Request, response: Response): Promise<Response> => {
        const userData = request.body;
        const result = await this.userService.register(userData);
        return response.status(201).json(result);
    }

    public login = async (request: Request, response: Response): Promise<Response> => {
        const userData = request.body;
        const result = await this.userService.login(userData);
        return response.status(200).json(result);
    }

    public update = async (request: Request, response: Response): Promise<Response> => {
        const { id } = request.params;
        const userData = request.body;
        const result = await this.userService.update(id, userData);
        return response.status(200).json(result);
    }
}
