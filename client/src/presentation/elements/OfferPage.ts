import HTML from "@html/offer-page.html";
import UserElement from "@elements/UserElement";
import OfferElement from "@elements/OfferElement";
import OfferPageController from "@controllers/OfferPageController";


export default class OfferPage extends HTMLElement {

    public offerElement!: OfferElement;
    public userElement!: UserElement;

    public connectedCallback(): void {
        this.innerHTML = HTML;
        this.offerElement = this.querySelector("offer-element") as OfferElement;
        this.userElement = this.querySelector("user-element") as UserElement;
        new OfferPageController(this);
    }
}