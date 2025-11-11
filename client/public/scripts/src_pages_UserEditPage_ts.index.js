"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_pages_UserEditPage_ts"],{

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

/***/ "./src/controllers/UserEditPageController.ts":
/*!***************************************************!*\
  !*** ./src/controllers/UserEditPageController.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserEditPageController)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");
/* harmony import */ var _services_UserService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/UserService */ "./src/services/UserService.ts");


class UserEditPageController {
    constructor(
    // Views
    page, form) {
        this.page = page;
        this.form = form;
        // Models
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.user = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser);
        this.form.onsubmit = (event) => this.onSubmit(event);
        this.form.oninput = () => this.onChange();
        this.initialize();
    }
    async initialize() {
        // Precondition
        const currentUser = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser);
        if (!currentUser) {
            console.error("UserPage: no user connected");
            return;
        }
        // URL Parameters
        const urlParams = new URLSearchParams(window.location.search);
        const userID = urlParams.get("id");
        if (!userID) {
            console.error("UserPage: missing user ID");
            return;
        }
        // Precondition
        if (userID !== currentUser._id) {
            console.error("UserPage: you cant edit an other person profile");
            return;
        }
        // Fetch User
        try {
            this.user = await _services_UserService__WEBPACK_IMPORTED_MODULE_1__["default"].getByID(userID);
        }
        catch (error) {
            console.error("UserPage: user not found");
            return;
        }
        this.page.updateForm(this.user);
        this.page.updatePreview(this.user);
    }
    async onSubmit(event) {
        event.preventDefault();
        const entries = this.form.getEntries();
        this.user = { ...this.user, ...entries };
        try {
            await _services_UserService__WEBPACK_IMPORTED_MODULE_1__["default"].update(this.user);
        }
        catch (error) {
            console.error("Failed to update user:", error);
            return;
        }
        window.location.href = `/user?id=${this.user._id}`;
    }
    onChange() {
        const entries = this.form.getEntries();
        this.user = { ...this.user, ...entries };
        console.log(this.user);
        this.page.updatePreview(this.user);
    }
}


/***/ }),

