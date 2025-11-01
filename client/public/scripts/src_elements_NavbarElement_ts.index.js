"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_NavbarElement_ts"],{

/***/ "./src/controllers/LoginController.ts":
/*!********************************************!*\
  !*** ./src/controllers/LoginController.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginController)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");
/* harmony import */ var _fetches_UserFetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fetches/UserFetch */ "./src/fetches/UserFetch.ts");


class LoginController {
    constructor(form, logoutButton) {
        this.model = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.form = form;
        this.form.onsubmit = (event) => this.onSubmit(event);
        if (logoutButton) {
            this.logoutButton = logoutButton;
            this.logoutButton.onclick = (event) => this.onLogout(event);
        }
    }
    async onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        const email = formData.get("email");
        const password = formData.get("password");
        try {
            const { token, user } = await _fetches_UserFetch__WEBPACK_IMPORTED_MODULE_1__["default"].login(email, password);
            this.model.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser, user);
            this.model.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.AuthToken, token);
            window.location.href = "/";
        }
        catch (error) {
            alert(error.message);
        }
    }
    onLogout(event) {
        event.preventDefault();
        this.model.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser, null);
        this.model.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.AuthToken, null);
        window.location.href = "/";
    }
}


/***/ }),

/***/ "./src/controllers/NavbarController.ts":
/*!*********************************************!*\
  !*** ./src/controllers/NavbarController.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavbarController)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");

class NavbarController {
    constructor(view) {
        this.model = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.view = view;
        this.onUserUpdate(this.model.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser));
        this.model.addListener(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser, this.onUserUpdate.bind(this));
    }
    onUserUpdate(value) {
        this.view.update(value);
    }
}


/***/ }),

/***/ "./src/elements/NavbarElement.ts":
/*!***************************************!*\
  !*** ./src/elements/NavbarElement.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavbarElement)
/* harmony export */ });
/* harmony import */ var _controllers_LoginController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/LoginController */ "./src/controllers/LoginController.ts");
/* harmony import */ var _controllers_NavbarController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/NavbarController */ "./src/controllers/NavbarController.ts");
/* harmony import */ var _html_navbar_element_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../html/navbar-element.html */ "./src/html/navbar-element.html");



class NavbarElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_navbar_element_html__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.loginDropdown = this.querySelector('.login-dropdown');
        this.loginForm = this.querySelector('.login-form');
        this.logoutButton = this.querySelector('.logout-button');
        this.newOfferButton = this.querySelector('.new-offer-button');
        this.profileDropdown = this.querySelector('.profile-dropdown');
        this.userElement = this.querySelector('.navbar-user');
        new _controllers_NavbarController__WEBPACK_IMPORTED_MODULE_1__["default"](this);
        new _controllers_LoginController__WEBPACK_IMPORTED_MODULE_0__["default"](this.loginForm, this.logoutButton);
    }
    update(model) {
        if (model === null) {
            this.loginDropdown.style.visibility = 'visible';
            this.profileDropdown.style.visibility = 'hidden';
            this.newOfferButton.style.visibility = 'hidden';
        }
        else {
            this.profileDropdown.style.visibility = 'visible';
            this.newOfferButton.style.visibility = 'visible';
            this.loginDropdown.style.visibility = 'hidden';
            customElements.whenDefined('user-element').then(() => {
                this.userElement.update(model);
            });
        }
    }
}


/***/ }),

/***/ "./src/fetches/UserFetch.ts":
/*!**********************************!*\
  !*** ./src/fetches/UserFetch.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserFetch)
/* harmony export */ });
class UserFetch {
    static async fetch(route, method, body) {
        return await fetch(`${"http://localhost:3000"}${route}`, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    }
    static async get(userID) {
        const response = await this.fetch(`/users/${userID}`, "GET");
        if (response.ok === false)
            throw new Error(`Failed to fetch user with ID ${userID}: ${response.statusText}`);
        return response.json();
    }
    static async login(email, password) {
        const response = await this.fetch("/login", "POST", { email, password });
        if (response.ok === false)
            throw new Error(`Failed to login user with email ${email}: ${response.statusText}`);
        return response.json();
    }
    static async register(name, email, password) {
        const response = await this.fetch("/register", "POST", { name, email, password });
        if (response.ok === false)
            throw new Error(`Failed to register user with email ${email}: ${response.statusText}`);
        return response.json();
    }
}


/***/ }),

