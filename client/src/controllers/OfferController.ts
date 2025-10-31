import Offer from "@models/Offer";
import OfferElement from "@elements/OfferElement";


export default class OfferController {

    private view: OfferElement;

    public constructor(view: OfferElement) {
        this.view = view;
    }

    public load(offerID: number): void {
        // this.offerService.get(offerID).then((offer: Offer) => {
        //     this.view.update(offer);
        // });
    }
}