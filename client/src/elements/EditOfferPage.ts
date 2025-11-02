import HTML from "../html/edit-offer-page.html";
import OfferElement from "./OfferElement";
import OfferForm from "./OfferForm";

export default class EditOfferPage extends HTMLElement {

    public connectedCallback(): void {
        this.innerHTML = HTML;
        const pageTitle = this.querySelector(".page-title") as HTMLHeadingElement;
        const offerForm = this.querySelector(".offer-form") as OfferForm;
        const offerPreview = this.querySelector(".offer-preview") as OfferElement;
        const createButton = this.querySelector(".offer-create-button") as HTMLButtonElement;
        const updateButton = this.querySelector(".offer-update-button") as HTMLButtonElement;
        const deleteButton = this.querySelector(".offer-delete-button") as HTMLButtonElement;
        const confirmDeleteButton = this.querySelector(".offer-confirm-delete-button") as HTMLButtonElement;

        const urlParams = new URLSearchParams(window.location.search);
        const offerID: string | null = urlParams.get("id");

        const editMode: boolean = offerID !== null;
        if (editMode) {
            createButton.style.display = "none";
            updateButton.style.display = "block";
            deleteButton.style.display = "block";
            pageTitle.textContent = "Modifier l'offre";
        } else {
            createButton.style.display = "block";
            updateButton.style.display = "none";
            deleteButton.style.display = "none";
            pageTitle.textContent = "Créer une offre";
        }

        customElements.whenDefined("offer-form").then(() => {
            offerForm.controller?.setPreview(offerPreview);
            if (editMode) {
                offerForm.controller?.load(offerID!);
                offerForm.controller?.setUpdateButton(updateButton);
                offerForm.controller?.setDeleteButton(confirmDeleteButton);
            } else {
                offerForm.controller?.setCreateButton(createButton);
            }
        });
    }
}