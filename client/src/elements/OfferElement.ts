import Offer from "../models/Offer";
import UserElement from "./UserElement";
import UserController from "../controllers/UserController";

export default class OfferElement extends HTMLElement {

    public update(offer: Offer): void {
        const lookupButton = this.querySelector('.offer-lookup-button') as HTMLAnchorElement;
        const titleElement = this.querySelector('.offer-title') as HTMLElement;
        const descriptionElement = this.querySelector('.offer-description') as HTMLElement;
        const categoryElement = this.querySelector('.offer-category') as HTMLElement;
        const typeElement = this.querySelector('.offer-type') as HTMLElement;
        const exchangeElement = this.querySelector('.offer-exchange') as HTMLElement;
        const locationElement = this.querySelector('.offer-location') as HTMLElement;
        const sellerElement = this.querySelector('.offer-seller') as UserElement;

        if (locationElement && offer.location) {
            locationElement.textContent = offer.location;
        }
        if (exchangeElement && offer.exchange) {
            exchangeElement.textContent = offer.exchange;
        }
        if (categoryElement) {
            categoryElement.textContent = offer.category;
        }
        if (typeElement) {
            typeElement.textContent = offer.type;
        }
        if (sellerElement) {
            new UserController(sellerElement)
                .load(offer.sellerID);
        }
        if (titleElement) {
            titleElement.textContent = offer.title;
        }
        if (descriptionElement) {
            descriptionElement.textContent = offer.description;
        }
        if (lookupButton) {
            lookupButton.href = `/offer?id=${offer._id}`;
        }
    }
}