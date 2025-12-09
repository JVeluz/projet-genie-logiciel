export default class Observable<T> {
    private value: T;
    private observers: Array<(value: T) => void> = [];

    constructor(value: T) {
        this.value = value;
    }

    public get(): T {
        return this.value;
    }

    public set(newValue: T) {
        this.value = newValue;
        this.notifyObservers();
    }

    public addObserver(observer: (value: T) => void): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: (value: T) => void): void {
        this.observers.filter(o => o !== observer);
    }

    private notifyObservers(): void {
        for (const observer of this.observers) {
            observer(this.value);
        }
    }
}