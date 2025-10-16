import Offer from "./offer"

export default class OfferMapper {

    public static fromJSON(json: string): Offer {
        const data = JSON.parse(json)
        const offer = new Offer()
        offer.title = data.title
        offer.description = data.description
        offer.price = data.price
        return offer
    }

    public static toJSON(offer: Offer): string {
        return JSON.stringify({
            title: offer.title,
            description: offer.description,
            price: offer.price
        })
    }
}