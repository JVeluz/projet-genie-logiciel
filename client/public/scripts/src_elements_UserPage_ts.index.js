"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_UserPage_ts"],{

/***/ "./src/controllers/UserController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/UserController.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserController)
/* harmony export */ });
/* harmony import */ var _fetches_UserFetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../fetches/UserFetch */ "./src/fetches/UserFetch.ts");

class UserController {
    constructor(view) {
        this.view = view;
    }
    async load(userID) {
        const user = await _fetches_UserFetch__WEBPACK_IMPORTED_MODULE_0__["default"].get(userID);
        this.view.update(user);
    }
}


/***/ }),

/***/ "./src/elements/UserPage.ts":
/*!**********************************!*\
  !*** ./src/elements/UserPage.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserPage)
/* harmony export */ });
/* harmony import */ var _html_user_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/user-page.html */ "./src/html/user-page.html");
/* harmony import */ var _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/UserController */ "./src/controllers/UserController.ts");
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");



class UserPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_user_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        const urlParams = new URLSearchParams(window.location.search);
        const userID = urlParams.get("id");
        if (userID === null) {
            const currentUser = _models_Application__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().get(_models_Application__WEBPACK_IMPORTED_MODULE_2__.Item.CurrentUser);
            if (currentUser) {
                window.location.href = `/user?id=${currentUser._id}`;
                return;
            }
        }
        const userElement = this.querySelector(".page-user");
        new _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__["default"](userElement)
            .load(userID);
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
        let response = undefined;
        try {
            response = await fetch(`${"http://localhost:3000"}${route}`, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (response.ok === false) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
        }
        catch (error) {
            alert(error.message);
            if (response) {
                const responseMessage = await response.text();
                alert(responseMessage);
            }
        }
        throw new Error("Network error");
    }
    static async get(userID) {
        const response = await this.fetch(`/users/${userID}`, "GET");
        return response.json();
    }
    static async login(email, password) {
        const response = await this.fetch("/login", "POST", { email, password });
        return response.json();
    }
    static async register(name, email, password) {
        const response = await this.fetch("/register", "POST", { name, email, password });
        return response.json();
    }
}


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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<navbar-element></navbar-element>\r\n\r\n<div class=\"pt-4\"></div>\r\n\r\n<main class=\"container\">\r\n    <user-element class=\"page-user\">\r\n        <div class=\"row\">\r\n            <!-- Colonne Profil (gauche) -->\r\n            <div class=\"col-lg-4 mb-4\">\r\n                <div class=\"card shadow-lg border-0 text-center p-4\">\r\n                    <div class=\"card-body\">\r\n                        <!-- Avatar -->\r\n                        <img src=\"https://placehold.co/128x128/17A2B8/ffffff?text=JD\" alt=\"Avatar Utilisateur\"\r\n                            width=\"128\" height=\"128\"\r\n                            class=\"user-avatar rounded-circle mb-3 border border-4 border-primary shadow-sm\">\r\n\r\n                        <!-- Nom et Taux -->\r\n                        <h2 class=\"user-name fw-bold mb-1\">\r\n                            ?\r\n                        </h2>\r\n                        <p class=\"user-rating text-warning mb-4\">\r\n                            ?\r\n                        </p>\r\n\r\n                        <!-- Bouton Modifier -->\r\n                        <a href=\"/user/edit\" class=\"user-edit-button btn btn-primary w-100 mb-2\">\r\n                            <i class=\"bi bi-pencil-square me-2\"></i>\r\n                            Modifier le Profil\r\n                        </a>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <!-- Colonne Contenu (droite) -->\r\n            <div class=\"col-lg-8\">\r\n\r\n                <!-- Section Informations de Base -->\r\n                <div class=\"card shadow-sm mb-4\">\r\n                    <div class=\"card-header border-bottom fw-bold text-primary\">\r\n                        <i class=\"bi bi-person-lines-fill me-2\"></i>Informations de Compte\r\n                    </div>\r\n                    <ul class=\"list-group list-group-flush\">\r\n                        <li class=\"list-group-item d-flex justify-content-between align-items-center\">\r\n                            <span class=\"fw-bold\">\r\n                                Habite à:\r\n                            </span>\r\n                            <span class=\"user-location\">\r\n                                ?\r\n                            </span>\r\n                        </li>\r\n                        <li class=\"list-group-item d-flex justify-content-between align-items-center\">\r\n                            <span class=\"fw-bold\">\r\n                                Membre depuis:\r\n                            </span>\r\n                            <span class=\"member-since\">\r\n                                ?\r\n                            </span>\r\n                        </li>\r\n                        <li class=\"list-group-item\">\r\n                            <span class=\"fw-bold d-block mb-1\">\r\n                                Ma Bio:\r\n                            </span>\r\n                            <p class=\"user-bio text-muted mb-0\">\r\n                                ?\r\n                            </p>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n\r\n                <!-- Section Annonces -->\r\n                <h3 class=\"mt-4 mb-3 text-secondary border-bottom pb-2\">\r\n                    Mes Annonces\r\n                </h3>\r\n                <div class=\"user-offers row row-cols-1 row-cols-md-2 g-4\">\r\n\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </user-element>\r\n</main>");

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
//# sourceMappingURL=src_elements_UserPage_ts.index.js.map