"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_composants_OfferForm_ts"],{

/***/ "./src/composants/OfferForm.ts":
/*!*************************************!*\
  !*** ./src/composants/OfferForm.ts ***!
  \*************************************/
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


class OfferEditorController {
    constructor(form) {
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.offer = new _models_Offer__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.form = form;
    }
    async load(offerID) {
        // const offer: Offer = await OfferFetch.get(offerID);
        // const user: User = Application.getInstance().get(Item.CurrentUser);
        // if (user._id !== offer.sellerID) {
        //     window.location.href = "/";
        //     return;
        // }
        // this.offer = offer;
        // this.form.update(offer);
        // this.preview?.update(this.offer);
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
        // try {
        //     this.application.set(Item.Loading, true);
        //     await OfferFetch.create(this.offer);
        // } catch (error: any) {
        //     alert(error.message);
        // } finally {
        //     this.application.set(Item.Loading, false);
        //     window.location.href = `/user?id=${currentUser._id}`;
        // }
    }
    async onUpdateButton(event) {
        event.preventDefault();
        const loading = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.Loading);
        if (loading)
            return;
        const formData = new FormData(this.form);
        this.parseFormData(formData);
        // try {
        //     this.application.set(Item.Loading, true);
        //     await OfferFetch.update(this.offer);
        // } catch (error: any) {
        //     alert(error.message);
        // } finally {
        //     this.application.set(Item.Loading, false);
        //     window.location.href = `/offer?id=${this.offer._id}`;
        // }
    }
    async onDeleteButton(event) {
        event.preventDefault();
        const loading = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.Loading);
        if (loading)
            return;
        // try {
        //     this.application.set(Item.Loading, true);
        //     await OfferFetch.delete(this.offer._id);
        // } catch (error: any) {
        //     alert(error.message);
        // } finally {
        //     this.application.set(Item.Loading, false);
        //     window.location.href = `/user?id=${this.offer.sellerID}`;
        // }
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


/***/ })

}]);
//# sourceMappingURL=src_composants_OfferForm_ts.index.js.map