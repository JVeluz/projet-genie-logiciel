export default class Observable<T> {
    private _value: T;
    private observers: Array<(value: T) => void> = [];

    constructor(value: T) {
        this._value = value;
    }

    public get(): T {
        return this._value;
    }

    public set(newValue: T) {
        this._value = newValue;
        this.notifyObservers();
    }

    public addObserver(observer: (value: T) => void): void {
        this.observers.push(observer);
    }

    private notifyObservers(): void {
        for (const observer of this.observers) {
            observer(this._value);
        }
    }
}