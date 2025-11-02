import HTML from "../html/offer-page.html";
import OfferElement from "./OfferElement";
import OfferController from "../controllers/OfferController";

export default class OfferPage extends HTMLElement {

    public connectedCallback(): void {
        this.innerHTML = HTML;
        const offerElement = this.querySelector(".offer-element") as OfferElement;
        const editButton = this.querySelector(".offer-edit-button") as HTMLAnchorElement;

        const urlParams: any = new URLSearchParams(window.location.search);
        const offerID: string = urlParams.get("id");

        const controller = new OfferController(offerElement);
        controller.load(offerID).then(() => {
            if (controller.isOfferMine()) {
                editButton.style.display = "block";
                editButton.href = `/offer/edit?id=${offerID}`;
            } else {
                editButton.style.display = "none";
            }
        });
    }
}