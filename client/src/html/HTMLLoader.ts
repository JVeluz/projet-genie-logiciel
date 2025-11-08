export default class HTMLLoader {

    public static createElement(html: string): HTMLElement {
        const element: HTMLElement = document.createElement("div");
        element.innerHTML = html;
        if (element.childElementCount === 1) {
            return element.firstElementChild as HTMLElement;
        }
        return element;
    }
}