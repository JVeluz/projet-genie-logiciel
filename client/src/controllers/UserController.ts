import UserElement from "elements/UserElement";

export default class UserController {

    private view: UserElement;

    constructor(view: UserElement) {
        this.view = view;
    }

    public load(userID: number): void {
        // this.userService.get(userID).then((user) => {
        //     this.view.update(user);
        // });
    }
}