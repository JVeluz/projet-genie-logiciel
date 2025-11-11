import OfferForm from "../elements/OfferForm";
import Application, { Item } from "../models/Application";
import Offer from "../models/Offer";
import User from "../models/User";
import OfferCreatePage from "../pages/OfferCreatePage";
import OfferService from "../services/OfferService";

export default class OfferCreatePageController {

    // Models
    private application = Application.getInstance();
    private offer: Offer = new Offer();

    public constructor(
        // View
        private page: OfferCreatePage,
        private form: OfferForm,
        private createButton: HTMLButtonElement,
    ) {
        this.createButton.onclick = (event: Event) => this.onCreateButton(event);
        this.form.oninput = () => this.onChange();
    }

    private async onCreateButton(event: Event): Promise<void> {
        event.preventDefault();
        const currentUser: User | null = this.application.get(Item.CurrentUser);
        if (!currentUser) {
            alert("You must be logged in to create an offer.");
            return;
        }
        let newOffer: Offer;
        try {
            newOffer = await OfferService.create(this.offer, currentUser);
        } catch (error) {
            alert((error as Error).message);
            return;
        }
        window.location.href = `/offer?id=${newOffer._id}`;
    }

    private onChange(): void {
        this.offer = this.form.getEntries();
        this.page.update(this.offer);
    }
}