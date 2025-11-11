import Offer from "../models/Offer";

export default class OfferElement extends HTMLElement {

    public update(offer: Offer): void {
        const lookupButton = this.querySelector('.offer-lookup-button') as HTMLAnchorElement;
        const titleElement = this.querySelector('.offer-title') as HTMLElement;
        const typeElement = this.querySelector('.offer-type') as HTMLElement;
        const descriptionElement = this.querySelector('.offer-description') as HTMLElement;

        const categoryElement = this.querySelector('.offer-category') as HTMLElement;
        const locationElement = this.querySelector('.offer-location') as HTMLElement;
        const exchangeElement = this.querySelector('.offer-exchange') as HTMLElement;

        if (lookupButton) lookupButton.href = `/offer?id=${offer._id}`;
        if (titleElement) titleElement.textContent = offer.title === "" ? "Sans titre" : offer.title;
        if (typeElement) typeElement.textContent = offer.type;
        if (descriptionElement) descriptionElement.textContent = offer.description;

        if (categoryElement) categoryElement.textContent = offer.category || "";
        if (locationElement) locationElement.textContent = offer.location || "Non spécifiée";
        if (exchangeElement) exchangeElement.textContent = offer.exchange || "Non spécifiée";
    }
}