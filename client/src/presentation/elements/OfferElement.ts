import Offer from "@models/Offer";
import UserElement from "./UserElement";

export default class OfferElement extends HTMLElement {

    public update(offer: Offer): void {
        const lookupButton = this.querySelector('.offer-lookup-button') as HTMLAnchorElement;
        const titleElement = this.querySelector('.offer-title') as HTMLElement;
        const descriptionElement = this.querySelector('.offer-description') as HTMLElement;
        const sellerElement = this.querySelector('.offer-seller') as UserElement;
        const categoryElement = this.querySelector('.offer-category') as HTMLElement;
        const askExchangeElement = this.querySelector('.offer-ask-exchange') as HTMLElement;
        const locationElement = this.querySelector('.offer-location') as HTMLElement;

        if (locationElement && offer.location) {
            locationElement.textContent = offer.location;
        }
        if (askExchangeElement && offer.askExchange) {
            askExchangeElement.textContent = offer.askExchange;
        }
        if (categoryElement) {
            categoryElement.textContent = offer.category;
        }
        if (sellerElement) {
            sellerElement.update(offer.seller);
        }
        if (titleElement) {
            titleElement.textContent = offer.title;
        }
        if (descriptionElement) {
            descriptionElement.textContent = offer.description;
        }
        if (lookupButton) {
            lookupButton.href = `/offer?id=${offer.id}`;
        }
    }
}