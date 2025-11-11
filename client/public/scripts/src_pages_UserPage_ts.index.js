"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_pages_UserPage_ts"],{

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

/***/ "./src/controllers/UserPageController.ts":
/*!***********************************************!*\
  !*** ./src/controllers/UserPageController.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserPageController)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/User */ "./src/models/User.ts");
/* harmony import */ var _services_UserService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/UserService */ "./src/services/UserService.ts");



class UserPageController {
    constructor(page) {
        // URLSearchParams
        this.urlParams = new URLSearchParams(window.location.search);
        this.userID = this.urlParams.get("id");
        // Models
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.model = {
            user: new _models_User__WEBPACK_IMPORTED_MODULE_1__["default"](),
            isCurrentUser: false
        };
        this.page = page;
        this.initialize();
    }
    async initialize() {
        // URL Parameters
        if (!this.userID) {
            console.error("UserPage: missing user ID");
            return;
        }
        // Fetch User
        try {
            this.model.user = await _services_UserService__WEBPACK_IMPORTED_MODULE_2__["default"].getByID(this.userID);
        }
        catch (error) {
            console.error("UserPage: user not found");
            return;
        }
        // Check Current User
        const currentUser = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser);
        this.model.isCurrentUser = currentUser ?
            (currentUser._id === this.model.user._id) : false;
        // Update View
        this.page.update(this.model);
    }
}


/***/ }),

/***/ "./src/html/offer-card.html":
/*!**********************************!*\
  !*** ./src/html/offer-card.html ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<a class=\"offer-lookup-button card shadow-sm text-decoration-none\">\r\n    <img src=\"https://placehold.co/600x400\" class=\"card-img-top\" alt=\"Titre de l'objet\">\r\n    <div class=\"card-body\">\r\n        <h5 class=\"offer-title card-title text-primary\">\r\n            ?\r\n        </h5>\r\n        <p class=\"offer-description card-text text-truncate\">\r\n            ?\r\n        </p>\r\n    </div>\r\n</a>");

/***/ }),

/***/ "./src/html/user-page.html":
/*!*********************************!*\
  !*** ./src/html/user-page.html ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<navbar-element></navbar-element>\r\n\r\n<div class=\"pt-4\"></div>\r\n\r\n<main class=\"container\">\r\n    <user-element id=\"user-element\">\r\n        <div class=\"row\">\r\n            <!-- Colonne Profil (gauche) -->\r\n            <div class=\"col-lg-4 mb-4\">\r\n                <div class=\"card shadow-lg border-0 text-center p-4\">\r\n                    <div class=\"card-body\">\r\n                        <!-- Avatar -->\r\n                        <img src=\"https://placehold.co/128x128/17A2B8/ffffff?text=JD\" alt=\"Avatar Utilisateur\"\r\n                            width=\"128\" height=\"128\"\r\n                            class=\"user-avatar rounded-circle mb-3 border border-4 border-primary shadow-sm\">\r\n\r\n                        <!-- Nom et Taux -->\r\n                        <h2 class=\"user-name fw-bold mb-1\">\r\n                            ?\r\n                        </h2>\r\n                        <p class=\"user-rating text-warning mb-4\">\r\n                            ?\r\n                        </p>\r\n\r\n                        <!-- Bouton Modifier -->\r\n                        <a id=\"user-edit-button\" href=\"/user/edit\" class=\"btn btn-primary w-100 mb-2\">\r\n                            <i class=\"bi bi-pencil-square me-2\"></i>\r\n                            Modifier le Profil\r\n                        </a>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <!-- Colonne Contenu (droite) -->\r\n            <div class=\"col-lg-8\">\r\n\r\n                <!-- Section Informations de Base -->\r\n                <div class=\"card shadow-sm mb-4\">\r\n                    <div class=\"card-header border-bottom fw-bold text-primary\">\r\n                        <i class=\"bi bi-person-lines-fill me-2\"></i>Informations de Compte\r\n                    </div>\r\n                    <ul class=\"list-group list-group-flush\">\r\n                        <li class=\"list-group-item d-flex justify-content-between align-items-center\">\r\n                            <span class=\"fw-bold\">\r\n                                Membre depuis:\r\n                            </span>\r\n                            <span class=\"user-member-since\">\r\n\r\n                            </span>\r\n                        </li>\r\n                        <li class=\"list-group-item\">\r\n                            <span class=\"fw-bold d-block mb-1\">\r\n                                Ma Bio:\r\n                            </span>\r\n                            <p class=\"user-bio text-muted mb-0\">\r\n                                ?\r\n                            </p>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n\r\n                <!-- Section Annonces -->\r\n                <h3 class=\"mt-4 mb-3 text-secondary border-bottom pb-2\">\r\n                    Mes Annonces\r\n                </h3>\r\n                <div id=\"user-offers\" class=\"row row-cols-1 row-cols-md-2 g-4\">\r\n\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </user-element>\r\n</main>");

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

/***/ "./src/pages/UserPage.ts":
/*!*******************************!*\
  !*** ./src/pages/UserPage.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserPage)
/* harmony export */ });
/* harmony import */ var _html_user_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/user-page.html */ "./src/html/user-page.html");
/* harmony import */ var _html_offer_card_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/offer-card.html */ "./src/html/offer-card.html");
/* harmony import */ var _controllers_UserPageController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/UserPageController */ "./src/controllers/UserPageController.ts");



class UserPage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = _html_user_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        new _controllers_UserPageController__WEBPACK_IMPORTED_MODULE_2__["default"](this);
    }
    update(model) {
        const editButton = this.querySelector("#user-edit-button");
        const userElement = this.querySelector("#user-element");
        const offersContainer = this.querySelector("#user-offers");
        editButton.href = `/user/edit?id=${model.user._id}`;
        editButton.style.display = model.isCurrentUser ? "block" : "none";
        userElement.update(model.user);
        for (const offer of model.user.offers) {
            const offerElement = document.createElement("offer-element");
            offerElement.innerHTML = _html_offer_card_html__WEBPACK_IMPORTED_MODULE_1__["default"];
            offerElement.update(offer);
            offersContainer.appendChild(offerElement);
        }
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
//# sourceMappingURL=src_pages_UserPage_ts.index.js.map