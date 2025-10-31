/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controllers/LoginController.ts":
/*!********************************************!*\
  !*** ./src/controllers/LoginController.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginController)
/* harmony export */ });
/* harmony import */ var _core_ApplicationModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/ApplicationModel */ "./src/core/ApplicationModel.ts");
/* harmony import */ var _services_UserService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/UserService */ "./src/services/UserService.ts");


class LoginController {
    constructor(form, logoutButton = null) {
        this.form = form;
        this.logoutButton = logoutButton;
        this.model = _core_ApplicationModel__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.form.onsubmit = (event) => this.onSubmit(event);
        if (this.logoutButton) {
            this.logoutButton.onclick = (event) => this.onLogout(event);
        }
    }
    async onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        const email = formData.get("email");
        const password = formData.get("password");
        try {
            const { token, user } = await _services_UserService__WEBPACK_IMPORTED_MODULE_1__["default"].login(email, password);
            this.model.set("authToken", token);
            this.model.set("currentUser", user);
            window.location.href = "/";
        }
        catch (error) {
            alert("Mauvaise combinaison email/mot de passe.");
        }
    }
    onLogout(event) {
        event.preventDefault();
        this.model.set("currentUser", null);
        window.location.href = "/";
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
/* harmony import */ var _core_ApplicationModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/ApplicationModel */ "./src/core/ApplicationModel.ts");

class NavbarController {
    constructor(view) {
        this.view = view;
        const model = _core_ApplicationModel__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        model.addListener("currentUser", this.onModelUpdated.bind(this));
        const currentUser = model.get("currentUser");
        this.onModelUpdated(currentUser);
    }
    onModelUpdated(value) {
        this.view.update(value);
    }
}


/***/ }),

/***/ "./src/controllers/OfferController.ts":
/*!********************************************!*\
  !*** ./src/controllers/OfferController.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferController)
/* harmony export */ });
class OfferController {
    constructor(view) {
        this.view = view;
    }
    load(offerID) {
        // this.offerService.get(offerID).then((offer: Offer) => {
        //     this.view.update(offer);
        // });
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
/* harmony export */   "default": () => (/* binding */ OfferController)
/* harmony export */ });
class OfferController {
    constructor(view, offerID) {
        this.view = view;
        this.loadOffer(offerID);
    }
    async loadOffer(offerID) {
        // this.model = await this.offerService.get(offerID);
        // this.view.update(this.model);
    }
}


/***/ }),

/***/ "./src/controllers/RegisterController.ts":
/*!***********************************************!*\
  !*** ./src/controllers/RegisterController.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RegisterController)
/* harmony export */ });
/* harmony import */ var _core_ApplicationModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/ApplicationModel */ "./src/core/ApplicationModel.ts");
/* harmony import */ var _services_UserService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/UserService */ "./src/services/UserService.ts");


class RegisterController {
    constructor(form) {
        this.form = form;
        this.model = _core_ApplicationModel__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.form.onsubmit = (event) => this.onSubmit(event);
    }
    async onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        try {
            const response = await _services_UserService__WEBPACK_IMPORTED_MODULE_1__["default"].register(name, email, password);
            const { token, user } = response;
            this.model.set("currentUser", user);
            this.model.set("authToken", token);
            window.location.href = "/";
        }
        catch (error) {
            alert(error.message);
        }
    }
}


/***/ }),

/***/ "./src/controllers/SearchPageController.ts":
/*!*************************************************!*\
  !*** ./src/controllers/SearchPageController.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchPageController)
/* harmony export */ });
class SearchPageController {
    constructor(view, searchForm, filterForm) {
        this.view = view;
        this.searchForm = searchForm;
        this.filterForm = filterForm;
        this.searchForm.onsubmit = (event) => this.onSearchSubmit(event);
        this.filterForm.onsubmit = (event) => this.onSearchSubmit(event);
    }
    onSearchSubmit(event) {
        event.preventDefault();
        const search = Object.fromEntries(new FormData(this.searchForm));
        const filter = Object.fromEntries(new FormData(this.filterForm));
        const query = { search, filter };
        console.log(`onSearchSubmit(${JSON.stringify(query)})`);
        // const result = this.offerService.search(query);
        // console.log(result);
        // this.view.update(result);
    }
}


/***/ }),

/***/ "./src/controllers/UserController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/UserController.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserController)
/* harmony export */ });
class UserController {
    constructor(view) {
        this.view = view;
    }
    load(userID) {
        // this.userService.get(userID).then((user) => {
        //     this.view.update(user);
        // });
    }
}


/***/ }),

/***/ "./src/core/ApplicationModel.ts":
/*!**************************************!*\
  !*** ./src/core/ApplicationModel.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ApplicationModel {
    constructor() {
        this.listeners = {};
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new ApplicationModel();
        }
        return this.instance;
    }
    addListener(item, listener) {
        if (!this.listeners[item]) {
            this.listeners[item] = [];
        }
        this.listeners[item].push(listener);
    }
    set(item, value) {
        if (value === null) {
            localStorage.removeItem(item);
        }
        else {
            localStorage.setItem(item, JSON.stringify(value));
        }
        this.notifyListeners(item);
    }
    get(item) {
        const value = localStorage.getItem(item);
        if (value === null) {
            return null;
        }
        return JSON.parse(value);
    }
    notifyListeners(item) {
        if (this.listeners[item]) {
            for (const listener of this.listeners[item]) {
                const value = this.get(item);
                listener(value);
            }
        }
    }
}
ApplicationModel.instance = null;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApplicationModel);


/***/ }),

/***/ "./src/elements/CreateOfferPage.ts":
/*!*****************************************!*\
  !*** ./src/elements/CreateOfferPage.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateOfferPageElement)
/* harmony export */ });
/* harmony import */ var _html_create_offer_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/create-offer-page.html */ "./src/html/create-offer-page.html");

class CreateOfferPageElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_create_offer_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
    }
}


/***/ }),

/***/ "./src/elements/EditOfferPage.ts":
/*!***************************************!*\
  !*** ./src/elements/EditOfferPage.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditOfferPage)
/* harmony export */ });
/* harmony import */ var _controllers_OfferEditorController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/OfferEditorController */ "./src/controllers/OfferEditorController.ts");
/* harmony import */ var _html_offer_edit_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/offer-edit-page.html */ "./src/html/offer-edit-page.html");


class EditOfferPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_offer_edit_page_html__WEBPACK_IMPORTED_MODULE_1__["default"];
        const urlParams = new URLSearchParams(window.location.search);
        const offerID = urlParams.get('id');
        if (offerID) {
            new _controllers_OfferEditorController__WEBPACK_IMPORTED_MODULE_0__["default"](this, parseInt(offerID));
        }
    }
    update(offer) {
    }
}


