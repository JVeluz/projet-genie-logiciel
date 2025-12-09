import IUser from "shared/src/interfaces/IUser";
import StorgedObservable from "./StorgedObservable";
import Observable from "./Observable";
import Storagable from "./Storagable";

export default class Application {

    private static instance: Application | null = null;

    public loading = new Observable<boolean>(false);
    public user = new StorgedObservable<IUser | null>("user", null);
    public token = new Storagable<string | null>("token", null);

    public static getInstance(): Application {
        if (this.instance === null)
            this.instance = new Application();
        return this.instance;
    }
}