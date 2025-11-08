"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_OfferForm_ts"],{

/***/ "./src/controllers/OfferEditorController.ts":
/*!**************************************************!*\
  !*** ./src/controllers/OfferEditorController.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferEditorController)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");
/* harmony import */ var _models_Offer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/Offer */ "./src/models/Offer.ts");
/* harmony import */ var _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fetches/OfferFetch */ "./src/fetches/OfferFetch.ts");



class OfferEditorController {
    constructor(form) {
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.offer = new _models_Offer__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.form = form;
    }
    async load(offerID) {
        const offer = await _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_2__["default"].get(offerID);
        const user = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser);
        if (user._id !== offer.sellerID) {
            window.location.href = "/";
            return;
        }
        this.offer = offer;
        this.form.update(offer);
        this.preview?.update(this.offer);
    }
    setCreateButton(button) {
        this.createButton = button;
        this.createButton.onclick = (event) => this.onCreateButton(event);
    }
    setUpdateButton(button) {
        this.updateButton = button;
        this.updateButton.onclick = (event) => this.onUpdateButton(event);
    }
    setDeleteButton(button) {
        this.deleteButton = button;
        this.deleteButton.onclick = (event) => this.onDeleteButton(event);
    }
    setPreview(element) {
        this.preview = element;
        this.form.onchange = () => this.onChange();
        this.onChange();
    }
    async onCreateButton(event) {
        event.preventDefault();
        const loading = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.Loading);
        if (loading)
            return;
        console.log("Creating offer:", this.offer);
        const formData = new FormData(this.form);
        const currentUser = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser);
        this.parseFormData(formData);
        this.offer.sellerID = currentUser._id;
        try {
            this.application.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.Loading, true);
            await _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_2__["default"].create(this.offer);
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            this.application.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.Loading, false);
            window.location.href = `/user?id=${currentUser._id}`;
        }
    }
    async onUpdateButton(event) {
        event.preventDefault();
        const loading = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.Loading);
        if (loading)
            return;
        const formData = new FormData(this.form);
        this.parseFormData(formData);
        try {
            this.application.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.Loading, true);
            await _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_2__["default"].update(this.offer);
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            this.application.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.Loading, false);
            window.location.href = `/offer?id=${this.offer._id}`;
        }
    }
    async onDeleteButton(event) {
        event.preventDefault();
        const loading = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.Loading);
        if (loading)
            return;
        try {
            this.application.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.Loading, true);
            await _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_2__["default"].delete(this.offer._id);
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            this.application.set(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.Loading, false);
            window.location.href = `/user?id=${this.offer.sellerID}`;
        }
    }
    onChange() {
        if (this.preview === undefined)
            return;
        const formData = new FormData(this.form);
        this.parseFormData(formData);
        this.preview.update(this.offer);
    }
    parseFormData(formData) {
        this.offer.title = formData.get("title");
        this.offer.description = formData.get("description");
        this.offer.category = formData.get("category");
        this.offer.type = formData.get("type");
        this.offer.exchange = formData.get("exchange");
        this.offer.location = formData.get("location");
        this.offer.price = parseFloat(formData.get("price")) || 0;
    }
}


/***/ }),

/***/ "./src/elements/OfferForm.ts":
/*!***********************************!*\
  !*** ./src/elements/OfferForm.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferForm)
/* harmony export */ });
/* harmony import */ var _controllers_OfferEditorController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/OfferEditorController */ "./src/controllers/OfferEditorController.ts");

class OfferForm extends HTMLFormElement {
    connectedCallback() {
        this.controller = new _controllers_OfferEditorController__WEBPACK_IMPORTED_MODULE_0__["default"](this);
    }
    update(offer) {
        const title = this.querySelector('input[name="title"]');
        const description = this.querySelector('textarea[name="description"]');
        const price = this.querySelector('input[name="price"]');
        const location = this.querySelector('input[name="location"]');
        const category = this.querySelector('select[name="category"]');
        const type = this.querySelector('select[name="type"]');
        const exchange = this.querySelector('textarea[name="exchange"]');
        if (title)
            title.value = offer.title;
        if (description)
            description.value = offer.description;
        if (price)
            price.value = offer.price.toString();
        if (category)
            category.value = offer.category;
        if (type)
            type.value = offer.type;
        if (exchange)
            exchange.value = offer.exchange || '';
        if (location)
            location.value = offer.location || '';
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
        offer.sellerID = data.sellerID;
        offer.createdAt = new Date(data.createdAt);
        offer.exchange = data.exchange;
        offer.location = data.location;
        offer.pictures = data.pictures;
        offer.comments = data.comments;
        return offer;
    }
}


/***/ })

}]);
//# sourceMappingURL=src_elements_OfferForm_ts.index.js.map