/***/ }),

/***/ "./src/elements/EditUserPage.ts":
/*!**************************************!*\
  !*** ./src/elements/EditUserPage.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditUserPage)
/* harmony export */ });
/* harmony import */ var _html_user_edit_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/user-edit-page.html */ "./src/html/user-edit-page.html");
/* harmony import */ var _core_ApplicationModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/ApplicationModel */ "./src/core/ApplicationModel.ts");


class EditUserPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_user_edit_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        const currentUser = _core_ApplicationModel__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().get("currentUser");
        if (currentUser) {
            const userElement = this.querySelector('user-element');
            customElements.whenDefined('user-element').then(() => {
                userElement.update(currentUser);
            });
        }
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

/***/ "./src/elements/LoginPage.ts":
/*!***********************************!*\
  !*** ./src/elements/LoginPage.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var _html_login_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/login-page.html */ "./src/html/login-page.html");

class LoginPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_login_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
    }
}


/***/ }),

/***/ "./src/elements/NavbarElement.ts":
/*!***************************************!*\
  !*** ./src/elements/NavbarElement.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavbarElement)
/* harmony export */ });
/* harmony import */ var _controllers_LoginController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/LoginController */ "./src/controllers/LoginController.ts");
/* harmony import */ var _controllers_NavbarController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/NavbarController */ "./src/controllers/NavbarController.ts");
/* harmony import */ var _html_navbar_element_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../html/navbar-element.html */ "./src/html/navbar-element.html");



class NavbarElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_navbar_element_html__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.loginDropdown = this.querySelector('.login-dropdown');
        this.loginForm = this.querySelector('.login-form');
        this.logoutButton = this.querySelector('.logout-button');
        this.newOfferButton = this.querySelector('.new-offer-button');
        this.profileDropdown = this.querySelector('.profile-dropdown');
        this.userElement = this.querySelector('.navbar-user');
        new _controllers_NavbarController__WEBPACK_IMPORTED_MODULE_1__["default"](this);
        new _controllers_LoginController__WEBPACK_IMPORTED_MODULE_0__["default"](this.loginForm, this.logoutButton);
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
            // new UserController(sellerElement)
            //     .load(offer.sellerID);
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

/***/ "./src/elements/OfferPage.ts":
/*!***********************************!*\
  !*** ./src/elements/OfferPage.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferPage)
/* harmony export */ });
/* harmony import */ var _html_offer_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/offer-page.html */ "./src/html/offer-page.html");
/* harmony import */ var _controllers_OfferController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/OfferController */ "./src/controllers/OfferController.ts");


class OfferPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_offer_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        const urlParams = new URLSearchParams(window.location.search);
        const offerID = parseInt(urlParams.get("id"));
        const offerElement = this.querySelector("offer-element");
        new _controllers_OfferController__WEBPACK_IMPORTED_MODULE_1__["default"](offerElement)
            .load(offerID);
    }
}


/***/ }),

/***/ "./src/elements/OfferSearchPage.ts":
/*!*****************************************!*\
  !*** ./src/elements/OfferSearchPage.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferSearchPage)
/* harmony export */ });
/* harmony import */ var _html_offer_search_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/offer-search-page.html */ "./src/html/offer-search-page.html");
/* harmony import */ var _controllers_SearchPageController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/SearchPageController */ "./src/controllers/SearchPageController.ts");
/* harmony import */ var _html_offer_card_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../html/offer-card.html */ "./src/html/offer-card.html");



class OfferSearchPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_offer_search_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        this.offerContainer = this.querySelector('.offer-container');
        new _controllers_SearchPageController__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.querySelector('#search-form'), this.querySelector('#filter-form'));
    }
    update(offers) {
        this.offerContainer.innerHTML = '';
        offers.forEach(offer => {
            const offerElement = document.createElement('offer-element');
            offerElement.innerHTML = _html_offer_card_html__WEBPACK_IMPORTED_MODULE_2__["default"];
            offerElement.update(offer);
            this.offerContainer.appendChild(offerElement);
        });
    }
}


/***/ }),

/***/ "./src/elements/RegisterPage.ts":
/*!**************************************!*\
  !*** ./src/elements/RegisterPage.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RegisterPage)
/* harmony export */ });
/* harmony import */ var _controllers_RegisterController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/RegisterController */ "./src/controllers/RegisterController.ts");
/* harmony import */ var _html_register_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/register-page.html */ "./src/html/register-page.html");


class RegisterPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_register_page_html__WEBPACK_IMPORTED_MODULE_1__["default"];
        new _controllers_RegisterController__WEBPACK_IMPORTED_MODULE_0__["default"](this.querySelector(".register-form"));
    }
}


/***/ }),

/***/ "./src/elements/UserElement.ts":
/*!*************************************!*\
  !*** ./src/elements/UserElement.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserElement)
/* harmony export */ });
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
        if (this.nameElement)
            this.nameElement.textContent = user.name;
        if (this.bioElement)
            this.bioElement.textContent = user.bio || '?';
        if (this.locationElement)
            this.locationElement.textContent = user.location || '?';
        if (this.rateElement)
            this.rateElement.textContent = this.rateToStars(user.rating);
        if (this.profileButton)
            this.profileButton.href = `/user?id=${user.id}`;
        if (this.avatarElement)
            this.avatarElement.src = this.getAvatarUrl(user);
        if (this.offerContainer) {
            this.offerContainer.innerHTML = '';
            user.offers?.forEach(offer => {
                const offerElement = document.createElement('offer-element');
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


class UserPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_user_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        const urlParams = new URLSearchParams(window.location.search);
        const userID = parseInt(urlParams.get("id"));
        const userElement = this.querySelector(".page-user");
        new _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__["default"](userElement)
            .load(userID);
    }
}


/***/ }),

