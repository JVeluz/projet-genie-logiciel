import IOffer from "shared/src/interfaces/IOffer";
import OfferCreatePageController from "../controllers/OfferCreatePageController";
import OfferElement from "../elements/OfferElement";
import OfferForm from "../elements/OfferForm";
import HTML from "../html/offer-create-page.html"

export default class OfferCreatePage extends HTMLElement {

    private form!: OfferForm;
    private createButton!: HTMLButtonElement;
    private preview!: OfferElement;

    public async connectedCallback(): Promise<void> {
        this.innerHTML = HTML;
        this.form = this.querySelector("#offer-form") as OfferForm;
        this.createButton = this.querySelector("#create-button") as HTMLButtonElement;
        this.preview = this.querySelector("#offer-preview") as OfferElement;
        new OfferCreatePageController(this, this.form, this.createButton);
    }

    public update(offer: Partial<IOffer>): void {
        this.preview.update(offer);
    }
}