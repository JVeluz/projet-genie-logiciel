import IUser from "shared/src/interfaces/IUser";
import Application from "../models/Application";
import UserPage, { Model } from "../pages/UserPage";
import UserService from "../services/UserService";

export default class UserPageController {

    // Services
    private userService = new UserService();
    // URLSearchParams
    private urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    private userID: string | null = this.urlParams.get("id");
    // Models
    private application: Application = Application.getInstance();
    private model: Model = {
        user: {}, isCurrentUser: false
    }
    // Views
    private page: UserPage;

    public constructor(page: UserPage) {
        this.page = page;
        this.initialize();
    }

    private async initialize(): Promise<void> {
        // URL Parameters
        if (!this.userID) {
            console.error("UserPage: missing user ID");
            return;
        }
        // Fetch User
        try {
            this.model.user = await this.userService.getByID(this.userID);
        } catch (error) {
            console.error("UserPage: user not found");
            return;
        }

        // Check Current User
        const currentUser: IUser | null = this.application.user.get();
        this.model.isCurrentUser = currentUser ?
            (currentUser._id === this.model.user._id) : false;

        // Update View
        this.page.update(this.model);
    }
}