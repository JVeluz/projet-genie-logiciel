export default class Storagable<T> {
    private key: string;

    constructor(key: string, defaultValue: T) {
        this.key = key;
        if (localStorage.getItem(this.key) === null && defaultValue !== null) {
            this.set(defaultValue);
        }
    }

    public get(): T | null {
        const item = localStorage.getItem(this.key);
        if (item === null)
            return null;
        return JSON.parse(item) as T;
    }

    public set(value: T): void {
        if (value === null) {
            localStorage.removeItem(this.key);
        } else {
            localStorage.setItem(this.key, JSON.stringify(value));
        }
    }
}