export default class ApplicationModel {

    private static instance: ApplicationModel | null = null;

    private constructor() { }

    public static getInstance(): ApplicationModel {
        if (this.instance === null) {
            this.instance = new ApplicationModel();
        }
        return this.instance;
    }

    private listeners: { [item: string]: CallableFunction[] } = {};

    public addListener(item: string, listener: CallableFunction): void {
        if (!this.listeners[item]) {
            this.listeners[item] = [];
        }
        this.listeners[item].push(listener);
    }

    public set(item: string, value: Object | null): void {
        if (value === null) {
            localStorage.removeItem(item);
        } else {
            localStorage.setItem(item, JSON.stringify(value));
        }
        this.notifyListeners(item);
    }

    public get(item: string): Object | null {
        const value: string | null = localStorage.getItem(item);
        if (value === null) {
            return null;
        }
        return JSON.parse(value);
    }

    private notifyListeners(item: string): void {
        if (this.listeners[item]) {
            for (const listener of this.listeners[item]) {
                const value: Object | null = this.get(item);
                listener(value);
            }
        }
    }
}