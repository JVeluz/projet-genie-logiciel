"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_composants_NavbarElement_ts"],{

/***/ "./src/composants/NavbarElement.ts":
/*!*****************************************!*\
  !*** ./src/composants/NavbarElement.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavbarElement)
/* harmony export */ });
/* harmony import */ var _controllers_NavbarController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/NavbarController */ "./src/controllers/NavbarController.ts");
/* harmony import */ var _html_navbar_element_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/navbar-element.html */ "./src/html/navbar-element.html");
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");



class NavbarElement extends HTMLElement {
    constructor() {
        super(...arguments);
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance();
        this.currentUser = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_2__.Item.CurrentUser);
    }
    async connectedCallback() {
        await customElements.whenDefined('user-element');
        this.innerHTML = _html_navbar_element_html__WEBPACK_IMPORTED_MODULE_1__["default"];
        this.loginDropdown = this.querySelector('.login-dropdown');
        this.logoutButton = this.querySelector('.logout-button');
        this.newOfferButton = this.querySelector('.new-offer-button');
        this.profileDropdown = this.querySelector('.profile-dropdown');
        this.userElement = this.querySelector('.navbar-user');
        this.loginForm = this.querySelector('.login-form');
        if (this.currentUser) {
            this.userElement.update(this.currentUser);
        }
        new _controllers_NavbarController__WEBPACK_IMPORTED_MODULE_0__["default"](this);
        customElements.whenDefined('login-form').then(() => {
            this.loginForm.controller.setLogoutButton(this.logoutButton);
        });
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
    setLoading(isLoading) {
        const progressBar = this.querySelector('.navbar-progress-bar');
        if (isLoading) {
            progressBar.style.width = '100%';
        }
        else {
            progressBar.style.width = '0%';
        }
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
        this.onLoadingUpdate(this.model.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.Loading));
        this.model.addListener(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser, this.onUserUpdate.bind(this));
        this.model.addListener(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.Loading, this.onLoadingUpdate.bind(this));
    }
    onUserUpdate(value) {
        this.view.update(value);
    }
    onLoadingUpdate(value) {
        this.view.setLoading(value);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<nav class=\"sticky-top navbar navbar-expand-lg bg-body-tertiary shadow-sm\">\r\n    <div class=\"container-xxl\">\r\n        <!-- Logo/Marque -->\r\n        <a class=\"navbar-brand fw-bold text-primary\" href=\"/\">\r\n            LesBonBails\r\n        </a>\r\n\r\n        <!-- Toggler pour mobile -->\r\n        <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navContent\"\r\n            aria-controls=\"navContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n            <span class=\"navbar-toggler-icon\"></span>\r\n        </button>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"navContent\">\r\n            <ul class=\"navbar-nav ms-auto mb-2 mb-lg-0 align-items-center\">\r\n\r\n                <!-- 1. Bouton \"Nouveau Bon Bail\" -->\r\n                <li class=\"nav-item me-2\">\r\n                    <a href=\"/offer/edit\" class=\"new-offer-button btn btn-outline-success\">\r\n                        Nouveau Bon Bail\r\n                    </a>\r\n                </li>\r\n\r\n                <!-- 2. Bloc Déconnecté (Dropdown Connexion) -->\r\n                <li class=\"login-dropdown nav-item dropdown me-2\">\r\n                    <button class=\"btn btn-outline-primary\" role=\"button\" data-bs-toggle=\"dropdown\"\r\n                        data-bs-auto-close=\"outside\" aria-expanded=\"false\">\r\n                        Connexion\r\n                    </button>\r\n\r\n                    <div class=\"dropdown-menu dropdown-menu-end p-3 shadow border-0\" style=\"min-width: 220px;\">\r\n\r\n                        <form is=\"login-form\" class=\"login-form\">\r\n                            <div class=\"mb-2\">\r\n                                <input name=\"email\" type=\"email\" class=\"form-control form-control-sm\"\r\n                                    placeholder=\"Email\" required>\r\n                            </div>\r\n                            <div class=\"mb-3\">\r\n                                <input name=\"password\" type=\"password\" class=\"form-control form-control-sm\"\r\n                                    placeholder=\"Mot de passe\" required>\r\n                            </div>\r\n\r\n                            <button type=\"submit\" class=\"btn btn-primary w-100 btn-sm mb-2\">Se connecter</button>\r\n                            <a href=\"/register\" class=\"btn btn-secondary w-100 btn-sm\">S'enregistrer</a>\r\n                        </form>\r\n\r\n                    </div>\r\n                </li>\r\n\r\n                <!-- 3. Bloc Connecté (Dropdown Profil) -->\r\n                <user-element class=\"navbar-user\">\r\n                    <li class=\"profile-dropdown nav-item dropdown d-flex align-items-center\">\r\n                        <a class=\"nav-link dropdown-toggle p-0\" href=\"#\" role=\"button\" data-bs-toggle=\"dropdown\"\r\n                            aria-expanded=\"false\">\r\n                            <img src=\"https://placehold.co/32x32/17A2B8/ffffff?text=?\" width=\"32\" height=\"32\"\r\n                                alt=\"Profil\" class=\"user-avatar rounded-circle border border-2 border-primary\">\r\n                        </a>\r\n                        <ul class=\"dropdown-menu dropdown-menu-end shadow border-0\">\r\n                            <li><a class=\"user-profile-button dropdown-item\">\r\n                                    Profil\r\n                                </a></li>\r\n                            <li><button class=\"logout-button dropdown-item text-danger\"\r\n                                    type=\"button\">Déconnexion</button>\r\n                            </li>\r\n                        </ul>\r\n                    </li>\r\n                </user-element>\r\n\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>\r\n\r\n<!-- BARRE DE CHARGEMENT -->\r\n<div class=\"navbar-progress-bar progress\" style=\"height: 3px; width: 100%; border-radius: 0;\">\r\n    <div class=\"progress-bar progress-bar-striped progress-bar-animated\" role=\"progressbar\" style=\"width: 100%\"\r\n        aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\">\r\n    </div>\r\n</div>");

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
    Item["Loading"] = "false";
})(Item || (Item = {}));
class Application {
    constructor() {
        this.listeners = {};
        for (const item in Item)
            this.listeners[Item[item]] = [];
        this.set(Item.Loading, false);
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


/***/ })

}]);
//# sourceMappingURL=src_composants_NavbarElement_ts.index.js.map