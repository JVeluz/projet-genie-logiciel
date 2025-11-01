import Application, { Item } from "../models/Application";
import NavbarElement from "../elements/NavbarElement";
import User from "../models/User";

export default class NavbarController {

    private model: Application = Application.getInstance();
    private view: NavbarElement;

    constructor(view: NavbarElement) {
        this.view = view;
        this.onUserUpdate(this.model.get(Item.CurrentUser));
        this.model.addListener(Item.CurrentUser, this.onUserUpdate.bind(this));
    }

    private onUserUpdate(value: User | null): void {
        this.view.update(value);
    }
}