/***/ "./src/html/create-offer-page.html":
/*!*****************************************!*\
  !*** ./src/html/create-offer-page.html ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La navbar est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Contenu Principal -->\r\n<main class=\"container py-5\">\r\n    <!-- Passage à une structure en 2 colonnes avec espacement g-5 -->\r\n    <div class=\"row g-5 justify-content-center\">\r\n\r\n        <!-- COLONNE 1: FORMULAIRE DE CRÉATION -->\r\n        <div class=\"col-12 col-lg-7\">\r\n\r\n            <h2 class=\"text-center fw-bold text-primary mb-4\">Créer une nouvelle annonce</h2>\r\n\r\n            <!-- Carte principale contenant le formulaire -->\r\n            <div class=\"card shadow-lg border-0\">\r\n                <div class=\"card-body p-4 p-md-5\">\r\n\r\n                    <!-- Formulaire de création d'annonce -->\r\n                    <form>\r\n\r\n                        <!-- Champ Titre (ID ajouté) -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"create-title\" class=\"form-label fw-bold\">Titre de l'annonce</label>\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Ex: Tondeuse à gazon\" required\r\n                                id=\"create-title\">\r\n                        </div>\r\n\r\n                        <div class=\"row\">\r\n                            <!-- Champ Catégorie (ID ajouté) -->\r\n                            <div class=\"col-md-6 mb-3\">\r\n                                <label for=\"create-category\" class=\"form-label fw-bold\">Catégorie</label>\r\n                                <select class=\"form-select\" required id=\"create-category\">\r\n                                    <option value=\"\" selected disabled>Choisir...</option>\r\n                                    <option value=\"Jardinage\">Jardinage</option>\r\n                                    <option value=\"Informatique\">Informatique</option>\r\n                                    <option value=\"Bricolage\">Bricolage</option>\r\n                                    <option value=\"Services\">Services</option>\r\n                                    <option value=\"Autre\">Autre</option>\r\n                                </select>\r\n                            </div>\r\n                            <!-- Champ Type d'offre (ID ajouté) -->\r\n                            <div class=\"col-md-6 mb-3\">\r\n                                <label for=\"create-type\" class=\"form-label fw-bold\">Type d'offre</label>\r\n                                <select class=\"form-select\" required id=\"create-type\">\r\n                                    <option value=\"\" selected disabled>Choisir...</option>\r\n                                    <option value=\"Prêt d'Objet\">Prêt d'Objet</option>\r\n                                    <option value=\"Offre de Compétence\">Offre de Compétence</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Champ Description (ID ajouté) -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"create-description\" class=\"form-label fw-bold\">Description</label>\r\n                            <textarea class=\"form-control\" rows=\"5\" placeholder=\"Décrivez ce que vous proposez...\"\r\n                                required id=\"create-description\"></textarea>\r\n                        </div>\r\n\r\n                        <!-- Champ \"En échange de...\" (ID ajouté) -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"create-exchange\" class=\"form-label fw-bold\">Ce que vous recherchez en\r\n                                échange</label>\r\n                            <textarea class=\"form-control\" rows=\"3\" placeholder=\"Ex: Un cours de cuisine...\" required\r\n                                id=\"create-exchange\"></textarea>\r\n                        </div>\r\n\r\n                        <!-- Champ Localisation (ID ajouté) -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"create-location\" class=\"form-label fw-bold\">Localisation</label>\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Ex: Pau, 64000\" required\r\n                                id=\"create-location\">\r\n                        </div>\r\n\r\n                        <!-- Champ Images (ID ajouté) -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"create-images\" class=\"form-label fw-bold\">Ajouter des photos</label>\r\n                            <input class=\"form-control\" type=\"file\" accept=\"image/*\" id=\"create-images\">\r\n                            <div class=\"form-text\">La première image sera utilisée pour l'aperçu.</div>\r\n                        </div>\r\n\r\n                        <hr class=\"my-4\">\r\n\r\n                        <!-- Boutons d'action -->\r\n                        <div class=\"d-grid gap-2 d-md-flex justify-content-md-end\">\r\n                            <a href=\"/\" class=\"btn btn-outline-secondary me-md-2\">Annuler</a>\r\n                            <button type=\"submit\" class=\"btn btn-primary btn-lg\">\r\n                                <i class=\"bi bi-send-fill me-2\"></i>Publier l'annonce\r\n                            </button>\r\n                        </div>\r\n\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div> <!-- Fin de la colonne formulaire -->\r\n\r\n        <!-- COLONNE 2: APERÇU DE L'OFFRE -->\r\n        <div class=\"col-12 col-lg-5\">\r\n            <div class=\"sticky-top\" style=\"top: 5rem;\">\r\n                <h4 class=\"text-center text-primary mb-4\">Aperçu de l'annonce</h4>\r\n\r\n                <!-- Carte d'aperçu (style inspiré de la page de détail) -->\r\n                <div class=\"card shadow-lg border-0\">\r\n                    <!-- Image d'aperçu (ID ajouté) -->\r\n                    <img src=\"https://placehold.co/800x450/eee/ccc?text=Image+de+l'annonce\" class=\"card-img-top\"\r\n                        alt=\"Aperçu\" id=\"preview-card-image\">\r\n\r\n                    <div class=\"card-body p-4\">\r\n                        <!-- Titre (ID ajouté) -->\r\n                        <h3 class=\"card-title fw-bolder\" id=\"preview-title\">Titre de votre annonce</h3>\r\n\r\n                        <!-- Badges (ID ajoutés) -->\r\n                        <div>\r\n                            <span class=\"badge bg-primary text-uppercase me-2\" id=\"preview-category\">Catégorie</span>\r\n                            <span class=\"badge bg-warning text-dark text-uppercase\" id=\"preview-type\">Type</span>\r\n                        </div>\r\n\r\n                        <hr>\r\n\r\n                        <!-- Description (ID ajouté) -->\r\n                        <p class=\"card-text text-muted\" id=\"preview-description\">Votre description apparaîtra ici...</p>\r\n\r\n                        <h6 class=\"text-secondary mt-4\">Échange souhaité :</h6>\r\n                        <!-- Échange (ID ajouté) -->\r\n                        <p class=\"card-text fst-italic\" id=\"preview-exchange\">Ce que vous recherchez en échange...</p>\r\n\r\n                        <h6 class=\"text-secondary mt-4\">Localisation :</h6>\r\n                        <!-- Localisation (ID ajouté) -->\r\n                        <p class=\"card-text fw-bold\" id=\"preview-location\">\r\n                            <i class=\"bi bi-geo-alt-fill text-danger me-2\"></i>Votre localisation...\r\n                        </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div> <!-- Fin de la colonne aperçu -->\r\n    </div>\r\n</main>");

/***/ }),

