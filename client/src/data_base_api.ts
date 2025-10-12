export default class DataBaseAPI {

    private static instance: DataBaseAPI

    private constructor() { }

    public static getInstance(): DataBaseAPI {
        if (DataBaseAPI.instance == undefined) {
            DataBaseAPI.instance = new DataBaseAPI()
        }
        return DataBaseAPI.instance
    }

    public getUser(id: number): string {
        return JSON.stringify({ name: "Jesse" })
    }

    public saveUser(json: string): void {
        console.log("Saving user:", json)
    }
}
