import HTML from "../html/offer-search-page.html";
import SearchOfferController from "../controllers/SearchOfferController";
import OfferCardHTML from "../html/offer-card.html";

export default class OfferSearchPage extends HTMLElement {

    private offerContainer!: HTMLElement;

    public connectedCallback(): void {
        this.innerHTML = HTML;
        this.offerContainer = this.querySelector(".offer-container")!;
        new SearchOfferController(
            this,
            this.querySelector("#search-form")!,
            this.querySelector("#filter-form")!,
        );
    }

    public update(offers: any[]): void {
        this.offerContainer.innerHTML = "";
        for (const offer of offers) {
            const offerElement = document.createElement("offer-element");
            offerElement.innerHTML = OfferCardHTML;
            offerElement.setAttribute("offer-id", offer._id);
            this.offerContainer.appendChild(offerElement);
        }
    }
}