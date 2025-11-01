import OfferController from "../controllers/OfferController";
import HTML from "../html/offer-edit-page.html";
import Offer from "../models/Offer";

export default class EditOfferPage extends HTMLElement {

    public connectedCallback(): void {
        this.innerHTML = HTML;
        const urlParams = new URLSearchParams(window.location.search);
        const offerID = urlParams.get('id');
        if (offerID) {
            new OfferController(this);
        }
    }

    public update(offer: Offer): void {

    }
}