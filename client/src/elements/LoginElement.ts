import LoginController from "@controllers/LoginController";

export default class LoginElement extends HTMLFormElement {

    public connectedCallback(): void {
        new LoginController(this);
    }
}