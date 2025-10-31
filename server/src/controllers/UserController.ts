import { Request, Response } from "express";
import { UserService } from "../services/UserService";


export default class UserController {

    public getById = async (request: Request, response: Response): Promise<Response> => {
        const { id } = request.params;
        const result = await UserService.getById(id);
        return response.status(200).json(result);
    }

    public register = async (request: Request, response: Response): Promise<Response> => {
        const userData = request.body;
        const result = await UserService.register(userData);
        return response.status(201).json(result);
    }

    public login = async (request: Request, response: Response): Promise<Response> => {
        const userData = request.body;
        const result = await UserService.login(userData);
        return response.status(200).json(result);
    }
}