/***/ "./src/html/login-page.html":
/*!**********************************!*\
  !*** ./src/html/login-page.html ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<navbar-element></navbar-element>\r\n\r\n<div class=\"pt-4\"></div>\r\n\r\n<main class=\"container main-container d-flex align-items-center justify-content-center py-5\">\r\n    <div class=\"col-12 col-md-8 col-lg-5 col-xl-4\">\r\n        <div class=\"card shadow-lg border-0 rounded-3\">\r\n            <div class=\"card-body p-4 p-md-5\">\r\n\r\n                <h2 class=\"card-title text-center fw-bold text-primary mb-4\">Connexion</h2>\r\n\r\n                <form is=\"login-element\">\r\n                    <!-- Champ Email -->\r\n                    <div class=\"form-floating mb-3\">\r\n                        <input type=\"email\" class=\"form-control\" name=\"email\" id=\"floatingEmail\"\r\n                            placeholder=\"votre.email@exemple.com\" required>\r\n                        <label for=\"floatingEmail\">Adresse Email</label>\r\n                    </div>\r\n\r\n                    <!-- Champ Mot de passe -->\r\n                    <div class=\"form-floating mb-3\">\r\n                        <input type=\"password\" class=\"form-control\" name=\"password\" id=\"floatingPassword\"\r\n                            placeholder=\"Mot de passe\" required>\r\n                        <label for=\"floatingPassword\">Mot de passe</label>\r\n                    </div>\r\n\r\n                    <!-- Bouton de Soumission -->\r\n                    <div class=\"d-grid mb-3\">\r\n                        <button class=\"btn btn-primary btn-lg fw-bold\" type=\"submit\">Se connecter</button>\r\n                    </div>\r\n\r\n                    <!-- Lien vers l'inscription -->\r\n                    <div class=\"text-center\">\r\n                        <small class=\"text-muted\">Pas encore de compte ? <a href=\"/register\"\r\n                                class=\"fw-bold text-primary\">S'inscrire</a></small>\r\n                    </div>\r\n                </form>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</main>");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<nav class=\"sticky-top navbar navbar-expand-lg bg-body-tertiary shadow-sm\">\r\n    <div class=\"container-xxl\">\r\n        <!-- Logo/Marque -->\r\n        <a class=\"navbar-brand fw-bold text-primary\" href=\"/\">\r\n            LesBonBails\r\n        </a>\r\n\r\n        <!-- Toggler pour mobile -->\r\n        <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navContent\"\r\n            aria-controls=\"navContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n            <span class=\"navbar-toggler-icon\"></span>\r\n        </button>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"navContent\">\r\n            <ul class=\"navbar-nav ms-auto mb-2 mb-lg-0 align-items-center\">\r\n\r\n                <!-- 1. Bouton \"Nouveau Bon Bail\" -->\r\n                <li class=\"nav-item me-2\">\r\n                    <a href=\"/offer/edit\" class=\"new-offer-button btn btn-outline-success\">\r\n                        Nouveau Bon Bail\r\n                    </a>\r\n                </li>\r\n\r\n                <!-- 2. Bloc Déconnecté (Dropdown Connexion) -->\r\n                <li class=\"login-dropdown nav-item dropdown me-2\">\r\n                    <button class=\"btn btn-outline-primary\" role=\"button\" data-bs-toggle=\"dropdown\"\r\n                        data-bs-auto-close=\"outside\" aria-expanded=\"false\">\r\n                        Connexion\r\n                    </button>\r\n\r\n                    <div class=\"dropdown-menu dropdown-menu-end p-3 shadow border-0\" style=\"min-width: 220px;\">\r\n                        <form class=\"login-form\">\r\n                            <div class=\"mb-2\">\r\n                                <input name=\"email\" type=\"email\" class=\"form-control form-control-sm\"\r\n                                    placeholder=\"Email\" required>\r\n                            </div>\r\n                            <div class=\"mb-3\">\r\n                                <input name=\"password\" type=\"password\" class=\"form-control form-control-sm\"\r\n                                    placeholder=\"Mot de passe\" required>\r\n                            </div>\r\n\r\n                            <button type=\"submit\" class=\"btn btn-primary w-100 btn-sm mb-2\">Se connecter</button>\r\n                            <a href=\"/register\" class=\"btn btn-secondary w-100 btn-sm\">S'enregistrer</a>\r\n                        </form>\r\n                    </div>\r\n                </li>\r\n\r\n                <!-- 3. Bloc Connecté (Dropdown Profil) -->\r\n                <li class=\"profile-dropdown nav-item dropdown d-flex align-items-center\">\r\n                    <a class=\"nav-link dropdown-toggle p-0\" href=\"#\" role=\"button\" data-bs-toggle=\"dropdown\"\r\n                        aria-expanded=\"false\">\r\n                        <user-element class=\"navbar-user\">\r\n                            <img src=\"https://placehold.co/32x32/17A2B8/ffffff?text=?\" width=\"32\" height=\"32\"\r\n                                alt=\"Profil\" class=\"user-avatar rounded-circle border border-2 border-primary\">\r\n                        </user-element>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu dropdown-menu-end shadow border-0\">\r\n                        <li><a href=\"/user\" class=\"user-profile-button dropdown-item\">\r\n                                Profil\r\n                            </a></li>\r\n                        <li><button class=\"logout-button dropdown-item text-danger\" type=\"button\">Déconnexion</button>\r\n                        </li>\r\n                    </ul>\r\n                </li>\r\n\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>");

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

/***/ "./src/html/offer-edit-page.html":
/*!***************************************!*\
  !*** ./src/html/offer-edit-page.html ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La navbar est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Contenu Principal -->\r\n<main class=\"container py-5\">\r\n    <div class=\"row justify-content-center\">\r\n        <div class=\"col-12 col-lg-8\">\r\n\r\n            <h2 class=\"text-center fw-bold text-primary mb-4\">Modifier votre annonce</h2>\r\n\r\n            <!-- Carte principale contenant le formulaire -->\r\n            <div class=\"card shadow-lg border-0\">\r\n                <div class=\"card-body p-4 p-md-5\">\r\n\r\n                    <form id=\"edit-offer-form\">\r\n\r\n                        <!-- Champ Titre -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"offer-title\" class=\"form-label fw-bold\">Titre de l'annonce</label>\r\n                            <input type=\"text\" class=\"form-control\" id=\"offer-title\"\r\n                                value=\"Tondeuse à Gazon Thermique Puissante\" required>\r\n                        </div>\r\n\r\n                        <!-- Ligne pour Catégorie et Type -->\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-6 mb-3\">\r\n                                <label for=\"offer-category\" class=\"form-label fw-bold\">Catégorie</label>\r\n                                <select class=\"form-select\" id=\"offer-category\" required>\r\n                                    <option value=\"jardinage\" selected>Jardinage</option>\r\n                                    <option value=\"bricolage\">Bricolage</option>\r\n                                    <option value=\"services\">Services</option>\r\n                                    <option value=\"maison\">Maison</option>\r\n                                </select>\r\n                            </div>\r\n                            <div class=\"col-md-6 mb-3\">\r\n                                <label for=\"offer-type\" class=\"form-label fw-bold\">Type d'offre</label>\r\n                                <select class=\"form-select\" id=\"offer-type\" required>\r\n                                    <option value=\"objet\" selected>Objet à Prêter</option>\r\n                                    <option value=\"competence\">Compétence</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Champ Description -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"offer-description\" class=\"form-label fw-bold\">Description</label>\r\n                            <textarea class=\"form-control\" id=\"offer-description\" rows=\"4\"\r\n                                required>Tondeuse de marque XYZ, bien entretenue. Idéale pour les grandes surfaces...</textarea>\r\n                        </div>\r\n\r\n                        <!-- Champ \"En échange de\" -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"offer-ask\" class=\"form-label fw-bold\">Ce que vous demandez en échange</label>\r\n                            <textarea class=\"form-control\" id=\"offer-ask\" rows=\"3\"\r\n                                required>Je souhaite l'échanger contre un cours d'initiation à la programmation...</textarea>\r\n                        </div>\r\n\r\n                        <!-- Champ Localisation -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"offer-location\" class=\"form-label fw-bold\">Localisation</label>\r\n                            <input type=\"text\" class=\"form-control\" id=\"offer-location\" value=\"Pau\" required>\r\n                        </div>\r\n\r\n                        <!-- Champ Gestion des Images -->\r\n                        <div class=\"mb-3\">\r\n                            <label class=\"form-label fw-bold\">Images actuelles</label>\r\n                            <!-- Simulation des images existantes -->\r\n                            <div>\r\n                                <img src=\"https://placehold.co/100x75/33A366/ffffff?text=Img+1\"\r\n                                    class=\"img-thumbnail me-2\" alt=\"Image 1\">\r\n                                <img src=\"https://placehold.co/100x75/33A366/ffffff?text=Img+2\" class=\"img-thumbnail\"\r\n                                    alt=\"Image 2\">\r\n                            </div>\r\n                            <label for=\"offer-images\" class=\"form-label mt-3\">Ajouter ou remplacer des images</label>\r\n                            <input class=\"form-control\" type=\"file\" id=\"offer-images\" multiple>\r\n                        </div>\r\n\r\n                        <hr class=\"my-4\">\r\n\r\n                        <!-- Boutons d'action -->\r\n                        <div class=\"d-flex flex-wrap justify-content-between align-items-center\">\r\n                            <!-- Bouton Enregistrer -->\r\n                            <button type=\"submit\" class=\"btn btn-primary btn-lg mb-2\">\r\n                                <i class=\"bi bi-check-circle me-2\"></i>Enregistrer\r\n                            </button>\r\n\r\n                            <!-- Bouton Annuler -->\r\n                            <a href=\"/profile\" class=\"btn btn-outline-secondary mb-2\">\r\n                                Annuler\r\n                            </a>\r\n\r\n                            <!-- Bouton Supprimer (ouvre le modal) -->\r\n                            <button type=\"button\" class=\"btn btn-outline-danger mb-2\" data-bs-toggle=\"modal\"\r\n                                data-bs-target=\"#deleteModal\">\r\n                                <i class=\"bi bi-trash me-2\"></i>Supprimer l'annonce\r\n                            </button>\r\n                        </div>\r\n\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</main>");

/***/ }),

