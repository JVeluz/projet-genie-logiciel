import OfferPage from "@elements/OfferPage";

import OfferService from "@services/OfferService";
import Offer from "@models/Offer";


export default class OfferPageController {

    private offerService: OfferService = new OfferService();

    public constructor(view: OfferPage) {
        const urlParams: any = new URLSearchParams(window.location.search);
        const offerID: number = parseInt(urlParams.get("id"));
        console.log(offerID);
        this.offerService.get(offerID).then((offer: Offer) => {
            view.offerElement.update(offer);
            view.userElement.update(offer.seller);
        });
    }
}