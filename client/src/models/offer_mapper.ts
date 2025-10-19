import Offer from "./offer"

export default class OfferMapper {

    public static fromJSON(json: string): Offer {
        const data = JSON.parse(json)
        return new Offer(data.title, data.description, data.price)
    }

    public static toJSON(offer: Offer): string {
        return JSON.stringify({
            title: offer.getTitle(),
            description: offer.getDescription(),
            price: offer.getPrice()
        })
    }
}