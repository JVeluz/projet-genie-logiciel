import HTML from "../html/offer-edit-page.html";
import OfferElement from "../elements/OfferElement";
import OfferForm from "../elements/OfferForm";
import OfferEditPageController from "../controllers/OfferEditPageController";

export default class OfferEditPage extends HTMLElement {

    public connectedCallback(): void {
        this.innerHTML = HTML;

        const pageTitle = this.querySelector(".page-title") as HTMLHeadingElement;
        const offerForm = this.querySelector(".offer-form") as OfferForm;
        const offerPreview = this.querySelector(".offer-preview") as OfferElement;
        const createButton = this.querySelector(".offer-create-button") as HTMLButtonElement;
        const updateButton = this.querySelector(".offer-update-button") as HTMLButtonElement;
        const deleteButton = this.querySelector(".offer-delete-button") as HTMLButtonElement;
        const confirmDeleteButton = this.querySelector(".offer-confirm-delete-button") as HTMLButtonElement;

        new OfferEditPageController(
            offerPreview, offerForm,
            createButton, updateButton, confirmDeleteButton
        );

        const editMode: boolean = true;
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
    }
}