import HTML from "../html/offer-edit-page.html";
import OfferElement from "../elements/OfferElement";
import OfferForm from "../elements/OfferForm";
import OfferEditPageController from "../controllers/OfferEditPageController";

export default class OfferEditPage extends HTMLElement {

    private controller!: OfferEditPageController;

    public connectedCallback(): void {
        this.innerHTML = HTML;

        const pageTitle = this.querySelector(".page-title") as HTMLHeadingElement;
        const offerForm = this.querySelector(".offer-form") as OfferForm;
        const offerPreview = this.querySelector(".offer-preview") as OfferElement;
        const updateButton = this.querySelector(".offer-update-button") as HTMLButtonElement;
        const deleteButton = this.querySelector(".offer-delete-button") as HTMLButtonElement;
        const confirmDeleteButton = this.querySelector(".offer-confirm-delete-button") as HTMLButtonElement;

        this.controller = new OfferEditPageController(
            offerPreview, offerForm,
        );

        offerForm.oninput = () => { this.controller.onFormChange(); };
        updateButton.onclick = (event) => { this.controller.onUpdateButton(event); };
        deleteButton.onclick = (event) => { this.controller.onDeleteButton(event); };
        confirmDeleteButton.onclick = (event) => { this.controller.onDeleteButton(event); };

        const editMode: boolean = true;
        if (editMode) {
            updateButton.style.display = "block";
            deleteButton.style.display = "block";
            pageTitle.textContent = "Modifier l'offre";
        } else {
            updateButton.style.display = "none";
            deleteButton.style.display = "none";
            pageTitle.textContent = "Créer une offre";
        }
    }
}