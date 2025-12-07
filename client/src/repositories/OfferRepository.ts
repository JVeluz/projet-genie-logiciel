import IOffer from "shared/src/interfaces/IOffer";
import ServerAPI from "../ServerAPI";

export default class IOfferRepository {

    public static async getAll(): Promise<IOffer[]> {
        return await ServerAPI.get("/offers");
    }

    public static async getByID(offerID: string): Promise<IOffer> {
        return await ServerAPI.get(`/offers/${offerID}`);
    }

    public static async create(offer: IOffer): Promise<IOffer> {
        return await ServerAPI.post("/offers", JSON.stringify(offer));
    }

    public static async update(offer: IOffer): Promise<void> {
        await ServerAPI.put(`/offers/${offer._id}`, JSON.stringify(offer));
    }

    public static async delete(offerID: string): Promise<void> {
        await ServerAPI.delete(`/offers/${offerID}`);
    }
}