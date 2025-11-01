export enum Item {
    AuthToken = "authToken",
    CurrentUser = "currentUser",
}

export default class Application {

    private static instance: Application | null = null;
    private listeners: { [item: string]: CallableFunction[] } = {};

    private constructor() { }

    public static getInstance(): Application {
        if (this.instance === null)
            this.instance = new Application();
        return this.instance;
    }

    public addListener(item: Item, listener: CallableFunction): void {
        if (this.listeners[item] === undefined)
            this.listeners[item] = [];
        this.listeners[item].push(listener);
    }

    public set(item: Item, value: any): void {
        if (value === null)
            localStorage.removeItem(item);
        else
            localStorage.setItem(item, JSON.stringify(value));
        this.notifyListeners(item);
    }

    public get(item: Item): any {
        const value: string | null = localStorage.getItem(item);
        if (value === null)
            return null;
        return JSON.parse(value);
    }

    private notifyListeners(item: Item): void {
        if (this.listeners[item] === undefined)
            return;
        for (const listener of this.listeners[item])
            listener(this.get(item));
    }
}