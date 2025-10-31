import HTML from "@html/create-offer-page.html";

export default class CreateOfferPageElement extends HTMLElement {

    public connectedCallback(): void {
        this.innerHTML = HTML;
    }
}