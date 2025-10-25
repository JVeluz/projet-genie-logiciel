export default class GridElement extends HTMLElement {

    public connectedCallback(): void {
        this.classList.add("row", "row-cols-1", "row-cols-md-2", "g-4")
    }

    public add(element: HTMLElement): void {
        const column: HTMLElement = document.createElement("div")
        column.classList.add("col")
        column.appendChild(element)
        this.appendChild(column)
    }
}

customElements.define("app-grid", GridElement);