// LocalObservable.ts
import Observable from "./Observable"; // Votre classe Observable existante

export default class LocalObservable<T> extends Observable<T> {

    private storageKey: string;

    constructor(storageKey: string, defaultValue: T) {
        const item = localStorage.getItem(storageKey);
        let initialValue = defaultValue;
        if (item) {
            try {
                initialValue = JSON.parse(item);
            } catch {
                console.warn("Données corrompues, reset.");
            }
        }
        super(initialValue);
        this.storageKey = storageKey;
    }

    public set(value: T): void {
        super.set(value);
        localStorage.setItem(this.storageKey, JSON.stringify(value));
    }
}