import Application, { Item } from "../models/Application";
import OfferElement from "../elements/OfferElement";
import OfferForm from "../elements/OfferForm";
import Offer from "../models/Offer";
import User from "../models/User";
import OfferFetch from "../fetches/OfferFetch";

export default class OfferEditorController {

    private application: Application = Application.getInstance();
    private offer: Offer;
    private form: OfferForm;
    private createButton?: HTMLButtonElement;
    private updateButton?: HTMLButtonElement;
    private deleteButton?: HTMLButtonElement;
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

    public setDeleteButton(button: HTMLButtonElement): void {
        this.deleteButton = button;
        this.deleteButton.onclick = (event: Event) => this.onDeleteButton(event);
    }

    public setPreview(element: OfferElement): void {
        this.preview = element;
        this.form.onchange = () => this.onChange();
        this.onChange();
    }

    private async onCreateButton(event: Event): Promise<void> {
        event.preventDefault();
        const loading: boolean = this.application.get(Item.Loading);
        if (loading)
            return;

        console.log("Creating offer:", this.offer);
        const formData: FormData = new FormData(this.form);
        const currentUser: User = Application.getInstance().get(Item.CurrentUser);
        this.parseFormData(formData);
        this.offer.sellerID = currentUser._id;

        try {
            this.application.set(Item.Loading, true);
            await OfferFetch.create(this.offer);
        } catch (error: any) {
            alert(error.message);
        } finally {
            this.application.set(Item.Loading, false);
            window.location.href = `/user?id=${currentUser._id}`;
        }
    }

    private async onUpdateButton(event: Event): Promise<void> {
        event.preventDefault();
        const loading: boolean = this.application.get(Item.Loading);
        if (loading)
            return;

        const formData: FormData = new FormData(this.form);
        this.parseFormData(formData);
        try {
            this.application.set(Item.Loading, true);
            await OfferFetch.update(this.offer);
        } catch (error: any) {
            alert(error.message);
        } finally {
            this.application.set(Item.Loading, false);
            window.location.href = `/offer?id=${this.offer._id}`;
        }
    }

    private async onDeleteButton(event: Event): Promise<void> {
        event.preventDefault();
        const loading: boolean = this.application.get(Item.Loading);
        if (loading)
            return;
        try {
            this.application.set(Item.Loading, true);
            await OfferFetch.delete(this.offer._id);
        } catch (error: any) {
            alert(error.message);
        } finally {
            this.application.set(Item.Loading, false);
            window.location.href = `/user?id=${this.offer.sellerID}`;
        }
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