/***/ "./src/html/navbar-element.html":
/*!**************************************!*\
  !*** ./src/html/navbar-element.html ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<nav class=\"sticky-top navbar navbar-expand-lg bg-body-tertiary shadow-sm\">\r\n    <div class=\"container-xxl\">\r\n        <!-- Logo/Marque -->\r\n        <a class=\"navbar-brand fw-bold text-primary\" href=\"/\">\r\n            LesBonBails\r\n        </a>\r\n\r\n        <!-- Toggler pour mobile -->\r\n        <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navContent\"\r\n            aria-controls=\"navContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n            <span class=\"navbar-toggler-icon\"></span>\r\n        </button>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"navContent\">\r\n            <ul class=\"navbar-nav ms-auto mb-2 mb-lg-0 align-items-center\">\r\n\r\n                <!-- 1. Bouton \"Nouveau Bon Bail\" -->\r\n                <li class=\"nav-item me-2\">\r\n                    <a href=\"/offer/edit\" class=\"new-offer-button btn btn-outline-success\">\r\n                        Nouveau Bon Bail\r\n                    </a>\r\n                </li>\r\n\r\n                <!-- 2. Bloc Déconnecté (Dropdown Connexion) -->\r\n                <li class=\"login-dropdown nav-item dropdown me-2\">\r\n                    <button class=\"btn btn-outline-primary\" role=\"button\" data-bs-toggle=\"dropdown\"\r\n                        data-bs-auto-close=\"outside\" aria-expanded=\"false\">\r\n                        Connexion\r\n                    </button>\r\n\r\n                    <div class=\"dropdown-menu dropdown-menu-end p-3 shadow border-0\" style=\"min-width: 220px;\">\r\n                        <form class=\"login-form\">\r\n                            <div class=\"mb-2\">\r\n                                <input name=\"email\" type=\"email\" class=\"form-control form-control-sm\"\r\n                                    placeholder=\"Email\" required>\r\n                            </div>\r\n                            <div class=\"mb-3\">\r\n                                <input name=\"password\" type=\"password\" class=\"form-control form-control-sm\"\r\n                                    placeholder=\"Mot de passe\" required>\r\n                            </div>\r\n\r\n                            <button type=\"submit\" class=\"btn btn-primary w-100 btn-sm mb-2\">Se connecter</button>\r\n                            <a href=\"/register\" class=\"btn btn-secondary w-100 btn-sm\">S'enregistrer</a>\r\n                        </form>\r\n                    </div>\r\n                </li>\r\n\r\n                <!-- 3. Bloc Connecté (Dropdown Profil) -->\r\n                <li class=\"profile-dropdown nav-item dropdown d-flex align-items-center\">\r\n                    <a class=\"nav-link dropdown-toggle p-0\" href=\"#\" role=\"button\" data-bs-toggle=\"dropdown\"\r\n                        aria-expanded=\"false\">\r\n                        <user-element class=\"navbar-user\">\r\n                            <img src=\"https://placehold.co/32x32/17A2B8/ffffff?text=?\" width=\"32\" height=\"32\"\r\n                                alt=\"Profil\" class=\"user-avatar rounded-circle border border-2 border-primary\">\r\n                        </user-element>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu dropdown-menu-end shadow border-0\">\r\n                        <li><a href=\"/user\" class=\"user-profile-button dropdown-item\">\r\n                                Profil\r\n                            </a></li>\r\n                        <li><button class=\"logout-button dropdown-item text-danger\" type=\"button\">Déconnexion</button>\r\n                        </li>\r\n                    </ul>\r\n                </li>\r\n\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>");

/***/ }),

/***/ "./src/models/Application.ts":
/*!***********************************!*\
  !*** ./src/models/Application.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Item: () => (/* binding */ Item),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Item;
(function (Item) {
    Item["AuthToken"] = "authToken";
    Item["CurrentUser"] = "currentUser";
})(Item || (Item = {}));
class Application {
    constructor() {
        this.listeners = {};
    }
    static getInstance() {
        if (this.instance === null)
            this.instance = new Application();
        return this.instance;
    }
    addListener(item, listener) {
        if (this.listeners[item] === undefined)
            this.listeners[item] = [];
        this.listeners[item].push(listener);
    }
    set(item, value) {
        if (value === null)
            localStorage.removeItem(item);
        else
            localStorage.setItem(item, JSON.stringify(value));
        this.notifyListeners(item);
    }
    get(item) {
        const value = localStorage.getItem(item);
        if (value === null)
            return null;
        return JSON.parse(value);
    }
    notifyListeners(item) {
        if (this.listeners[item] === undefined)
            return;
        for (const listener of this.listeners[item])
            listener(this.get(item));
    }
}
Application.instance = null;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Application);


/***/ })

}]);
//# sourceMappingURL=src_elements_NavbarElement_ts.index.js.map