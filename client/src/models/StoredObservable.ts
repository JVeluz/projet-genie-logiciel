import Storagable from "./Storagable";

export default class StoredObservable<T> extends Storagable<T> {

    private observers: Array<(value: T | null) => void> = [];

    public set(value: T) {
        super.set(value)
        this.notifyObservers();
    }

    public addObserver(observer: (value: T | null) => void): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: (value: T | null) => void): void {
        this.observers = this.observers.filter(o => o !== observer);
    }

    private notifyObservers(): void {
        for (const observer of this.observers) {
            observer(super.get());
        }
    }
}