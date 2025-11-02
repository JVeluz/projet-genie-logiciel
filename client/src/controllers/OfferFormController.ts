import Application, { Item } from "../models/Application";
import OfferElement from "../elements/OfferElement";
import OfferForm from "../elements/OfferForm";
import Offer from "../models/Offer";
import User from "../models/User";
import OfferFetch from "../fetches/OfferFetch";

export default class OfferFormController {

    private offer: Offer;
    private form: OfferForm;
    private createButton?: HTMLButtonElement;
    private updateButton?: HTMLButtonElement;
    private preview?: OfferElement;

    public constructor(form: OfferForm) {
        this.offer = new Offer();
        this.form = form;
    }

    public async load(offerID: string): Promise<void> {
        const offer: Offer = await OfferFetch.get(offerID);
        const user: User = Application.getInstance().get(Item.CurrentUser);
        if (user._id !== offer.sellerID) {
            window.location.href = "/";
            return;
        }
        this.offer = offer;
        this.form.update(offer);
        this.preview?.update(this.offer);
    }

    public setCreateButton(button: HTMLButtonElement): void {
        this.createButton = button;
        this.createButton.onclick = (event: Event) => this.onCreateButton(event);
    }

    public setUpdateButton(button: HTMLButtonElement): void {
        this.updateButton = button;
        this.updateButton.onclick = (event: Event) => this.onUpdateButton(event);
    }

    public setPreview(element: OfferElement): void {
        this.preview = element;
        this.form.onchange = () => this.onChange();
        this.onChange();
    }

    private async onCreateButton(event: Event): Promise<void> {
        event.preventDefault();
        console.log("Creating offer:", this.offer);
        const formData: FormData = new FormData(this.form);
        const currentUser: User = Application.getInstance().get(Item.CurrentUser);
        this.parseFormData(formData);
        this.offer.sellerID = currentUser._id;
        await OfferFetch.create(this.offer);
        window.location.href = `/user?id=${currentUser._id}`;
    }

    private async onUpdateButton(event: Event): Promise<void> {
        event.preventDefault();
        console.log("Updating offer:", this.offer);
        const formData: FormData = new FormData(this.form);
        this.parseFormData(formData);
        await OfferFetch.update(this.offer);
        window.location.href = `/offer?id=${this.offer._id}`;
    }

    private onChange(): void {
        if (this.preview === undefined) return;
        const formData: FormData = new FormData(this.form);
        this.parseFormData(formData);
        this.preview.update(this.offer);
    }

    private parseFormData(formData: FormData): void {
        this.offer.title = formData.get("title") as string;
        this.offer.description = formData.get("description") as string;
        this.offer.category = formData.get("category") as string;
        this.offer.type = formData.get("type") as string;
        this.offer.exchange = formData.get("exchange") as string;
        this.offer.location = formData.get("location") as string;
        this.offer.price = parseFloat(formData.get("price") as string) || 0;
    }
}