import Application from "../models/Application";
import OfferElement from "../elements/OfferElement";
import OfferForm from "../elements/OfferForm";
import Offer from "../models/Offer";
import User from "../models/User";
import OfferService from "../services/OfferService";

export default class OfferEditPageController {

    private application: Application = Application.getInstance();
    private currentUser: User | null = this.application.user.get();
    private offer: Offer = new Offer();

    public constructor(
        private preview: OfferElement,
        private form: OfferForm,
        private createButton: HTMLButtonElement,
        private updateButton: HTMLButtonElement,
        private deleteButton: HTMLButtonElement
    ) {
        this.initialize();
    }

    public async initialize(): Promise<void> {
        // URL parameters
        const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
        const offerID: string | null = urlParams.get("id");
        if (!offerID) {
            console.log("Offer ID is missing in URL parameters.");
            return;
        }
        // Precondition
        if (!this.currentUser) {
            console.error("OfferEditPage: no user connected");
            return;
        }
        // Load offer data
        try {
            this.offer = await OfferService.getByID(offerID);
        } catch (error) {
            console.error("Failed to load offer:", error);
            return;
        }
        // Update form and preview
        this.form.update(this.offer);
        this.preview.update(this.offer);

        this.connectEvents();
    }

    private connectEvents(): void {
        this.createButton.onclick = (event: Event) => this.onCreateButton(event);
        this.updateButton.onclick = (event: Event) => this.onUpdateButton(event);
        this.deleteButton.onclick = (event: Event) => this.onDeleteButton(event);
        this.form.oninput = () => this.onChange();
    }

    private async onCreateButton(event: Event): Promise<void> {
        event.preventDefault();
        let newOffer: Offer;
        try {
            newOffer = await OfferService.create(this.offer, this.currentUser!);
        } catch (error) {
            alert((error as Error).message);
            return;
        }
        window.location.href = `/offer?id=${newOffer._id}`;
    }

    private async onUpdateButton(event: Event): Promise<void> {
        event.preventDefault();
        this.offer = this.form.getEntries();
        try {
            await OfferService.update(this.offer, this.currentUser!);
        } catch (error) {
            alert((error as Error).message);
            return;
        }
        window.location.href = `/offer?id=${this.offer._id}`;
    }

    private async onDeleteButton(event: Event): Promise<void> {
        event.preventDefault();
        try {
            await OfferService.delete(this.offer, this.currentUser!);
        } catch (error) {
            alert((error as Error).message);
            return;
        }
        window.location.href = `/user?id=${this.offer.sellerID}`;
    }

    private onChange(): void {
        this.offer = this.form.getEntries();
        this.preview.update(this.offer);
    }
}