import Offer from "../models/Offer";
import OfferElement from "../elements/OfferElement";
import OfferFetch from "../fetches/OfferFetch";

export default class OfferController {

    private model?: Offer;
    private view: OfferElement;

    public constructor(view: OfferElement) {
        this.view = view;
    }

    public async load(offerID: string): Promise<void> {
        const offer: Offer = await OfferFetch.get(offerID);
        console.log(offer);
        this.view.update(offer);
        this.model = offer;
    }
}