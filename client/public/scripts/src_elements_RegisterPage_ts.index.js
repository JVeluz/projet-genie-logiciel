"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_RegisterPage_ts"],{

/***/ "./src/controllers/RegisterController.ts":
/*!***********************************************!*\
  !*** ./src/controllers/RegisterController.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RegisterController)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");
/* harmony import */ var _fetches_UserFetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fetches/UserFetch */ "./src/fetches/UserFetch.ts");


class RegisterController {
    constructor(form) {
        this.model = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.form = form;
        this.form.onsubmit = (event) => this.onSubmit(event);
    }
    async onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        try {
            const response = await _fetches_UserFetch__WEBPACK_IMPORTED_MODULE_1__["default"].register(name, email, password);
            const { token, user } = response;
            this.model.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser, user);
            this.model.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.AuthToken, token);
            window.location.href = "/";
        }
        catch (error) {
            alert(error.message);
        }
    }
}


/***/ }),

/***/ "./src/elements/RegisterPage.ts":
/*!**************************************!*\
  !*** ./src/elements/RegisterPage.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RegisterPage)
/* harmony export */ });
/* harmony import */ var _controllers_RegisterController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/RegisterController */ "./src/controllers/RegisterController.ts");
/* harmony import */ var _html_register_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/register-page.html */ "./src/html/register-page.html");


class RegisterPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_register_page_html__WEBPACK_IMPORTED_MODULE_1__["default"];
        new _controllers_RegisterController__WEBPACK_IMPORTED_MODULE_0__["default"](this.querySelector(".register-form"));
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

/***/ "./src/html/register-page.html":
/*!*************************************!*\
  !*** ./src/html/register-page.html ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<navbar-element></navbar-element>\r\n\r\n<div class=\"pt-4\"></div>\r\n\r\n<main class=\"container main-container d-flex align-items-center justify-content-center py-5\">\r\n    <div class=\"col-12 col-md-8 col-lg-5 col-xl-4\">\r\n        <div class=\"card shadow-lg border-0 rounded-3\">\r\n            <div class=\"card-body p-4 p-md-5\">\r\n\r\n                <h2 class=\"card-title text-center fw-bold text-primary mb-4\">Créer un compte</h2>\r\n\r\n                <form class=\"register-form\">\r\n                    <!-- Champ Nom -->\r\n                    <div class=\"form-floating mb-3\">\r\n                        <input name=\"name\" type=\"text\" class=\"form-control\" id=\"floatingName\" placeholder=\"Votre nom\"\r\n                            required>\r\n                        <label for=\"floatingName\">Votre Nom</label>\r\n                    </div>\r\n\r\n                    <!-- Champ Email -->\r\n                    <div class=\"form-floating mb-3\">\r\n                        <input type=\"email\" class=\"form-control\" name=\"email\" id=\"floatingEmail\"\r\n                            placeholder=\"votre.email@exemple.com\" required>\r\n                        <label for=\"floatingEmail\">Adresse Email</label>\r\n                    </div>\r\n\r\n                    <!-- Champ Mot de passe -->\r\n                    <div class=\"form-floating mb-3\">\r\n                        <input type=\"password\" class=\"form-control\" name=\"password\" id=\"floatingPassword\"\r\n                            placeholder=\"Mot de passe\" required>\r\n                        <label for=\"floatingPassword\">Mot de passe</label>\r\n                    </div>\r\n\r\n                    <!-- Bouton de Soumission -->\r\n                    <div class=\"d-grid mb-3\">\r\n                        <button class=\"btn btn-primary btn-lg fw-bold\" type=\"submit\">S'inscrire</button>\r\n                    </div>\r\n\r\n                    <!-- Lien vers la connexion -->\r\n                    <div class=\"text-center\">\r\n                        <small class=\"text-muted\">Déjà un compte ? <a href=\"/login\" class=\"fw-bold text-primary\">Se\r\n                                connecter</a></small>\r\n                    </div>\r\n                </form>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</main>");

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
//# sourceMappingURL=src_elements_RegisterPage_ts.index.js.map