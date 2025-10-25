import HTML from "./html/card.html";

export default class CardElement extends HTMLElement {

    public connectedCallback(): void {
        this.innerHTML = HTML;
    }

    public async setTitle(title: string): Promise<void> {
        await this.connectedCallback();
        const titleElement: HTMLElement = this.querySelector(".card-title")!;
        titleElement.textContent = title;
    }

    public async setText(text: string): Promise<void> {
        await this.connectedCallback();
        const textElement: HTMLElement = this.querySelector(".card-text")!;
        textElement.textContent = text;
    }
}

customElements.define("app-card", CardElement);