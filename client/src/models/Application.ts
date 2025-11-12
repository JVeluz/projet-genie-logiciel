import ObservableValue from "./ObservableValue";
import User from "./User";

export default class Application {

    private static instance: Application | null = null;

    public loading: ObservableValue<boolean> = new ObservableValue<boolean>(false);
    public token: ObservableValue<string | null> = new ObservableValue<string | null>(null);
    public user: ObservableValue<User | null> = new ObservableValue<User | null>(null);

    public static getInstance(): Application {
        if (this.instance === null)
            this.instance = new Application();
        return this.instance;
    }
}