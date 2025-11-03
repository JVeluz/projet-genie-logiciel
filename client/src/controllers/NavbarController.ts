import Application, { Item } from "../models/Application";
import NavbarElement from "../elements/NavbarElement";
import User from "../models/User";

export default class NavbarController {

    private model: Application = Application.getInstance();
    private view: NavbarElement;

    constructor(view: NavbarElement) {
        this.view = view;
        this.onUserUpdate(this.model.get(Item.CurrentUser));
        this.onLoadingUpdate(this.model.get(Item.Loading));
        this.model.addListener(Item.CurrentUser, this.onUserUpdate.bind(this));
        this.model.addListener(Item.Loading, this.onLoadingUpdate.bind(this));
    }

    private onUserUpdate(value: User | null): void {
        this.view.update(value);
    }

    private onLoadingUpdate(value: boolean): void {
        this.view.setLoading(value);
    }
}