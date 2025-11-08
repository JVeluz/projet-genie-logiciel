import HTML from "../html/offer-page.html";
import OfferElement from "./OfferElement";
import OfferController from "../controllers/OfferController";
import NewChatForm from "./NewChatForm";
import Offer from "../models/Offer";
import Application from "../models/Application";

export default class OfferPage extends HTMLElement {

    // URL Parameters
    private urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    private offerID: string | null = this.urlParams.get("id");

    // Models
    private application: Application = Application.getInstance();
    private offer: Offer | null = null;

    public async connectedCallback(): Promise<void> {
        await customElements.whenDefined("offer-page");

        if (!this.offerID) {
            console.error("Offer ID is missing in URL parameters.");
            return;
        }

        this.innerHTML = HTML;

        const offerElement = this.querySelector(".offer-element") as OfferElement;
        const editButton = this.querySelector(".offer-edit-button") as HTMLAnchorElement;
        const chatForm = this.querySelector("#new-chat-form") as NewChatForm;
        chatForm.setAttribute("offer-id", this.offerID);

        const controller = new OfferController(offerElement);
        controller.load(this.offerID).then(() => {
            if (controller.isOfferMine()) {
                editButton.style.display = "block";
                editButton.href = `/offer/edit?id=${this.offerID}`;
            } else {
                editButton.style.display = "none";
            }
        });
    }
}