"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_pages_RegisterPage_ts"],{

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
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/User */ "./src/models/User.ts");
/* harmony import */ var _services_UserService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/UserService */ "./src/services/UserService.ts");



class RegisterController {
    constructor(form) {
        // Models
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.form = form;
        // Connect events
        this.form.onsubmit = (event) => this.onSubmit(event);
    }
    async onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        const password = formData.get("password");
        const user = new _models_User__WEBPACK_IMPORTED_MODULE_1__["default"]();
        user.name = formData.get("name");
        user.email = formData.get("email");
        let response;
        try {
            this.application.loading = true;
            response = await _services_UserService__WEBPACK_IMPORTED_MODULE_2__["default"].register(user, password);
        }
        catch (error) {
            console.error("Registration failed:", error);
            return;
        }
        finally {
            this.application.loading = false;
        }
        const newUser = response.user;
        const token = response.token;
        this.application.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser, newUser);
        this.application.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.AuthToken, token);
        window.location.href = "/";
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
        user.bio = data.bio || "";
        return user;
    }
    getAvatar() {
        return this.avatar || `https://placehold.co/120x120/17A2B8/ffffff?text=${this.name[0]}`;
    }
}


/***/ }),

/***/ "./src/pages/RegisterPage.ts":
/*!***********************************!*\
  !*** ./src/pages/RegisterPage.ts ***!
  \***********************************/
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
//# sourceMappingURL=src_pages_RegisterPage_ts.index.js.map