"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_UserElement_ts"],{

/***/ "./src/elements/UserElement.ts":
/*!*************************************!*\
  !*** ./src/elements/UserElement.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserElement)
/* harmony export */ });
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/User */ "./src/models/User.ts");
/* harmony import */ var _html_offer_card_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/offer-card.html */ "./src/html/offer-card.html");
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");
/* harmony import */ var _fetches_UserFetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../fetches/UserFetch */ "./src/fetches/UserFetch.ts");




class UserElement extends HTMLElement {
    constructor() {
        super(...arguments);
        this.user = null;
    }
    async connectedCallback() {
        await customElements.whenDefined('user-element');
        const userID = this.getAttribute('user-id');
        if (!userID) {
            console.error("UserElement: missing user-id attribute");
            return;
        }
        const result = await _fetches_UserFetch__WEBPACK_IMPORTED_MODULE_3__["default"].get(userID);
        this.user = result ? _models_User__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(result) : null;
        if (!this.user) {
            console.error("UserElement: user not found");
            return;
        }
        this.nameElement = this.querySelector('.user-name');
        this.bioElement = this.querySelector('.user-bio');
        this.locationElement = this.querySelector('.user-location');
        this.rateElement = this.querySelector('.user-rating');
        this.profileButton = this.querySelector('.user-profile-button');
        this.avatarElement = this.querySelector('.user-avatar');
        this.offerContainer = this.querySelector('.user-offers');
        this.update(this.user);
    }
    update(user) {
        const editButton = this.querySelector('.user-edit-button');
        if (editButton) {
            const currentUser = _models_Application__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance().get(_models_Application__WEBPACK_IMPORTED_MODULE_2__.Item.CurrentUser);
            if (user._id === currentUser?._id) {
                editButton.style.display = 'inline-block';
                editButton.href = `/user/edit?id=${user._id}`;
            }
            else {
                editButton.style.display = 'none';
            }
        }
        if (this.nameElement)
            this.nameElement.textContent = user.name;
        if (this.bioElement)
            this.bioElement.textContent = user.bio || '...';
        if (this.locationElement)
            this.locationElement.textContent = user.location || '...';
        if (this.rateElement)
            this.rateElement.textContent = this.rateToStars(user.rating);
        if (this.profileButton)
            this.profileButton.href = `/user?id=${user._id}`;
        if (this.avatarElement)
            this.avatarElement.src = this.getAvatarUrl(user);
        if (this.offerContainer) {
            this.offerContainer.innerHTML = '';
            user.offers?.forEach(offer => {
                const offerElement = document.createElement('offer-element');
                offerElement.innerHTML = _html_offer_card_html__WEBPACK_IMPORTED_MODULE_1__["default"];
                offerElement.classList.add('col');
                this.offerContainer.appendChild(offerElement);
                offerElement.setAttribute('offer-id', offer._id);
            });
        }
    }
    getAvatarUrl(user) {
        return user.avatar || `https://placehold.co/120x120/17A2B8/ffffff?text=${user.name[0]}`;
    }
    rateToStars(rate) {
        const fullStars = Math.floor(rate);
        const halfStar = rate % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        return '⭐'.repeat(fullStars) + (halfStar ? '⭐️' : '') + '☆'.repeat(emptyStars);
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

/***/ "./src/html/offer-card.html":
/*!**********************************!*\
  !*** ./src/html/offer-card.html ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<a class=\"offer-lookup-button card shadow-sm text-decoration-none\">\r\n    <img src=\"https://placehold.co/600x400\" class=\"card-img-top\" alt=\"Titre de l'objet\">\r\n    <div class=\"card-body\">\r\n        <h5 class=\"offer-title card-title text-primary\">\r\n            ?\r\n        </h5>\r\n        <p class=\"offer-description card-text text-truncate\">\r\n            ?\r\n        </p>\r\n    </div>\r\n</a>");

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


/***/ })

}]);
//# sourceMappingURL=src_elements_UserElement_ts.index.js.map