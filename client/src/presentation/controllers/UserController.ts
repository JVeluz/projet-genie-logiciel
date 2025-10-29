import UserElement from "@elements/UserElement";
import User from "@models/User";
import UserService from "@services/UserService";


export default class UserController {

    private userService: UserService = new UserService();

    constructor(view: UserElement, userID: number) {
        this.userService.get(userID).then((user) => {
            view.update(user);
        });
    }
}