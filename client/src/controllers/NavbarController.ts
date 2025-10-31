import ApplicationModel from "@core/ApplicationModel";
import NavbarElement from "@elements/NavbarElement";
import User from "@models/User";


export default class NavbarController {

    constructor(
        private view: NavbarElement
    ) {
        const model = ApplicationModel.getInstance();
        model.addListener("currentUser", this.onModelUpdated.bind(this));
        const currentUser = model.get("currentUser") as User | null;
        this.onModelUpdated(currentUser);
    }

    private onModelUpdated(value: User | null): void {
        this.view.update(value);
    }
}