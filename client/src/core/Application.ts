export default class Application {

    private static instance: Application | null = null;

    private constructor() { }

    public static getInstance(): Application {
        if (this.instance === null) {
            this.instance = new Application();
        }
        return this.instance;
    }

    public static start(): void {
        Application.getInstance();
    }
}