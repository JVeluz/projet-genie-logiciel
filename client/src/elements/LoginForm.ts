import LoginController from "../controllers/LoginController";

export default class LoginForm extends HTMLFormElement {

    public controller?: LoginController;

    public connectedCallback(): void {
        this.controller = new LoginController(this);
    }
}