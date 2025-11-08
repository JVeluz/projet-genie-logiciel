"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_controllers_OfferController_ts"],{

/***/ "./src/controllers/OfferController.ts":
/*!********************************************!*\
  !*** ./src/controllers/OfferController.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferController)
/* harmony export */ });
/* harmony import */ var _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../fetches/OfferFetch */ "./src/fetches/OfferFetch.ts");
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");


class OfferController {
    constructor(view) {
        this.view = view;
    }
    async load(offerID) {
        const offer = await _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_0__["default"].get(offerID);
        console.log(offer);
        this.view.update(offer);
        this.model = offer;
    }
    isOfferMine() {
        if (!this.model)
            return false;
        const currentUser = _models_Application__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().get(_models_Application__WEBPACK_IMPORTED_MODULE_1__.Item.CurrentUser);
        return currentUser ? this.model.sellerID === currentUser._id : false;
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
//# sourceMappingURL=src_controllers_OfferController_ts.index.js.map