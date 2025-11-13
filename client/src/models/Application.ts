import LocalObservable from "./LocalObservable";
import Observable from "./Observable";
import Storagable from "./Storagable";
import User from "./User";

export default class Application {

    private static instance: Application | null = null;

    public loading = new Observable<boolean>(false);
    public user = new LocalObservable<User | null>("user", null);
    public token = new Storagable<string | null>("token", null);

    public static getInstance(): Application {
        if (this.instance === null)
            this.instance = new Application();
        return this.instance;
    }
}