"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_NavbarElement_ts"],{

/***/ "./src/ServerAPI.ts":
/*!**************************!*\
  !*** ./src/ServerAPI.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/Application */ "./src/models/Application.ts");

class ServerAPI {
    static request(route, method, body) {
        const key = `${method}::${route}::${JSON.stringify(body)}`;
        if (this.pendingRequests.has(key)) {
            return this.pendingRequests.get(key);
        }
        const fetchPromise = this.fetch(route, method, body);
        const promiseToReturn = fetchPromise.finally(() => {
            this.pendingRequests.delete(key);
        });
        this.pendingRequests.set(key, promiseToReturn);
        return promiseToReturn;
    }
    static async fetch(route, method, body) {
        const token = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.AuthToken);
        const headers = { "Content-Type": "application/json" };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        let response;
        try {
            response = await fetch(`${"http://localhost:3000"}${route}`, {
                method, headers, body
            });
        }
        catch (networkError) {
            console.error("Fetch network error:", networkError);
            throw new Error("Network error: Failed to connect to API.");
        }
        if (response.ok === false) {
            const errorBody = await response.text();
            console.error(`API Error: ${response.status} ${response.statusText}`, errorBody);
            throw new Error(`API request failed with status ${response.status}`);
        }
        // (204 No Content)
        if (response.status === 204) {
            return null;
        }
        return response.json();
    }
    static get(route) {
        return this.request(route, "GET");
    }
    static post(route, body) {
        return this.request(route, "POST", body);
    }
    static put(route, body) {
        return this.request(route, "PUT", body);
    }
    static delete(route) {
        return this.request(route, "DELETE");
    }
}
ServerAPI.pendingRequests = new Map();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ServerAPI);


/***/ }),

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
/* harmony import */ var _services_UserService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/UserService */ "./src/services/UserService.ts");


class LoginController {
    constructor(form, logoutButton) {
        this.form = form;
        this.logoutButton = logoutButton;
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.form = form;
        this.form.onsubmit = (event) => this.onSubmit(event);
        if (logoutButton)
            logoutButton.onclick = (event) => this.onLogout(event);
    }
    async onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        const email = formData.get("email");
        const password = formData.get("password");
        const { token, user } = await _services_UserService__WEBPACK_IMPORTED_MODULE_1__["default"].login(email, password);
        this.application.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser, user);
        this.application.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.AuthToken, token);
        if (window.location.pathname === "/login") {
            window.location.href = "/";
        }
        else {
            window.location.reload();
        }
    }
    onLogout(event) {
        event.preventDefault();
        console.log(this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser));
        // this.model.set(Item.CurrentUser, null);
        // this.model.set(Item.AuthToken, null);
        // window.location.reload();
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
    constructor(navbarElement, userElement) {
        this.navbarElement = navbarElement;
        this.userElement = userElement;
        // Models
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.navbarElement = navbarElement;
        const currentUser = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser);
        console.log(currentUser);
        this.onUserUpdate(currentUser);
        this.onLoadingUpdate(this.application.loading);
        this.application.addListener(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser, this.onUserUpdate.bind(this));
    }
    onUserUpdate(value) {
        if (value)
            this.userElement.update(value);
    }
    onLoadingUpdate(value) {
        this.navbarElement.setLoading(value);
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
/* harmony import */ var _controllers_NavbarController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/NavbarController */ "./src/controllers/NavbarController.ts");
/* harmony import */ var _html_navbar_element_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/navbar-element.html */ "./src/html/navbar-element.html");
/* harmony import */ var _controllers_LoginController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/LoginController */ "./src/controllers/LoginController.ts");



