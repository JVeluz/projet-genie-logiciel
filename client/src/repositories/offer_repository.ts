import DataBaseAPI from "../data_base_api"
import Offer from "../models/offer"
import OfferMapper from "./mappers/offer_mapper"

export default class OfferRepository {

    public get(id: number): Offer {
        const json: string = DataBaseAPI.getInstance().get("offers", id)
        return OfferMapper.fromJSON(json)
    }

    public save(offer: Offer): void {
        const json: string = OfferMapper.toJSON(offer)
        DataBaseAPI.getInstance().save("offers", json)
    }
}