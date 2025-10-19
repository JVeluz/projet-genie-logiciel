export default class User {

    public constructor(private name: string, private password: string) { }

    public getName(): string {
        return this.name
    }

    public getPassword(): string {
        return this.password
    }

    public getHashedPassword(): string {
        return this.password + "hashed"
    }
}
