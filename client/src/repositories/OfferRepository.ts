import { IOffer } from "shared";
import ServerAPI from "../ServerAPI";
import OfferMapper from "../mappers/OfferMapper";

export default class IOfferRepository {

    public async getAll(): Promise<IOffer[]> {
        const response = await ServerAPI.get("/offers");
        return response.map((offerData: any) => OfferMapper.toDomain(offerData));
    }

    public async getByID(offerID: string): Promise<IOffer> {
        const response = await ServerAPI.get(`/offers/${offerID}`);
        return OfferMapper.toDomain(response);
    }

    public async create(offer: IOffer): Promise<IOffer> {
        const response = await ServerAPI.post("/offers", JSON.stringify(offer));
        return OfferMapper.toDomain(response);
    }

    public async update(offer: IOffer): Promise<void> {
        await ServerAPI.put(`/offers/${offer._id}`, JSON.stringify(offer));
    }

    public async delete(offerID: string): Promise<void> {
        await ServerAPI.delete(`/offers/${offerID}`);
    }

    public async reserve(offerID: string, candidateBuyerID: string): Promise<void> {
        const response = await ServerAPI.post(`/offers/${offerID}/reserve`, JSON.stringify({
            candidateBuyerID
        }));
        console.log(response);
    }

    public async confirm(offerID: string): Promise<void> {
        const response = await ServerAPI.post(`/offers/${offerID}/confirm`, JSON.stringify({}));
        console.log(response);
    }

    public async cancel(offerID: string): Promise<void> {
        const response = await ServerAPI.post(`/offers/${offerID}/cancel`, JSON.stringify({}));
        console.log(response);
    }
}