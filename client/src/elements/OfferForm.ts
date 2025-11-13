import Offer from "../models/Offer";

export default class OfferForm extends HTMLFormElement {

    public titleInput!: HTMLInputElement;
    public descriptionInput!: HTMLTextAreaElement
    public locationInput!: HTMLInputElement;
    public categoryInput!: HTMLSelectElement;
    public typeInput!: HTMLSelectElement
    public exchangeInput!: HTMLTextAreaElement;

    public connectedCallback(): void {
        this.titleInput = this.querySelector('input[name="title"]') as HTMLInputElement;
        this.descriptionInput = this.querySelector('textarea[name="description"]') as HTMLTextAreaElement;
        this.locationInput = this.querySelector('input[name="location"]') as HTMLInputElement;
        this.categoryInput = this.querySelector('select[name="category"]') as HTMLSelectElement;
        this.typeInput = this.querySelector('select[name="type"]') as HTMLSelectElement;
        this.exchangeInput = this.querySelector('textarea[name="exchange"]') as HTMLTextAreaElement;
    }

    public update(offer: Offer): void {
        this.titleInput.value = offer.title;
        this.descriptionInput.value = offer.description;
        this.categoryInput.value = offer.category;
        this.typeInput.value = offer.type;
        this.exchangeInput.value = offer.exchange || '';
        this.locationInput.value = offer.location || '';
    }
}