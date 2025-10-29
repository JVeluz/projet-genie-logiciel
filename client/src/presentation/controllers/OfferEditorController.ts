import OfferElement from "@elements/OfferElement";
import OfferService from "@services/OfferService";
import Offer from "@models/Offer";
import EditOfferPage from "@elements/EditOfferPage";

export default class OfferController {

    private model!: Offer;

    private view: EditOfferPage;

    private offerService: OfferService = new OfferService();

    constructor(view: EditOfferPage, offerID: number) {
        this.view = view;
        this.loadOffer(offerID);
    }

    private async loadOffer(offerID: number): Promise<void> {
        this.model = await this.offerService.get(offerID);
        this.view.update(this.model);
    }
}