type CustomElement = {
    tag: string;
    module: Promise<any>;
    options?: ElementDefinitionOptions;
};

const ELEMENTS: CustomElement[] = [
    // Offer Pages
    { tag: "offer-search-page", module: import("./elements/OfferSearchPage") },
    { tag: "offer-page", module: import("./elements/OfferPage") },
    { tag: "create-offer-page", module: import("./elements/CreateOfferPage") },
    { tag: "edit-offer-page", module: import("./elements/EditOfferPage") },
    // User Pages
    { tag: "user-page", module: import("./elements/UserPage") },
    { tag: "edit-user-page", module: import("./elements/EditUserPage") },
    { tag: "login-page", module: import("./elements/LoginPage") },
    { tag: "register-page", module: import("./elements/RegisterPage") },
    // Elements
    { tag: "offer-element", module: import("./elements/OfferElement") },
    { tag: "user-element", module: import("./elements/UserElement") },
    { tag: "navbar-element", module: import("./elements/NavbarElement") },
    { tag: "login-element", module: import("./elements/LoginElement"), options: { extends: "form" } },
];

export default function initialize(): void {
    for (const element of ELEMENTS) {
        element.module.then((module: { default: CustomElementConstructor }) => {
            customElements.define(element.tag, module.default, element.options);
        });
    }
}