/***/ "./src/html/offer-page.html":
/*!**********************************!*\
  !*** ./src/html/offer-page.html ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La barre de navigation est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Petit espacement vertical sous la navbar -->\r\n<div class=\"pt-4\"></div>\r\n\r\n<!-- Conteneur principal de la page -->\r\n<main class=\"container py-4\">\r\n\r\n    <offer-element>\r\n\r\n        <!-- Grille Bootstrap principale. g-5 ajoute un large espacement (gutter) entre les colonnes -->\r\n        <div class=\"row g-5\">\r\n\r\n            <!-- SECTION GAUCHE (Contenu principal de l'annonce) - 8 colonnes sur grand écran -->\r\n            <section class=\"col-lg-8\">\r\n\r\n                <!-- Titre de l'annonce -->\r\n                <h1 class=\"offer-title fw-bolder mb-2\">Tondeuse à Gazon Thermique Puissante</h1>\r\n\r\n                <!-- Badges pour la catégorie et le type d'offre -->\r\n                <div class=\"mb-4\">\r\n                    <span class=\"offer-category badge bg-primary text-uppercase me-2\">\r\n                        ?\r\n                    </span>\r\n                </div>\r\n\r\n                <!-- Carousel (diaporama d'images) de l'annonce -->\r\n                <div class=\"carousel slide mb-5\" data-bs-ride=\"carousel\" id=\"offer-carousel\">\r\n                    <!-- Indicateurs (les petits points en bas) -->\r\n                    <div class=\"carousel-indicators\">\r\n                        <button type=\"button\" data-bs-target=\"#offer-carousel\" data-bs-slide-to=\"0\" class=\"active\"\r\n                            aria-current=\"true\" aria-label=\"Slide 1\"></button>\r\n                        <button type=\"button\" data-bs-target=\"#offer-carousel\" data-bs-slide-to=\"1\"\r\n                            aria-label=\"Slide 2\"></button>\r\n                    </div>\r\n\r\n                    <!-- Conteneur pour les images (slides) -->\r\n                    <div id=\"offer-image-container\" class=\"carousel-inner rounded-3 shadow-lg\">\r\n                        <!-- Slide 1 (active = visible au chargement) -->\r\n                        <div class=\"carousel-item active\">\r\n                            <img src=\"https://placehold.co/800x450/33A366/ffffff?text=Image+1\" class=\"d-block w-100\"\r\n                                alt=\"Image 1 de l'annonce\">\r\n                        </div>\r\n                        <!-- Slide 2 -->\r\n                        <div class=\"carousel-item\">\r\n                            <img src=\"https://placehold.co/800x450/33A366/ffffff?text=Image+2\" class=\"d-block w-100\"\r\n                                alt=\"Image 2 de l'annonce\">\r\n                        </div>\r\n                    </div>\r\n\r\n                    <!-- Contrôles (flèches) Précédent/Suivant -->\r\n                    <button class=\"carousel-control-prev\" type=\"button\" data-bs-target=\"#offer-carousel\"\r\n                        data-bs-slide=\"prev\">\r\n                        <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n                        <span class=\"visually-hidden\">Précédent</span>\r\n                    </button>\r\n                    <button class=\"carousel-control-next\" type=\"button\" data-bs-target=\"#offer-carousel\"\r\n                        data-bs-slide=\"next\">\r\n                        <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n                        <span class=\"visually-hidden\">Suivant</span>\r\n                    </button>\r\n                </div>\r\n\r\n                <!-- Section Description -->\r\n                <h3 class=\"border-bottom pb-2 mb-3 text-secondary\">Description de l'Offre</h3>\r\n                <p class=\"offer-description lead text-muted\">\r\n                    <!-- ? = Emplacement pour la description dynamique -->\r\n                    ?\r\n                </p>\r\n\r\n                <!-- Section \"En échange de\" -->\r\n                <h3 class=\"border-bottom pb-2 mb-3 mt-5 text-secondary\">Ce qui est demandé en Échange</h3>\r\n                <!-- Carte stylisée pour mettre en avant la demande -->\r\n                <div id=\"offer-ask-exchange\" class=\"card border-warning mb-4\">\r\n                    <div class=\"card-body\">\r\n                        <i class=\"bi bi-info-circle-fill text-warning me-2\"></i>\r\n                        <!-- ? = Emplacement pour la demande d'échange dynamique -->\r\n                        ?\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- Section Localisation -->\r\n                <h3 class=\"border-bottom pb-2 mb-3 mt-5 text-secondary\">Localisation</h3>\r\n                <p class=\"user-location mb-5\">\r\n                    <i class=\"bi bi-geo-alt-fill text-danger me-2\"></i>\r\n                    <!-- ? = Emplacement pour la localisation dynamique -->\r\n                    ?\r\n                </p>\r\n            </section>\r\n\r\n            <!-- SECTION DROITE (Barre latérale) - 4 colonnes sur grand écran -->\r\n            <aside class=\"col-lg-4\">\r\n\r\n                <!-- Carte \"Propriétaire\" -->\r\n                <div class=\"card mb-4 shadow-lg text-center p-3\">\r\n                    <div class=\"card-body\">\r\n                        <h4 class=\"card-title text-primary mb-3\">Le Propriétaire</h4>\r\n\r\n                        <!-- Composant personnalisé pour les infos utilisateur -->\r\n                        <user-element class=\"offer-seller\">\r\n                            <!-- Avatar -->\r\n                            <img alt=\"Vendeur\" width=\"80\" height=\"80\"\r\n                                class=\"user-avatar rounded-circle mb-3 border border-3 border-primary shadow\">\r\n\r\n                            <!-- Nom (dynamique) -->\r\n                            <h5 class=\"user-name fw-bold mb-1\">\r\n                                ?\r\n                            </h5>\r\n                            <!-- Note (dynamique) -->\r\n                            <p class=\"user-rating mb-3 text-warning\">\r\n                                ?\r\n                            </p>\r\n                            <!-- Lien vers le profil -->\r\n                            <a class=\"user-profile-button btn btn-outline-primary w-100 mt-2\">Voir le Profil</a>\r\n                        </user-element>\r\n\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- Carte \"Proposer un Échange\" (Formulaire) -->\r\n                <div class=\"card shadow-lg border-success\">\r\n                    <div class=\"card-header bg-success text-white fw-bold\">\r\n                        Proposer un Échange\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                        <form>\r\n                            <!-- Champ: Contre-proposition -->\r\n                            <div class=\"mb-3\">\r\n                                <label for=\"proposition-text\" class=\"form-label fw-bold\">Votre Contre-Proposition <span\r\n                                        class=\"text-danger\">*</span></label>\r\n                                <textarea id=\"proposition-text\" class=\"form-control\" rows=\"3\" required\r\n                                    placeholder=\"Ex: Je vous offre une heure de cours de cuisine...\"></textarea>\r\n                            </div>\r\n                            <!-- Champ: Disponibilité -->\r\n                            <div class=\"mb-3\">\r\n                                <label for=\"disponibility-input\" class=\"form-label fw-bold\">Votre Disponibilité <span\r\n                                        class=\"text-danger\">*</span></label>\r\n                                <input id=\"disponibility-input\" type=\"text\" class=\"form-control\" required\r\n                                    placeholder=\"Ex: Disponible le 15/11 ou tous les weekends.\">\r\n                            </div>\r\n                            <!-- Bouton d'envoi -->\r\n                            <button type=\"submit\" class=\"btn btn-success w-100 btn-lg mt-2\">Envoyer la Demande</button>\r\n                            <p class=\"mt-3 text-center\"><small class=\"text-muted\">Vous recevrez une notification après\r\n                                    acceptation.</small></p>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </aside>\r\n        </div>\r\n    </offer-element>\r\n</main>");

/***/ }),

