import UserElement from "elements/UserElement";
import UserService from "@services/UserService";


export default class UserController {

    private view: UserElement;

    private userService: UserService = new UserService();

    constructor(view: UserElement) {
        this.view = view;
    }

    public load(userID: number): void {
        this.userService.get(userID).then((user) => {
            this.view.update(user);
        });
    }
}