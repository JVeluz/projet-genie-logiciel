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

class OfferElement extends HTMLElement {
    update(offer) {
        const lookupButton = this.querySelector('.offer-lookup-button');
        const titleElement = this.querySelector('.offer-title');
        const descriptionElement = this.querySelector('.offer-description');
        const categoryElement = this.querySelector('.offer-category');
        const askExchangeElement = this.querySelector('.offer-ask-exchange');
        const locationElement = this.querySelector('.offer-location');
        const sellerElement = this.querySelector('.offer-seller');
        if (locationElement && offer.location) {
            locationElement.textContent = offer.location;
        }
        if (askExchangeElement && offer.askExchange) {
            askExchangeElement.textContent = offer.askExchange;
        }
        if (categoryElement) {
            categoryElement.textContent = offer.category;
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
            lookupButton.href = `/offer?id=${offer.id}`;
        }
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


/***/ })

}]);
//# sourceMappingURL=src_elements_OfferElement_ts.index.js.map