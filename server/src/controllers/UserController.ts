import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export default class UserController {

    public static async getById(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const result = await UserService.getById(id);
        return response.status(200).json(result);
    }

    public static async register(request: Request, response: Response): Promise<Response> {
        const userData = request.body;
        const result = await UserService.register(userData);
        return response.status(201).json(result);
    }

    public static async login(request: Request, response: Response): Promise<Response> {
        const userData = request.body;
        const result = await UserService.login(userData);
        return response.status(200).json(result);
    }
}
