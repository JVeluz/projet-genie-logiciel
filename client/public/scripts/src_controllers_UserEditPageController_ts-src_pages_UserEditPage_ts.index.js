"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_controllers_UserEditPageController_ts-src_pages_UserEditPage_ts"],{

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
/* harmony import */ var _pages_UserEditPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/UserEditPage */ "./src/pages/UserEditPage.ts");


class UserEditPageController {
    constructor(
    // Views
    page, form) {
        this.page = page;
        this.form = form;
        // Models
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.pageModel = new _pages_UserEditPage__WEBPACK_IMPORTED_MODULE_1__.UserEditPageModel();
        this.form.onsubmit = (event) => this.onSubmit(event);
        this.form.oninput = () => this.onChange();
        this.initialize();
    }
    initialize() {
        this.pageModel.user = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser);
        if (!this.pageModel.user) {
            console.error("no user connected");
            return;
        }
        this.page.update(this.pageModel);
    }
    async onSubmit(event) {
        event.preventDefault();
        const entries = this.form.getEntries();
        console.log(entries);
        // try {
        //     await UserService.update(this.user);
        // } catch (error) {
        //     console.error("Failed to update user:", error);
        // }
    }
    onChange() {
        const entries = this.form.getEntries();
        // this.user = { ...this.user, ...entries };
        // this.preview.update(this.user);
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
/* harmony export */   UserEditPageModel: () => (/* binding */ UserEditPageModel),
/* harmony export */   "default": () => (/* binding */ UserEditPage)
/* harmony export */ });
/* harmony import */ var _controllers_UserEditPageController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/UserEditPageController */ "./src/controllers/UserEditPageController.ts");
/* harmony import */ var _html_user_edit_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/user-edit-page.html */ "./src/html/user-edit-page.html");
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/User */ "./src/models/User.ts");



class UserEditPageModel {
    constructor() {
        this.user = new _models_User__WEBPACK_IMPORTED_MODULE_2__["default"]();
    }
}
class UserEditPage extends HTMLElement {
    async connectedCallback() {
        await customElements.whenDefined("user-element");
        await customElements.whenDefined("user-edit-form");
        this.innerHTML = _html_user_edit_page_html__WEBPACK_IMPORTED_MODULE_1__["default"];
        this.form = this.querySelector("#user-edit-form");
        this.preview = this.querySelector("#user-preview");
        new _controllers_UserEditPageController__WEBPACK_IMPORTED_MODULE_0__["default"](this, this.form);
    }
    update(model) {
        console.log(model);
        this.form.update(model.user);
        this.preview.update(model.user);
    }
}


/***/ })

}]);
//# sourceMappingURL=src_controllers_UserEditPageController_ts-src_pages_UserEditPage_ts.index.js.map