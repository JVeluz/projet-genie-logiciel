export default class Application {

    private constructor() { }

    private static instance: Application;

    private root: HTMLElement = document.getElementById("root")!;

    public static getInstance(): Application {
        if (!Application.instance) {
            Application.instance = new Application();
        }
        return Application.instance;
    }

    public changeView(element: HTMLElement): void {
        this.root.innerHTML = "";
        this.root.appendChild(element);
    }
}