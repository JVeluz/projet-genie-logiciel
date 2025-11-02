import HTML from "../html/edit-offer-page.html";
import OfferElement from "./OfferElement";
import OfferForm from "./OfferForm";

export default class EditOfferPage extends HTMLElement {

    public connectedCallback(): void {
        this.innerHTML = HTML;
        const offerForm = this.querySelector(".offer-form") as OfferForm;
        const offerPreview = this.querySelector(".offer-preview") as OfferElement;
        const createButton = this.querySelector(".offer-create-button") as HTMLButtonElement;
        const updateButton = this.querySelector(".offer-update-button") as HTMLButtonElement;

        const urlParams = new URLSearchParams(window.location.search);
        const offerID: string | null = urlParams.get("id");

        const editMode: boolean = offerID !== null;
        if (editMode) {
            createButton.style.display = "none";
            updateButton.style.display = "block";
        } else {
            createButton.style.display = "block";
            updateButton.style.display = "none";
        }

        customElements.whenDefined("offer-form").then(() => {
            offerForm.controller?.setPreview(offerPreview);
            if (editMode) {
                offerForm.controller?.load(offerID!);
                offerForm.controller?.setUpdateButton(updateButton);
            } else {
                offerForm.controller?.setCreateButton(createButton);
            }
        });
    }
}