import ServerAPI from "../ServerAPI";
import Offer from "../models/Offer";

export default class OfferRepository {

    public static async getAll(): Promise<Offer[]> {
        return (await ServerAPI.get("/offers")).map(Offer.fromJSON);
    }

    public static async getByID(offerID: string): Promise<Offer> {
        return Offer.fromJSON(await ServerAPI.get(`/offers/${offerID}`));
    }

    public static async create(offer: Offer): Promise<Offer> {
        return Offer.fromJSON(await ServerAPI.post("/offers", JSON.stringify(offer)));
    }

    public static async update(offer: Offer): Promise<void> {
        await ServerAPI.put(`/offers/${offer._id}`, JSON.stringify(offer));
    }

    public static async delete(offerID: string): Promise<void> {
        await ServerAPI.delete(`/offers/${offerID}`);
    }
}