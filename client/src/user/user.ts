export default class User {

    public constructor(private name: string) { }

    public static fromJSON(json: string): User {
        const data = JSON.parse(json)
        return new User(data.name)
    }

    public toJSON(): string {
        return JSON.stringify({ name: this.name })
    }
}
