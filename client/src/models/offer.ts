export default class Offer {

    private title: string = ""
    private description: string = ""

    public setTitle(title: string): Offer {
        this.title = title
        return this
    }

    public setDescription(description: string): Offer {
        this.description = description
        return this
    }

    public getTitle(): string {
        return this.title
    }

    public getDescription(): string {
        return this.description
    }
}