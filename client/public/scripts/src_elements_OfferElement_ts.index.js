"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_OfferElement_ts"],{

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

/***/ "./src/elements/OfferElement.ts":
/*!**************************************!*\
  !*** ./src/elements/OfferElement.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferElement)
/* harmony export */ });
/* harmony import */ var _controllers_UserController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/UserController */ "./src/controllers/UserController.ts");
/* harmony import */ var _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fetches/OfferFetch */ "./src/fetches/OfferFetch.ts");


class OfferElement extends HTMLElement {
    constructor() {
        super(...arguments);
        // Attributes to inject
        this.offerID = null;
    }
    async connectedCallback() {
        await customElements.whenDefined("offer-element");
        this.offerID = this.getAttribute("offer-id");
        if (!this.offerID) {
            console.error("Missing required attributes.");
            return;
        }
        const offer = await _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_1__["default"].get(this.offerID);
        this.update(offer);
    }
    update(offer) {
        const lookupButton = this.querySelector('.offer-lookup-button');
        const titleElement = this.querySelector('.offer-title');
        const descriptionElement = this.querySelector('.offer-description');
        const categoryElement = this.querySelector('.offer-category');
        const typeElement = this.querySelector('.offer-type');
        const exchangeElement = this.querySelector('.offer-exchange');
        const locationElement = this.querySelector('.offer-location');
        const sellerElement = this.querySelector('.offer-seller');
        if (locationElement && offer.location) {
            locationElement.textContent = offer.location;
        }
        if (exchangeElement && offer.exchange) {
            exchangeElement.textContent = offer.exchange;
        }
        if (categoryElement) {
            categoryElement.textContent = offer.category;
        }
        if (typeElement) {
            typeElement.textContent = offer.type;
        }
        if (sellerElement) {
            new _controllers_UserController__WEBPACK_IMPORTED_MODULE_0__["default"](sellerElement)
                .load(offer.sellerID);
        }
        if (titleElement) {
            titleElement.textContent = offer.title;
        }
        if (descriptionElement) {
            descriptionElement.textContent = offer.description;
        }
        if (lookupButton) {
            lookupButton.href = `/offer?id=${offer._id}`;
        }
    }
}


/***/ }),

/***/ "./src/fetches/OfferFetch.ts":
/*!***********************************!*\
  !*** ./src/fetches/OfferFetch.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferFetch)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");

class OfferFetch {
    static async fetch(route, method, body) {
        const token = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.AuthToken);
        const headers = { "Content-Type": "application/json" };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        return await fetch(`${"http://localhost:3000"}${route}`, {
            method, headers, body: JSON.stringify(body)
        });
    }
    static async get(offerId) {
        const response = await this.fetch(`/offers/${offerId}`, "GET");
        if (response.ok === false)
            throw new Error("Failed to fetch offer");
        return response.json();
    }
    static async getAll() {
        const response = await this.fetch("/offers", "GET");
        if (response.ok === false)
            throw new Error("Failed to fetch offers");
        return response.json();
    }
    static async create(offer) {
        const response = await this.fetch("/offers", "POST", offer);
        if (response.ok === false)
            throw new Error("Failed to create offer");
        return response.json();
    }
    static async update(offer) {
        const response = await this.fetch(`/offers/${offer._id}`, "PUT", offer);
        if (response.ok === false)
            throw new Error("Failed to update offer");
        return response.json();
    }
    static async delete(offerId) {
        const response = await this.fetch(`/offers/${offerId}`, "DELETE");
        if (response.ok === false)
            throw new Error("Failed to delete offer");
    }
    static async search(terms) {
        const response = await this.fetch(`/offers/search/${terms}`, "GET");
        if (response.ok === false)
            throw new Error("Failed to search offers");
        return response.json();
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
//# sourceMappingURL=src_elements_OfferElement_ts.index.js.map