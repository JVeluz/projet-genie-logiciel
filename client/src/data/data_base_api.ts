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

    public search(collection: string, query: string): string[] {
        return [
            '{"title": "Offer 1", "description": "Description 1", "price": 100}',
            '{"title": "Offer 2", "description": "Description 2", "price": 200}',
            '{"title": "Offer 3", "description": "Description 3", "price": 300}'
        ]
    }
}