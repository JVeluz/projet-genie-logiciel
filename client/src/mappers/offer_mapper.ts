import Offer from "../models/offer"

export default class OfferMapper {

    public static fromJSON(json: string): Offer {
        const data = JSON.parse(json)
        return new Offer()
            .setTitle(data.title)
            .setDescription(data.description)
    }

    public static toJSON(offer: Offer): string {
        return JSON.stringify({
            title: offer.getTitle(),
            description: offer.getDescription()
        })
    }
}