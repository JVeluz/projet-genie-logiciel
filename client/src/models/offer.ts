export default class Offer {

    constructor(
        private title: string,
        private description: string,
        private price: number,
    ) { }

    public getTitle(): string {
        return this.title
    }

    public getDescription(): string {
        return this.description
    }

    public getPrice(): number {
        return this.price
    }

}