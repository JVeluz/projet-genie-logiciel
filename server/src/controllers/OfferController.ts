import { Request, Response } from "express";
import OfferService from "../services/OfferService";

export default class OfferController {

    public constructor(
        private offerService = new OfferService()
    ) { }

    public getAll = async (request: Request, response: Response): Promise<Response> => {
        const result = await this.offerService.getAll();
        return response.status(200).json(result);
    }

    public getById = async (request: Request, response: Response): Promise<Response> => {
        const id = request.params.id;
        const result = await this.offerService.getById(id);
        return response.status(200).json(result);
    }

    public search = async (request: Request, response: Response): Promise<Response> => {
        const terms = request.params.terms;
        const result = await this.offerService.getByTerms(terms);
        return response.status(200).json(result);
    }

    public create = async (request: Request, response: Response): Promise<Response> => {
        const offer = request.body;
        const result = await this.offerService.create(offer);
        return response.status(201).json(result);
    }

    public update = async (request: Request, response: Response): Promise<Response> => {
        const offer = request.body;
        const result = await this.offerService.update(offer);
        return response.status(200).json(result);
    }

    public delete = async (request: Request, response: Response): Promise<Response> => {
        const id = request.params.id;
        await this.offerService.delete(id);
        return response.status(204).send();
    }

    public reserve = async (request: Request, response: Response): Promise<Response> => {
        const offerID = request.params.id;
        const { candidateBuyerID } = request.body;

        const currentUserID = request.user?.userID;
        if (!currentUserID)
            throw Error("Current session is invalid");

        await this.offerService.reserve(offerID, candidateBuyerID);
        return response.status(200).json({ message: "Offer reserved" });
    }

    public confirm = async (request: Request, response: Response): Promise<Response> => {
        const offerID = request.params.id;

        const currentUserID = request.user?.userID;
        if (!currentUserID)
            throw Error("Current session is invalid");

        await this.offerService.confirm(offerID, currentUserID);
        return response.status(200).json({ message: "Transaction confirmed" });
    }

    public cancel = async (request: Request, response: Response): Promise<Response> => {
        const offerID = request.params.id;

        const currentUserID = request.user?.userID;
        if (!currentUserID)
            throw Error("Current session is invalid");

        await this.offerService.cancel(offerID, currentUserID);
        return response.status(200).json({ message: "Transaction cancelled" });
    }
}