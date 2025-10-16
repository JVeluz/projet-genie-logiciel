import HTMLParser from "@utils/html_parser"
import template from "./card.html"

export default class Card {

    private element: HTMLElement = HTMLParser.parse(template)

    private title: HTMLElement = this.element.querySelector(".card-title") as HTMLElement
    private text: HTMLElement = this.element.querySelector(".card-text") as HTMLElement
    private image: HTMLImageElement = this.element.querySelector(".card-img-top") as HTMLImageElement

    public getElement(): HTMLElement {
        return this.element
    }

    public setTitle(title: string): void {
        this.title.textContent = title
    }

    public setText(text: string): void {
        this.text.textContent = text
    }

    public setImage(imageUrl: string, altText: string = ""): void {
        this.image.src = imageUrl
        this.image.alt = altText
    }
}