/***/ "./src/html/offer-search-page.html":
/*!*****************************************!*\
  !*** ./src/html/offer-search-page.html ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<navbar-element></navbar-element>\r\n\r\n<div class=\"pt-4\"></div>\r\n\r\n<main class=\"container\">\r\n    <div class=\"row\">\r\n        <aside class=\"col-lg-3 mb-4\">\r\n\r\n            <div class=\"card border-0 shadow-sm\">\r\n                <div class=\"card-header bg-primary text-white fw-bold\">\r\n                    Filtres de Recherche\r\n                </div>\r\n                <div class=\"card-body\">\r\n\r\n                    <form id=\"filter-form\">\r\n                        <h6 class=\"card-title text-muted mb-3\">Catégorie</h6>\r\n                        <div class=\"form-check mb-2\">\r\n                            <input checked name=\"enable-objects\" class=\"form-check-input\" type=\"checkbox\"\r\n                                id=\"filter-objects\" value=\"true\">\r\n                            <label class=\"form-check-label\" for=\"filter-objects\">Objets</label>\r\n                        </div>\r\n                        <div class=\"form-check\">\r\n                            <input checked name=\"enable-skills\" class=\"form-check-input\" type=\"checkbox\"\r\n                                id=\"filter-skills\" value=\"true\">\r\n                            <label class=\"form-check-label\" for=\"filter-skills\">Compétences</label>\r\n                        </div>\r\n\r\n                        <hr class=\"my-3\">\r\n\r\n                        <h6 class=\"card-title text-muted mb-3\">Localisation</h6>\r\n                        <input name=\"location\" type=\"text\" class=\"form-control\" placeholder=\"Ville ou code postal\"\r\n                            aria-label=\"Localisation\">\r\n\r\n                        <hr class=\"my-3\">\r\n\r\n                        <button class=\"btn btn-primary w-100 mt-2\" type=\"submit\">Appliquer les filtres</button>\r\n                    </form>\r\n\r\n                </div>\r\n            </div>\r\n\r\n        </aside>\r\n\r\n        <section class=\"col-lg-9\">\r\n\r\n            <form id=\"search-form\" class=\"mb-4\">\r\n                <div class=\"input-group input-group-lg shadow-sm\">\r\n                    <input name=\"input\" class=\"form-control border-end-0\"\r\n                        placeholder=\"Rechercher des objets ou des compétences...\" aria-label=\"Rechercher\">\r\n                    <button class=\"btn btn-warning\" type=\"submit\" aria-label=\"Lancer la recherche\">\r\n                        <i class=\"bi bi-search\"></i>\r\n                    </button>\r\n                </div>\r\n            </form>\r\n\r\n            <h2 class=\"mb-3\">Annonces Disponibles</h2>\r\n\r\n            <div class=\"offer-container row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4\">\r\n            </div>\r\n\r\n        </section>\r\n    </div>\r\n</main>");

/***/ }),

