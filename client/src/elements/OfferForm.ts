import OfferEditorController from "../controllers/OfferEditorController";
import Offer from "../models/Offer";

export default class OfferForm extends HTMLFormElement {

    public controller?: OfferEditorController;

    public connectedCallback(): void {
        this.controller = new OfferEditorController(this);
    }

    public update(offer: Offer): void {
        const title: HTMLInputElement = this.querySelector('input[name="title"]') as HTMLInputElement;
        const description: HTMLTextAreaElement = this.querySelector('textarea[name="description"]') as HTMLTextAreaElement;
        const price: HTMLInputElement = this.querySelector('input[name="price"]') as HTMLInputElement;
        const location: HTMLInputElement = this.querySelector('input[name="location"]') as HTMLInputElement;
        const category: HTMLSelectElement = this.querySelector('select[name="category"]') as HTMLSelectElement;
        const type: HTMLSelectElement = this.querySelector('select[name="type"]') as HTMLSelectElement;
        const exchange: HTMLTextAreaElement = this.querySelector('textarea[name="exchange"]') as HTMLTextAreaElement;

        if (title) title.value = offer.title;
        if (description) description.value = offer.description;
        if (price) price.value = offer.price.toString();
        if (category) category.value = offer.category;
        if (type) type.value = offer.type;
        if (exchange) exchange.value = offer.exchange || '';
        if (location) location.value = offer.location || '';
    }
}