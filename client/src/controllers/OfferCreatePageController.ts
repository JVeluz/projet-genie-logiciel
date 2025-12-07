import IOffer from "shared/src/interfaces/IOffer";
import OfferForm from "../elements/OfferForm";
import Application from "../models/Application";
import User from "../models/User";
import OfferCreatePage from "../pages/OfferCreatePage";
import OfferService from "../services/OfferService";
import { WithLoading } from "./decorators";

export default class OfferCreatePageController {

    // Models
    private application = Application.getInstance();
    private offer: Partial<IOffer> = {}

    public constructor(
        // View
        private page: OfferCreatePage,
        private form: OfferForm,
        private createButton: HTMLButtonElement,
    ) {
        this.form.oninput = () => this.onChange();
        this.createButton.onclick = (event: Event) => this.onCreateButton(event);
    }

    @WithLoading()
    private async onCreateButton(event: Event): Promise<void> {
        event.preventDefault();
        const currentUser: User | null = this.application.user.get();
        if (!currentUser) {
            alert("You must be logged in to create an offer.");
            return;
        }
        let newOffer: IOffer;
        try {
            newOffer = await OfferService.create(this.offer as IOffer, currentUser);
        } catch (error) {
            alert((error as Error).message);
            return;
        }
        currentUser.offers.push(newOffer);
        this.application.user.set(currentUser);
        window.location.href = `/offer?id=${newOffer._id}`;
    }

    private onChange(): void {
        this.offer.title = this.form.titleInput.value;
        this.offer.description = this.form.descriptionInput.value;
        this.offer.category = this.form.categoryInput.value;
        this.offer.type = this.form.typeInput.value;
        this.offer.exchange = this.form.exchangeInput.value;
        this.offer.location = this.form.locationInput.value;
        this.page.update(this.offer);
    }
}