class NavbarElement extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = _html_navbar_element_html__WEBPACK_IMPORTED_MODULE_1__["default"];
        this.loginDropdown = this.querySelector(".login-dropdown");
        this.logoutButton = this.querySelector(".logout-button");
        this.newOfferButton = this.querySelector(".new-offer-button");
        this.profileDropdown = this.querySelector(".profile-dropdown");
        this.userElement = this.querySelector(".navbar-user");
        this.loginForm = this.querySelector(".login-form");
        console.log(this.userElement);
        console.log(this.loginForm);
        new _controllers_NavbarController__WEBPACK_IMPORTED_MODULE_0__["default"](this, this.userElement);
        new _controllers_LoginController__WEBPACK_IMPORTED_MODULE_2__["default"](this.loginForm, this.logoutButton);
    }
    update(model) {
        this.loginDropdown.style.display = model.displayLogin ? "block" : "none";
        this.profileDropdown.style.display = model.displayProfile ? "block" : "none";
        this.newOfferButton.style.display = model.displayNewOfferButton ? "block" : "none";
    }
    setLoading(isLoading) {
        const progressBar = this.querySelector(".navbar-progress-bar");
        if (isLoading) {
            progressBar.style.width = "100%";
        }
        else {
            progressBar.style.width = "0%";
        }
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<nav class=\"sticky-top navbar navbar-expand-lg bg-body-tertiary shadow-sm\">\r\n    <div class=\"container-xxl\">\r\n        <!-- Logo/Marque -->\r\n        <a class=\"navbar-brand fw-bold text-primary\" href=\"/\">\r\n            LesBonBails\r\n        </a>\r\n\r\n        <!-- Toggler pour mobile -->\r\n        <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navContent\"\r\n            aria-controls=\"navContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n            <span class=\"navbar-toggler-icon\"></span>\r\n        </button>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"navContent\">\r\n            <ul class=\"navbar-nav ms-auto mb-2 mb-lg-0 align-items-center\">\r\n\r\n                <!-- 1. Bouton \"Nouveau Bon Bail\" -->\r\n                <li class=\"nav-item me-2\" style=\"display: none;\">\r\n                    <a href=\"/offer/edit\" class=\"new-offer-button btn btn-outline-success\">\r\n                        Nouveau Bon Bail\r\n                    </a>\r\n                </li>\r\n\r\n                <!-- 2. Bloc Déconnecté (Dropdown Connexion) -->\r\n                <li class=\"login-dropdown nav-item dropdown me-2\" style=\"display: none;\">\r\n                    <button class=\"btn btn-outline-primary\" role=\"button\" data-bs-toggle=\"dropdown\"\r\n                        data-bs-auto-close=\"outside\" aria-expanded=\"false\">\r\n                        Connexion\r\n                    </button>\r\n\r\n                    <div class=\"dropdown-menu dropdown-menu-end p-3 shadow border-0\" style=\"min-width: 220px;\">\r\n\r\n                        <form is=\"login-form\" class=\"login-form\">\r\n                            <div class=\"mb-2\">\r\n                                <input name=\"email\" type=\"email\" class=\"form-control form-control-sm\"\r\n                                    placeholder=\"Email\" required>\r\n                            </div>\r\n                            <div class=\"mb-3\">\r\n                                <input name=\"password\" type=\"password\" class=\"form-control form-control-sm\"\r\n                                    placeholder=\"Mot de passe\" required>\r\n                            </div>\r\n\r\n                            <button type=\"submit\" class=\"btn btn-primary w-100 btn-sm mb-2\">Se connecter</button>\r\n                            <a href=\"/register\" class=\"btn btn-secondary w-100 btn-sm\">S'enregistrer</a>\r\n                        </form>\r\n\r\n                    </div>\r\n                </li>\r\n\r\n                <!-- 3. Bloc Connecté (Dropdown Profil) -->\r\n                <user-element class=\"navbar-user\" style=\"display: none;\">\r\n                    <li class=\"profile-dropdown nav-item dropdown d-flex align-items-center\">\r\n                        <a class=\"nav-link dropdown-toggle p-0\" href=\"#\" role=\"button\" data-bs-toggle=\"dropdown\"\r\n                            aria-expanded=\"false\">\r\n                            <img src=\"https://placehold.co/32x32/17A2B8/ffffff?text=?\" width=\"32\" height=\"32\"\r\n                                alt=\"Profil\" class=\"user-avatar rounded-circle border border-2 border-primary\">\r\n                        </a>\r\n                        <ul class=\"dropdown-menu dropdown-menu-end shadow border-0\">\r\n                            <li><a class=\"user-profile-button dropdown-item\">\r\n                                    Profil\r\n                                </a></li>\r\n                            <li><button class=\"logout-button dropdown-item text-danger\"\r\n                                    type=\"button\">Déconnexion</button>\r\n                            </li>\r\n                        </ul>\r\n                    </li>\r\n                </user-element>\r\n\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>\r\n\r\n<!-- BARRE DE CHARGEMENT -->\r\n<div class=\"navbar-progress-bar progress\" style=\"display: none; height: 3px; width: 100%; border-radius: 0;\">\r\n    <div class=\"progress-bar progress-bar-striped progress-bar-animated\" role=\"progressbar\" style=\"width: 100%\"\r\n        aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\">\r\n    </div>\r\n</div>");

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
        this.loading = false;
        this.listeners = {};
        for (const item in Item)
            this.listeners[Item[item]] = [];
        console.log(localStorage);
    }
    static getInstance() {
        if (this.instance === null)
            this.instance = new Application();
        return this.instance;
    }
    addListener(item, listener) {
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
        for (const listener of this.listeners[item])
            listener(this.get(item));
    }
}
Application.instance = null;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Application);


