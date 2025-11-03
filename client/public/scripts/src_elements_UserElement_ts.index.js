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
/* harmony import */ var _html_offer_card_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/offer-card.html */ "./src/html/offer-card.html");
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");


class UserElement extends HTMLElement {
    connectedCallback() {
        this.nameElement = this.querySelector('.user-name');
        this.bioElement = this.querySelector('.user-bio');
        this.locationElement = this.querySelector('.user-location');
        this.rateElement = this.querySelector('.user-rating');
        this.profileButton = this.querySelector('.user-profile-button');
        this.avatarElement = this.querySelector('.user-avatar');
        this.offerContainer = this.querySelector('.user-offers');
    }
    update(user) {
        const editButton = this.querySelector('.user-edit-button');
        if (editButton) {
            const currentUser = _models_Application__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().get(_models_Application__WEBPACK_IMPORTED_MODULE_1__.Item.CurrentUser);
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
                offerElement.innerHTML = _html_offer_card_html__WEBPACK_IMPORTED_MODULE_0__["default"];
                offerElement.classList.add('col');
                this.offerContainer.appendChild(offerElement);
                offerElement.update(offer);
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

/***/ "./src/html/offer-card.html":
/*!**********************************!*\
  !*** ./src/html/offer-card.html ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<a class=\"offer-lookup-button card shadow-sm\">\r\n    <img src=\"https://placehold.co/600x400\" class=\"card-img-top\" alt=\"Titre de l'objet\">\r\n    <div class=\"card-body\">\r\n        <h5 class=\"offer-title card-title text-primary\">\r\n            ?\r\n        </h5>\r\n        <p class=\"offer-description card-text\">\r\n            ?\r\n        </p>\r\n    </div>\r\n</a>");

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
//# sourceMappingURL=src_elements_UserElement_ts.index.js.map