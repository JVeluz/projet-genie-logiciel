import OfferPageController from "./offer_page_controller";
import HTML from "./offer_page.html";
import HTMLLoader from "@utils/html_loader";

import Offer from "@models/offer";

import Card from "@components/card";
import Grid from "@components/grid";


export default class OfferPageView extends HTMLElement {

    private controller!: OfferPageController;
    private offerContainer!: HTMLElement;
    private form!: HTMLFormElement;

    public connectedCallback(): void {
        this.innerHTML = HTMLLoader.load(HTML);
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

customElements.define("offer-page-view", OfferPageView);