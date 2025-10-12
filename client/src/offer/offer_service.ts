import DataBaseAPI from "../data_base_api"
import Offer from "./offer"

export default class OfferService {

    public get(id: number): Offer {
        const json: string = DataBaseAPI.getInstance().getUser(0)
        return Offer.fromJSON(json)
    }

    public save(offer: Offer) {
        const json: string = offer.toJSON()
        DataBaseAPI.getInstance().saveUser(json)
    }
}