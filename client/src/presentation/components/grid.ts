export default class Grid {

    private element: HTMLElement = document.createElement("div")

    constructor() {
        this.element.classList.add("row", "row-cols-1", "row-cols-md-2", "g-4")
    }

    public getElement(): HTMLElement {
        return this.element
    }

    public add(element: HTMLElement): void {
        const column: HTMLElement = document.createElement("div")
        column.classList.add("col")
        column.appendChild(element)
        this.element.appendChild(column)
    }
}