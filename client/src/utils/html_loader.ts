export default class HTMLLoader {

    public static load(html: string): string {
        const div = document.createElement("div");
        div.innerHTML = html;
        if (div.children.length === 1) {
            return div.children[0].innerHTML;
        }
        return div.innerHTML;
    }
}