/***/ "./src/html/user-edit-page.html":
/*!**************************************!*\
  !*** ./src/html/user-edit-page.html ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La navbar est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Contenu Principal -->\r\n<main class=\"container py-5\">\r\n    <!-- Changement de la structure en 2 colonnes avec g-5 pour l'espacement -->\r\n    <div class=\"row g-5 justify-content-center\">\r\n\r\n        <!-- COLONNE 1: FORMULAIRE D'ÉDITION -->\r\n        <div class=\"col-12 col-lg-7\">\r\n\r\n            <h2 class=\"text-center fw-bold text-primary mb-4\">Modifier votre profil</h2>\r\n\r\n            <!-- Carte principale contenant le formulaire -->\r\n            <div class=\"card shadow-lg border-0\">\r\n                <div class=\"card-body p-4 p-md-5\">\r\n\r\n                    <form id=\"user-edit-form\" is=\"user-edit-form\">\r\n\r\n                        <!-- Champ Avatar -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"edit-avatar\" class=\"form-label fw-bold\">Photo de profil</label>\r\n                            <input name=\"avatar\" class=\"form-control\" type=\"file\" accept=\"image/*\">\r\n                        </div>\r\n\r\n                        <!-- Champ Nom -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"edit-name\" class=\"form-label fw-bold\">\r\n                                Votre Nom\r\n                            </label>\r\n                            <input name=\"name\" type=\"text\" class=\"form-control\" required>\r\n                        </div>\r\n\r\n                        <!-- Champ Biographie -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"edit-bio\" class=\"form-label fw-bold\">\r\n                                Ma biographie\r\n                            </label>\r\n                            <textarea name=\"bio\" class=\"form-control\" rows=\"4\">\r\n                            </textarea>\r\n                        </div>\r\n\r\n                        <hr class=\"my-4\">\r\n\r\n                        <!-- Boutons d'action -->\r\n                        <div class=\"d-flex flex-wrap justify-content-between align-items-center\">\r\n                            <button type=\"submit\" class=\"btn btn-primary btn-lg mb-2\">\r\n                                <i class=\"bi bi-check-circle me-2\"></i>Enregistrer\r\n                            </button>\r\n                            <a href=\"/profile\" class=\"btn btn-outline-secondary mb-2\">\r\n                                Annuler\r\n                            </a>\r\n                            <button type=\"button\" class=\"btn btn-outline-danger mb-2\" data-bs-toggle=\"modal\"\r\n                                data-bs-target=\"#deleteUserModal\">\r\n                                <i class=\"bi bi-trash me-2\"></i>Supprimer le compte\r\n                            </button>\r\n                        </div>\r\n\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div> <!-- Fin de la colonne formulaire -->\r\n\r\n        <!-- COLONNE 2: APERÇU DE LA CARTE -->\r\n        <div class=\"col-12 col-lg-5\">\r\n            <!-- sticky-top garde l'aperçu visible pendant le scroll -->\r\n            <div class=\"sticky-top\" style=\"top: 5rem;\">\r\n                <h4 class=\"text-center text-primary mb-4\">Aperçu de la carte</h4>\r\n\r\n                <!-- Carte d'aperçu -->\r\n                <div class=\"card shadow-lg text-center p-3\">\r\n                    <div class=\"card-body\">\r\n\r\n                        <user-element id=\"user-preview\">\r\n                            <img src=\"https://placehold.co/120x120/17A2B8/ffffff?text=U\" alt=\"Aperçu Avatar\" width=\"120\"\r\n                                height=\"120\"\r\n                                class=\"user-avatar rounded-circle mb-3 border border-3 border-primary shadow\">\r\n\r\n                            <h5 class=\"user-name fw-bold mb-1\">\r\n                                ?\r\n                            </h5>\r\n\r\n                            <p class=\"user-bio text-muted fst-italic\">\r\n                                ?\r\n                            </p>\r\n\r\n                            <p class=\"user-rating mb-3 text-warning\">⭐⭐⭐⭐⭐ <small class=\"text-muted\">(Aperçu)</small>\r\n                            </p>\r\n\r\n                            <a href=\"#\" class=\"btn btn-outline-primary w-100 mt-2 disabled\" tabindex=\"-1\"\r\n                                aria-disabled=\"true\">\r\n                                Voir le Profil\r\n                            </a>\r\n                        </user-element>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div> <!-- Fin de la colonne aperçu -->\r\n\r\n    </div>\r\n</main>\r\n\r\n<!-- Modal de Confirmation de Suppression de Compte (Inchangé) -->\r\n<div class=\"modal fade\" id=\"deleteUserModal\" tabindex=\"-1\" aria-labelledby=\"deleteUserModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-dialog-centered\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h5 class=\"modal-title text-danger\" id=\"deleteUserModalLabel\">\r\n                    <i class=\"bi bi-exclamation-triangle-fill me-2\"></i>Confirmer la suppression du compte\r\n                </h5>\r\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                Êtes-vous sûr de vouloir supprimer votre compte ? <br>\r\n                Toutes vos annonces et informations seront définitivement perdues.\r\n                <br><strong>Cette action est irréversible.</strong>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Annuler</button>\r\n                <button type=\"button\" class=\"btn btn-danger\">Oui, supprimer mon compte</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

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

/***/ "./src/pages/UserEditPage.ts":
/*!***********************************!*\
  !*** ./src/pages/UserEditPage.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserEditPage)
/* harmony export */ });
/* harmony import */ var _controllers_UserEditPageController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/UserEditPageController */ "./src/controllers/UserEditPageController.ts");
/* harmony import */ var _html_user_edit_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/user-edit-page.html */ "./src/html/user-edit-page.html");


class UserEditPage extends HTMLElement {
    async connectedCallback() {
        await customElements.whenDefined("user-element");
        await customElements.whenDefined("user-edit-form");
        this.innerHTML = _html_user_edit_page_html__WEBPACK_IMPORTED_MODULE_1__["default"];
        this.form = this.querySelector("#user-edit-form");
        this.preview = this.querySelector("#user-preview");
        new _controllers_UserEditPageController__WEBPACK_IMPORTED_MODULE_0__["default"](this, this.form);
    }
    updateForm(user) {
        this.form.update(user);
    }
    updatePreview(user) {
        this.preview.update(user);
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
//# sourceMappingURL=src_pages_UserEditPage_ts.index.js.map