import HTMLParser from "@utils/html_parser"

export default abstract class View<Controller> {

    protected controller: Controller | null = null
    protected element: HTMLElement = document.createElement("div")

    protected setHTML(html: string): void {
        this.element = HTMLParser.parse(html, true)
    }

    public setController(controller: Controller): void {
        this.controller = controller
    }

    public getElement(): HTMLElement {
        return this.element
    }
}