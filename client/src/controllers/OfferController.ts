import Offer from "@models/Offer";
import OfferElement from "elements/OfferElement";
import OfferService from "@services/OfferService";


export default class OfferController {

    private view: OfferElement;

    private offerService: OfferService = new OfferService();

    public constructor(view: OfferElement) {
        this.view = view;
    }

    public load(offerID: number): void {
        this.offerService.get(offerID).then((offer: Offer) => {
            this.view.update(offer);
        });
    }
}