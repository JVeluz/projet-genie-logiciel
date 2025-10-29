import DataBaseAPI from "@data/DataBaseAPI"
import Offer from "@models/Offer"
import OfferMapper from "@models/OfferMapper"
import User from "@models/User";


export default class OfferRepository {

    public get(id: number): Offer {
        const offer: Offer = new Offer();
        offer.title = "Sample Offer";
        offer.description = "This is a sample offer description.";
        offer.price = 99.99;
        offer.seller = new User();
        offer.seller.name = "Joachim";
        return offer;

        const json: string = DataBaseAPI.getInstance().get("offers", id)
        return OfferMapper.fromJSON(json)
    }

    public save(offer: Offer): void {
        const json: string = OfferMapper.toJSON(offer)
        DataBaseAPI.getInstance().save("offers", json)
    }

    public search(query: string): Offer[] {
        const jsonList: string[] = DataBaseAPI.getInstance().search("offers", query)
        return jsonList.map(json => OfferMapper.fromJSON(json))
    }
}