"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_LoginElement_ts"],{

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

/***/ "./src/elements/LoginElement.ts":
/*!**************************************!*\
  !*** ./src/elements/LoginElement.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginElement)
/* harmony export */ });
/* harmony import */ var _controllers_LoginController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/LoginController */ "./src/controllers/LoginController.ts");

class LoginElement extends HTMLFormElement {
    connectedCallback() {
        new _controllers_LoginController__WEBPACK_IMPORTED_MODULE_0__["default"](this);
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
//# sourceMappingURL=src_elements_LoginElement_ts.index.js.map