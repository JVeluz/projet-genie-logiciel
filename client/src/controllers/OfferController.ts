import Offer from "../models/Offer";
import OfferElement from "../elements/OfferElement";
import OfferFetch from "../fetches/OfferFetch";
import Application, { Item } from "../models/Application";
import User from "../models/User";

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

    public isOfferMine(): boolean {
        if (!this.model) return false;
        const currentUser: User | null = Application.getInstance().get(Item.CurrentUser);
        return currentUser ? this.model.sellerID === currentUser._id : false;
    }
}