/***/ "./src/html/register-page.html":
/*!*************************************!*\
  !*** ./src/html/register-page.html ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<navbar-element></navbar-element>\r\n\r\n<div class=\"pt-4\"></div>\r\n\r\n<main class=\"container main-container d-flex align-items-center justify-content-center py-5\">\r\n    <div class=\"col-12 col-md-8 col-lg-5 col-xl-4\">\r\n        <div class=\"card shadow-lg border-0 rounded-3\">\r\n            <div class=\"card-body p-4 p-md-5\">\r\n\r\n                <h2 class=\"card-title text-center fw-bold text-primary mb-4\">Créer un compte</h2>\r\n\r\n                <form class=\"register-form\">\r\n                    <!-- Champ Nom -->\r\n                    <div class=\"form-floating mb-3\">\r\n                        <input name=\"name\" type=\"text\" class=\"form-control\" id=\"floatingName\" placeholder=\"Votre nom\"\r\n                            required>\r\n                        <label for=\"floatingName\">Votre Nom</label>\r\n                    </div>\r\n\r\n                    <!-- Champ Email -->\r\n                    <div class=\"form-floating mb-3\">\r\n                        <input type=\"email\" class=\"form-control\" name=\"email\" id=\"floatingEmail\"\r\n                            placeholder=\"votre.email@exemple.com\" required>\r\n                        <label for=\"floatingEmail\">Adresse Email</label>\r\n                    </div>\r\n\r\n                    <!-- Champ Mot de passe -->\r\n                    <div class=\"form-floating mb-3\">\r\n                        <input type=\"password\" class=\"form-control\" name=\"password\" id=\"floatingPassword\"\r\n                            placeholder=\"Mot de passe\" required>\r\n                        <label for=\"floatingPassword\">Mot de passe</label>\r\n                    </div>\r\n\r\n                    <!-- Bouton de Soumission -->\r\n                    <div class=\"d-grid mb-3\">\r\n                        <button class=\"btn btn-primary btn-lg fw-bold\" type=\"submit\">S'inscrire</button>\r\n                    </div>\r\n\r\n                    <!-- Lien vers la connexion -->\r\n                    <div class=\"text-center\">\r\n                        <small class=\"text-muted\">Déjà un compte ? <a href=\"/login\" class=\"fw-bold text-primary\">Se\r\n                                connecter</a></small>\r\n                    </div>\r\n                </form>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</main>");

/***/ }),

/***/ "./src/html/user-edit-page.html":
/*!**************************************!*\
  !*** ./src/html/user-edit-page.html ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La navbar est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Contenu Principal -->\r\n<main class=\"container py-5\">\r\n    <!-- Changement de la structure en 2 colonnes avec g-5 pour l'espacement -->\r\n    <div class=\"row g-5 justify-content-center\">\r\n\r\n        <!-- COLONNE 1: FORMULAIRE D'ÉDITION -->\r\n        <div class=\"col-12 col-lg-7\">\r\n\r\n            <h2 class=\"text-center fw-bold text-primary mb-4\">Modifier votre profil</h2>\r\n\r\n            <!-- Carte principale contenant le formulaire -->\r\n            <div class=\"card shadow-lg border-0\">\r\n                <div class=\"card-body p-4 p-md-5\">\r\n\r\n                    <form>\r\n\r\n                        <!-- Champ Avatar -->\r\n                        <div class=\"mb-3 text-center\">\r\n                            <label for=\"edit-avatar\" class=\"form-label fw-bold\">Photo de profil</label>\r\n                            <div>\r\n                                <img src=\"https://placehold.co/120x120/17A2B8/ffffff?text=U\"\r\n                                    class=\"img-thumbnail rounded-circle mb-3\" alt=\"Avatar actuel\" width=\"120\"\r\n                                    height=\"120\">\r\n                            </div>\r\n                            <!-- ID ajouté pour le script -->\r\n                            <input class=\"form-control\" type=\"file\" accept=\"image/*\" id=\"edit-avatar\">\r\n                        </div>\r\n\r\n                        <!-- Champ Nom -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"edit-name\" class=\"form-label fw-bold\">Votre Nom</label>\r\n                            <!-- ID ajouté pour le script -->\r\n                            <input type=\"text\" class=\"form-control\" value=\"Alice Dubois\" required id=\"edit-name\">\r\n                        </div>\r\n\r\n                        <!-- Champ Email -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"edit-email\" class=\"form-label fw-bold\">Adresse Email</label>\r\n                            <!-- ID ajouté pour le script -->\r\n                            <input type=\"email\" class=\"form-control\" value=\"alice.dubois@exemple.com\" required\r\n                                id=\"edit-email\">\r\n                        </div>\r\n\r\n                        <!-- Champ Biographie -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"edit-bio\" class=\"form-label fw-bold\">Ma biographie</label>\r\n                            <!-- ID ajouté pour le script -->\r\n                            <textarea class=\"form-control\" rows=\"4\"\r\n                                id=\"edit-bio\">J'aime le jardinage et les échanges de services.</textarea>\r\n                        </div>\r\n\r\n                        <hr class=\"my-4\">\r\n\r\n                        <!-- Boutons d'action -->\r\n                        <div class=\"d-flex flex-wrap justify-content-between align-items-center\">\r\n                            <button type=\"submit\" class=\"btn btn-primary btn-lg mb-2\">\r\n                                <i class=\"bi bi-check-circle me-2\"></i>Enregistrer\r\n                            </button>\r\n                            <a href=\"/profile\" class=\"btn btn-outline-secondary mb-2\">\r\n                                Annuler\r\n                            </a>\r\n                            <button type=\"button\" class=\"btn btn-outline-danger mb-2\" data-bs-toggle=\"modal\"\r\n                                data-bs-target=\"#deleteUserModal\">\r\n                                <i class=\"bi bi-trash me-2\"></i>Supprimer le compte\r\n                            </button>\r\n                        </div>\r\n\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div> <!-- Fin de la colonne formulaire -->\r\n\r\n        <!-- COLONNE 2: APERÇU DE LA CARTE -->\r\n        <div class=\"col-12 col-lg-5\">\r\n            <!-- sticky-top garde l'aperçu visible pendant le scroll -->\r\n            <div class=\"sticky-top\" style=\"top: 5rem;\">\r\n                <h4 class=\"text-center text-primary mb-4\">Aperçu de la carte</h4>\r\n\r\n                <!-- Carte d'aperçu -->\r\n                <div class=\"card shadow-lg text-center p-3\">\r\n                    <div class=\"card-body\">\r\n\r\n                        <user-element>\r\n                            <img src=\"https://placehold.co/120x120/17A2B8/ffffff?text=U\" alt=\"Aperçu Avatar\" width=\"120\"\r\n                                height=\"120\"\r\n                                class=\"user-avatar rounded-circle mb-3 border border-3 border-primary shadow\">\r\n\r\n                            <h5 class=\"user-name fw-bold mb-1\">\r\n                                ?\r\n                            </h5>\r\n\r\n                            <p class=\"user-bio text-muted fst-italic\">\r\n                                ?\r\n                            </p>\r\n\r\n                            <p class=\"user-rating mb-3 text-warning\">⭐⭐⭐⭐⭐ <small class=\"text-muted\">(Aperçu)</small>\r\n                            </p>\r\n\r\n                            <a href=\"#\" class=\"btn btn-outline-primary w-100 mt-2 disabled\" tabindex=\"-1\"\r\n                                aria-disabled=\"true\">\r\n                                Voir le Profil\r\n                            </a>\r\n                        </user-element>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div> <!-- Fin de la colonne aperçu -->\r\n\r\n    </div>\r\n</main>\r\n\r\n<!-- Modal de Confirmation de Suppression de Compte (Inchangé) -->\r\n<div class=\"modal fade\" id=\"deleteUserModal\" tabindex=\"-1\" aria-labelledby=\"deleteUserModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-dialog-centered\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h5 class=\"modal-title text-danger\" id=\"deleteUserModalLabel\">\r\n                    <i class=\"bi bi-exclamation-triangle-fill me-2\"></i>Confirmer la suppression du compte\r\n                </h5>\r\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                Êtes-vous sûr de vouloir supprimer votre compte ? <br>\r\n                Toutes vos annonces et informations seront définitivement perdues.\r\n                <br><strong>Cette action est irréversible.</strong>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Annuler</button>\r\n                <button type=\"button\" class=\"btn btn-danger\">Oui, supprimer mon compte</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

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

/***/ "./src/loader.ts":
/*!***********************!*\
  !*** ./src/loader.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elements_OfferSearchPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements/OfferSearchPage */ "./src/elements/OfferSearchPage.ts");
