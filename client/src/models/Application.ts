import { IUser } from "shared";
import StoredObservable from "./StoredObservable";
import Observable from "./Observable";
import Storagable from "./Storagable";

export default class Application {

    private static instance: Application | null = null;

    public loading = new Observable<boolean>(false);
    public user = new StoredObservable<IUser | null>("user", null);
    public token = new Storagable<string | null>("token", null);

    public static getInstance(): Application {
        if (this.instance === null)
            this.instance = new Application();
        return this.instance;
    }
}