/***/ }),

/***/ "./src/models/Offer.ts":
/*!*****************************!*\
  !*** ./src/models/Offer.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Offer)
/* harmony export */ });
class Offer {
    static fromJSON(data) {
        const offer = new Offer();
        offer._id = data._id;
        offer.title = data.title;
        offer.description = data.description;
        offer.price = data.price;
        offer.available = data.available;
        offer.category = data.category;
        offer.type = data.type;
        offer.createdAt = new Date(data.createdAt);
        offer.sellerID = data.sellerID;
        offer.chatIDs = data.chatIDs;
        offer.exchange = data.exchange;
        offer.location = data.location;
        offer.pictures = data.pictures;
        offer.comments = data.comments;
        return offer;
    }
}


/***/ }),

/***/ "./src/models/User.ts":
/*!****************************!*\
  !*** ./src/models/User.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ User)
/* harmony export */ });
/* harmony import */ var _Offer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Offer */ "./src/models/Offer.ts");

class User {
    static fromJSON(data) {
        const user = new User();
        user._id = data._id;
        user.name = data.name;
        user.email = data.email;
        user.rating = data.rating;
        user.createdAt = new Date(data.createdAt);
        user.offers = data.offers.map((offer) => _Offer__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(offer));
        return user;
    }
    getAvatar() {
        return this.avatar || `https://placehold.co/120x120/17A2B8/ffffff?text=${this.name[0]}`;
    }
}


/***/ }),

/***/ "./src/repositories/UserRepository.ts":
/*!********************************************!*\
  !*** ./src/repositories/UserRepository.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserRepository)
/* harmony export */ });
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/User */ "./src/models/User.ts");
/* harmony import */ var _ServerAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ServerAPI */ "./src/ServerAPI.ts");


class UserRepository {
    static async getByID(userID) {
        return _models_User__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(await _ServerAPI__WEBPACK_IMPORTED_MODULE_1__["default"].get(`/users/${userID}`));
    }
    static async login(email, password) {
        const body = JSON.stringify({
            email, password
        });
        const response = await _ServerAPI__WEBPACK_IMPORTED_MODULE_1__["default"].post(`/users/login`, body);
        return {
            token: response.token, user: _models_User__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(response.user)
        };
    }
    static async register(name, email, password) {
        const body = JSON.stringify({
            name, email, password
        });
        const response = await _ServerAPI__WEBPACK_IMPORTED_MODULE_1__["default"].post(`/users/register`, body);
        return {
            token: response.token, user: _models_User__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(response.user)
        };
    }
    static async update(user) {
        const body = JSON.stringify(user);
        const response = await _ServerAPI__WEBPACK_IMPORTED_MODULE_1__["default"].put(`/users/${user._id}`, body);
        return _models_User__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(response);
    }
}


/***/ }),

/***/ "./src/services/UserService.ts":
/*!*************************************!*\
  !*** ./src/services/UserService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var _repositories_UserRepository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../repositories/UserRepository */ "./src/repositories/UserRepository.ts");

class UserService {
    static async getByID(userID) {
        return await _repositories_UserRepository__WEBPACK_IMPORTED_MODULE_0__["default"].getByID(userID);
    }
    static async login(email, password) {
        return await _repositories_UserRepository__WEBPACK_IMPORTED_MODULE_0__["default"].login(email, password);
    }
    static async register(user, password) {
        return await _repositories_UserRepository__WEBPACK_IMPORTED_MODULE_0__["default"].register(user.name, user.email, password);
    }
    static async update(user) {
        return await _repositories_UserRepository__WEBPACK_IMPORTED_MODULE_0__["default"].update(user);
    }
}


/***/ })

}]);
//# sourceMappingURL=src_elements_NavbarElement_ts.index.js.map