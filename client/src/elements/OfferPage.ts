import HTML from "../html/offer-page.html";
import OfferElement from "../elements/OfferElement";
import OfferController from "../controllers/OfferController";

export default class OfferPage extends HTMLElement {

    public connectedCallback(): void {
        this.innerHTML = HTML;
        const urlParams: any = new URLSearchParams(window.location.search);
        const offerID: string = urlParams.get("id");
        const offerElement = this.querySelector("offer-element") as OfferElement;
        new OfferController(offerElement)
            .load(offerID);
    }
}