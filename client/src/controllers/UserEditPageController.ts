import Application, { Item } from "../models/Application";
import User from "../models/User";
import UserService from "../services/UserService";
import UserEditForm from "../elements/UserEditForm";
import UserEditPage from "../pages/UserEditPage";

export default class UserEditPageController {

    // Models
    private application: Application = Application.getInstance();
    private user: User | null = this.application.get(Item.CurrentUser);

    public constructor(
        // Views
        private page: UserEditPage,
        private form: UserEditForm,
    ) {
        this.form.onsubmit = (event) => this.onSubmit(event);
        this.form.oninput = () => this.onChange();
        this.initialize();
    }

    private async initialize(): Promise<void> {
        // Precondition
        const currentUser: User | null = this.application.get(Item.CurrentUser);
        if (!currentUser) {
            console.error("UserPage: no user connected");
            return;
        }
        // URL Parameters
        const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
        const userID: string | null = urlParams.get("id");
        if (!userID) {
            console.error("UserPage: missing user ID");
            return;
        }
        // Precondition
        if (userID !== currentUser._id) {
            console.error("UserPage: you cant edit an other person profile");
            return;
        }
        // Fetch User
        try {
            this.user = await UserService.getByID(userID);
        } catch (error) {
            console.error("UserPage: user not found");
            return;
        }
        this.page.updateForm(this.user);
        this.page.updatePreview(this.user);
    }

    private async onSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault();
        const entries = this.form.getEntries();
        this.user = { ...this.user, ...entries };
        try {
            await UserService.update(this.user!);
        } catch (error) {
            console.error("Failed to update user:", error);
            return;
        }
        window.location.href = `/user?id=${this.user!._id}`;
    }

    private onChange(): void {
        const entries = this.form.getEntries();
        this.user = { ...this.user, ...entries };
        console.log(this.user);
        this.page.updatePreview(this.user!)
    }
}