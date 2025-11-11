interface CustomElement {
    tag: string;
    module: Promise<any>;
    options?: ElementDefinitionOptions;
};

const ELEMENTS: CustomElement[] = [
    // Offer Pages
    { tag: "offer-search-page", module: import("./pages/OfferSearchPage") },
    { tag: "offer-page", module: import("./pages/OfferPage") },
    { tag: "offer-create-page", module: import("./pages/OfferCreatePage") },
    { tag: "offer-edit-page", module: import("./pages/OfferEditPage") },
    { tag: "offer-chat-page", module: import("./pages/OfferChatPage") },
    // User Pages
    { tag: "user-page", module: import("./pages/UserPage") },
    { tag: "user-edit-page", module: import("./pages/UserEditPage") },
    { tag: "login-page", module: import("./pages/LoginPage") },
    { tag: "register-page", module: import("./pages/RegisterPage") },
    // Elements
    { tag: "offer-element", module: import("./elements/OfferElement") },
    { tag: "user-element", module: import("./elements/UserElement") },
    { tag: "navbar-element", module: import("./elements/NavbarElement") },
    // Forms
    { tag: "user-edit-form", module: import("./elements/UserEditForm"), options: { extends: "form" } },
    { tag: "offer-form", module: import("./elements/OfferForm"), options: { extends: "form" } },
    { tag: "new-chat-form", module: import("./elements/NewChatForm"), options: { extends: "form" } },
];

export default class Loader {

    public static initialize(): void {
        for (const element of ELEMENTS) {
            element.module.then((module: { default: CustomElementConstructor }) => {
                customElements.define(element.tag, module.default, element.options);
            });
        }
    }
}