import Application from "../models/Application";
import OfferElement from "../elements/OfferElement";
import OfferForm from "../elements/OfferForm";
import Offer from "../models/Offer";
import User from "../models/User";
import OfferService from "../services/OfferService";
import { WithLoading } from "./decorators";

export default class OfferEditPageController {

    private application: Application = Application.getInstance();
    private currentUser: User | null = this.application.user.get();
    private offer: Offer = new Offer();

    public constructor(
        private preview: OfferElement,
        private form: OfferForm,
    ) {
        this.initialize();
    }

    @WithLoading()
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
        // Conditions
        if (this.offer.sellerID !== this.currentUser._id) {
            console.error("OfferEditPage: current user is not the seller of this offer");
            return;
        }
        // Update Views
        this.form.update(this.offer);
        this.preview.update(this.offer);
    }

    @WithLoading()
    public async onUpdateButton(event: Event): Promise<void> {
        event.preventDefault();
        this.offer.title = this.form.titleInput.value;
        this.offer.description = this.form.descriptionInput.value;
        this.offer.category = this.form.categoryInput.value;
        this.offer.type = this.form.typeInput.value;
        this.offer.exchange = this.form.exchangeInput.value;
        this.offer.location = this.form.locationInput.value;
        try {
            await OfferService.update(this.offer);
        } catch (error) {
            alert((error as Error).message);
            return;
        }
        window.location.href = `/offer?id=${this.offer._id}`;
    }

    @WithLoading()
    public async onDeleteButton(event: Event): Promise<void> {
        event.preventDefault();
        try {
            await OfferService.delete(this.offer);
        } catch (error) {
            alert((error as Error).message);
            return;
        }
        window.location.href = `/user?id=${this.offer.sellerID}`;
    }

    public onFormChange(): void {
        this.offer.title = this.form.titleInput.value;
        this.offer.description = this.form.descriptionInput.value;
        this.offer.category = this.form.categoryInput.value;
        this.offer.type = this.form.typeInput.value;
        this.offer.exchange = this.form.exchangeInput.value;
        this.offer.location = this.form.locationInput.value;
        this.preview.update(this.offer);
    }
}