import Offer from "../models/Offer";

export default class OfferForm extends HTMLFormElement {

    private titleInput!: HTMLInputElement;
    private descriptionInput!: HTMLTextAreaElement
    private locationInput!: HTMLInputElement;
    private categoryInput!: HTMLSelectElement;
    private typeInput!: HTMLSelectElement
    private exchangeInput!: HTMLTextAreaElement;

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

    public getEntries(): any {
        return {
            title: this.titleInput.value,
            description: this.descriptionInput.value,
            category: this.categoryInput.value,
            type: this.typeInput.value,
            exchange: this.exchangeInput.value,
            location: this.locationInput.value
        }
    }
}