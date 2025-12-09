import { IUser } from "shared";
import Application from "../models/Application";
import UserService from "../services/UserService";
import UserEditForm from "../elements/UserEditForm";
import UserEditPage from "../pages/UserEditPage";

export default class UserEditPageController {

    // Services
    private userService = new UserService();

    // Models
    private application: Application = Application.getInstance();
    private user: IUser | null = this.application.user.get();

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
        const currentUser: IUser | null = this.application.user.get();
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
            this.user = await this.userService.getByID(userID);
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
            await this.userService.update(this.user!);
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