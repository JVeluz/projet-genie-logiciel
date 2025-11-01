import User from "../models/User";
import UserElement from "../elements/UserElement";
import UserFetch from "../fetches/UserFetch";

export default class UserController {

    private view: UserElement;

    public constructor(view: UserElement) {
        this.view = view;
    }

    public async load(userID: string): Promise<void> {
        const user: User = await UserFetch.get(userID);
        this.view.update(user);
    }
}