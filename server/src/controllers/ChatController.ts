import { Request, Response } from "express";
import ChatService from "../services/ChatService";

export default class ChatController {

    public constructor(
        private chatService: ChatService
    ) { }

    public getById = async (request: Request, response: Response): Promise<Response> => {
        const { id } = request.params;
        const chat = await this.chatService.getById(id);
        return response.status(200).json(chat);
    }

    public getByOfferAndBuyer = async (request: Request, response: Response): Promise<Response> => {
        const { offerID, buyerID } = request.body;
        const chat = await this.chatService.getByOfferAndBuyer(offerID, buyerID);
        return response.status(200).json(chat);
    }

    public getOrCreateWithMessage = async (request: Request, response: Response): Promise<Response> => {
        const { offerID, buyerID, message } = request.body;
        const chat = await this.chatService.getOrCreateWithMessage(offerID, buyerID, message);
        return response.status(201).json(chat);
    }

    public getMessages = async (request: Request, response: Response): Promise<Response> => {
        const { chatID } = request.params;
        const chat = await this.chatService.getMessages(chatID);
        return response.status(200).json(chat);
    }

    public sendMessage = async (request: Request, response: Response): Promise<Response> => {
        const { id } = request.params;
        const { senderID, content } = request.body;
        await this.chatService.sendMessage(id, senderID, content);
        return response.status(204).send();
    }

    public deleteMessage = async (request: Request, response: Response): Promise<void> => {
        const { messageID } = request.params;
    }
}