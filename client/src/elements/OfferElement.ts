import Offer from "../models/Offer";
import UserElement from "./UserElement";
import UserController from "../controllers/UserController";
import OfferFetch from "../fetches/OfferFetch";

export default class OfferElement extends HTMLElement {

    // Attributes to inject
    private offerID: string | null = null;

    public async connectedCallback(): Promise<void> {
        await customElements.whenDefined("offer-element");

        this.offerID = this.getAttribute("offer-id");
        if (!this.offerID) {
            console.error("Missing required attributes.");
            return;
        }
        const offer = await OfferFetch.get(this.offerID);
        this.update(offer);
    }

    public update(offer: Offer): void {
        const lookupButton = this.querySelector('.offer-lookup-button') as HTMLAnchorElement;
        const titleElement = this.querySelector('.offer-title') as HTMLElement;
        const descriptionElement = this.querySelector('.offer-description') as HTMLElement;
        const categoryElement = this.querySelector('.offer-category') as HTMLElement;
        const typeElement = this.querySelector('.offer-type') as HTMLElement;
        const exchangeElement = this.querySelector('.offer-exchange') as HTMLElement;
        const locationElement = this.querySelector('.offer-location') as HTMLElement;

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