/* harmony import */ var _elements_LoginPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements/LoginPage */ "./src/elements/LoginPage.ts");
/* harmony import */ var _elements_RegisterPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elements/RegisterPage */ "./src/elements/RegisterPage.ts");
/* harmony import */ var _elements_OfferPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./elements/OfferPage */ "./src/elements/OfferPage.ts");
/* harmony import */ var _elements_UserPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./elements/UserPage */ "./src/elements/UserPage.ts");
/* harmony import */ var _elements_CreateOfferPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./elements/CreateOfferPage */ "./src/elements/CreateOfferPage.ts");
/* harmony import */ var _elements_EditOfferPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./elements/EditOfferPage */ "./src/elements/EditOfferPage.ts");
/* harmony import */ var _elements_EditUserPage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./elements/EditUserPage */ "./src/elements/EditUserPage.ts");
/* harmony import */ var _elements_LoginElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./elements/LoginElement */ "./src/elements/LoginElement.ts");
/* harmony import */ var _elements_NavbarElement__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./elements/NavbarElement */ "./src/elements/NavbarElement.ts");
/* harmony import */ var _elements_OfferElement__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./elements/OfferElement */ "./src/elements/OfferElement.ts");
/* harmony import */ var _elements_UserElement__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./elements/UserElement */ "./src/elements/UserElement.ts");












// Pages
customElements.define("offer-search-page", _elements_OfferSearchPage__WEBPACK_IMPORTED_MODULE_0__["default"]);
customElements.define("offer-page", _elements_OfferPage__WEBPACK_IMPORTED_MODULE_3__["default"]);
customElements.define("edit-offer-page", _elements_EditOfferPage__WEBPACK_IMPORTED_MODULE_6__["default"]);
customElements.define("login-page", _elements_LoginPage__WEBPACK_IMPORTED_MODULE_1__["default"]);
customElements.define("register-page", _elements_RegisterPage__WEBPACK_IMPORTED_MODULE_2__["default"]);
customElements.define("user-page", _elements_UserPage__WEBPACK_IMPORTED_MODULE_4__["default"]);
customElements.define("edit-user-page", _elements_EditUserPage__WEBPACK_IMPORTED_MODULE_7__["default"]);
customElements.define("create-offer-page", _elements_CreateOfferPage__WEBPACK_IMPORTED_MODULE_5__["default"]);
// Elements
customElements.define("navbar-element", _elements_NavbarElement__WEBPACK_IMPORTED_MODULE_9__["default"]);
customElements.define("offer-element", _elements_OfferElement__WEBPACK_IMPORTED_MODULE_10__["default"]);
customElements.define("user-element", _elements_UserElement__WEBPACK_IMPORTED_MODULE_11__["default"]);
customElements.define("login-element", _elements_LoginElement__WEBPACK_IMPORTED_MODULE_8__["default"], { extends: "form" });


/***/ }),

/***/ "./src/router.ts":
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ navigateTo)
/* harmony export */ });
const DEFAULT_PAGE = document.createElement("offer-search-page");
const ROUTES_TO_PAGES = {
    "/login": document.createElement("login-page"),
    "/register": document.createElement("register-page"),
    "/offer": document.createElement("offer-page"),
    "/offer/create": document.createElement("create-offer-page"),
    "/offer/edit": document.createElement("edit-offer-page"),
    "/user": document.createElement("user-page"),
    "/user/edit": document.createElement("edit-user-page"),
};
function renderCurrentPage() {
    const path = window.location.pathname;
    const page = ROUTES_TO_PAGES[path] || DEFAULT_PAGE;
    document.body.innerHTML = "";
    document.body.appendChild(page);
}
function navigateTo(fullPath) {
    history.pushState(null, "", fullPath);
    renderCurrentPage();
}
const initialPath = window.location.pathname + window.location.search;
history.replaceState(null, "", initialPath);
renderCurrentPage();
// Gérer la navigation via les boutons Précédent/Suivant du navigateur
window.onpopstate = () => renderCurrentPage();
// Intercepter les clics sur les liens internes
window.addEventListener("click", (event) => {
    const anchor = event.target.closest("a");
    if (!anchor)
        return;
    const href = anchor.getAttribute("href");
    if (href && href.startsWith("/")) {
        event.preventDefault();
        navigateTo(href);
    }
});


/***/ }),

/***/ "./src/services/UserService.ts":
/*!*************************************!*\
  !*** ./src/services/UserService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserService)
/* harmony export */ });
const API_BASE_URL = "http://localhost:3000";
class UserService {
    static async login(email, password) {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok === false) {
            throw new Error("Login failed");
        }
        const { token, user } = await response.json();
        return { token, user };
    }
    static async register(name, email, password) {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        const { token, user, message } = await response.json();
        if (response.ok === false) {
            throw new Error(message);
        }
        return { token, user };
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader */ "./src/loader.ts");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router */ "./src/router.ts");
// Chargement des éléments personnalisés

// Configuration du routeur


})();

/******/ })()
;
//# sourceMappingURL=index.js.map