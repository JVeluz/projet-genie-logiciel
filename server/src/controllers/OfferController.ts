import { Request, Response } from "express";
import OfferService from "../services/OfferService";

export default class OfferController {

    public static async getAll(request: Request, response: Response): Promise<Response> {
        const result = await OfferService.getAll();
        return response.status(200).json(result);
    }

    public static async getById(request: Request, response: Response): Promise<Response> {
        const id = request.params.id;
        const result = await OfferService.getById(id);
        return response.status(200).json(result);
    }

    public static async search(request: Request, response: Response): Promise<Response> {
        const terms = request.params.terms;
        const result = await OfferService.getByTerms(terms);
        return response.status(200).json(result);
    }

    public static async create(request: Request, response: Response): Promise<Response> {
        const offer = request.body;
        const result = await OfferService.create(offer);
        return response.status(201).json(result);
    }

    public static async update(request: Request, response: Response): Promise<Response> {
        const id = request.params.id;
        const offerData = request.body;
        const result = await OfferService.update(id, offerData);
        return response.status(200).json(result);
    }

    public static async delete(request: Request, response: Response): Promise<Response> {
        const id = request.params.id;
        await OfferService.delete(id);
        return response.status(204).send();
    }
}