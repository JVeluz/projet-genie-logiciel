import HTML from "@html/offer_page.html";
import Offer from "@models/offer";
import Card from "@elements/card_element";
import Grid from "@elements/grid_element";

import OfferPageController from "@controllers/offer_page_controller";


export default class OfferPageElement extends HTMLElement {

    private controller!: OfferPageController;

    private offerContainer!: HTMLElement;
    private form!: HTMLFormElement;

    public connectedCallback(): void {
        this.innerHTML = HTML;
        this.controller = new OfferPageController(this);

        this.offerContainer = this.querySelector("#offer-container")!;
        this.form = this.querySelector("#form")!;
        this.form.onsubmit = (event: Event) => this.controller.onSubmit(event);
    }

    public updateOffers(offers: Offer[]): void {
        this.offerContainer.innerHTML = "";
        const grid: Grid = document.createElement("app-grid") as Grid;
        for (const offer of offers) {
            const card: Card = document.createElement("app-card") as Card;
            card.setTitle(offer.getTitle());
            card.setText(offer.getDescription());
            grid.add(card);
        }
        this.offerContainer.appendChild(grid);
    }
}

customElements.define("app-offer-page", OfferPageElement);