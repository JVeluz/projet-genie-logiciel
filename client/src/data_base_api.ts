export default class DataBaseAPI {

    private static instance: DataBaseAPI

    private constructor() { }

    public static getInstance(): DataBaseAPI {
        if (DataBaseAPI.instance == undefined) {
            DataBaseAPI.instance = new DataBaseAPI()
        }
        return DataBaseAPI.instance
    }

    public get(collection: string, documentID: number): string {
        return "{}"
    }

    public save(collection: string, document: string): void {
        console.log("Saved to " + collection + ": " + document)
    }
}