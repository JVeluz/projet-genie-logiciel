import { Request, Response } from "express";
import ChatService from "../services/ChatService";

export default class ChatController {

    public static async getById(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const chat = await ChatService.getById(id);
        return response.status(200).json(chat);
    }

    public static async getByOfferAndBuyer(request: Request, response: Response): Promise<Response> {
        const { offerID, buyerID } = request.body;
        const chat = await ChatService.getByOfferAndBuyer(offerID, buyerID);
        return response.status(200).json(chat);
    }

    public static async getOrCreate(request: Request, response: Response): Promise<Response> {
        const { offerID, buyerID } = request.body;
        const chat = await ChatService.getOrCreate(offerID, buyerID);
        return response.status(201).json(chat);
    }

    public static async getMessages(request: Request, response: Response): Promise<Response> {
        const { chatID } = request.params;
        const chat = await ChatService.getMessages(chatID);
        return response.status(200).json(chat);
    }

    public static async sendMessage(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { senderID, content } = request.body;
        await ChatService.sendMessage(id, senderID, content);
        return response.status(204).send();
    }

    public static async deleteMessage(request: Request, response: Response): Promise<void> {
        const { messageID } = request.params;
    }
}