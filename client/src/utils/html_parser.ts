export default class HTMLParser {

    public static parse(html: string, createDiv: boolean = false): HTMLElement {
        const div: HTMLElement = document.createElement("div")
        div.innerHTML = html
        return createDiv ? div : div.firstElementChild as HTMLElement
    }
}