import Offer from "./Offer";

export default class OfferMapper {

    public static fromJSON(json: string): Offer {
        const data = JSON.parse(json);
        const offer: Offer = new Offer();
        Object.assign(offer, data);
        return offer;
    }

    public static toJSON(offer: Offer): string {
        return JSON.stringify(offer);
    }
}