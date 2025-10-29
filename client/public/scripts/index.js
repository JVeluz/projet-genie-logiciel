/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/Application.ts":
/*!*********************************!*\
  !*** ./src/core/Application.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Application {
    constructor() { }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new Application();
        }
        return this.instance;
    }
    static start() {
        Application.getInstance();
    }
}
Application.instance = null;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Application);


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

/***/ "./src/data/DataBaseAPI.ts":
/*!*********************************!*\
  !*** ./src/data/DataBaseAPI.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataBaseAPI)
/* harmony export */ });
class DataBaseAPI {
    constructor() { }
    static getInstance() {
        if (DataBaseAPI.instance == undefined) {
            DataBaseAPI.instance = new DataBaseAPI();
        }
        return DataBaseAPI.instance;
    }
    get(collection, documentID) {
        return "{}";
    }
    save(collection, document) {
        console.log("Saved to " + collection + ": " + document);
    }
    search(collection, query) {
        return [
            '{"title": "Offer 1", "description": "Description 1", "price": 100}',
            '{"title": "Offer 2", "description": "Description 2", "price": 200}',
            '{"title": "Offer 3", "description": "Description 3", "price": 300}'
        ];
    }
    findByField(collection, field, value) {
        return "";
    }
}


/***/ }),

/***/ "./src/data/OfferRepository.ts":
/*!*************************************!*\
  !*** ./src/data/OfferRepository.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferRepository)
/* harmony export */ });
/* harmony import */ var _data_DataBaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @data/DataBaseAPI */ "./src/data/DataBaseAPI.ts");
/* harmony import */ var _models_Offer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @models/Offer */ "./src/models/Offer.ts");
/* harmony import */ var _models_OfferMapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @models/OfferMapper */ "./src/models/OfferMapper.ts");
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @models/User */ "./src/models/User.ts");




class OfferRepository {
    get(id) {
        const offer = new _models_Offer__WEBPACK_IMPORTED_MODULE_1__["default"]();
        offer.title = "Sample Offer";
        offer.description = "This is a sample offer description.";
        offer.price = 99.99;
        offer.seller = new _models_User__WEBPACK_IMPORTED_MODULE_3__["default"]();
        offer.seller.name = "Joachim";
        return offer;
        // removed by dead control flow

        // removed by dead control flow

    }
    save(offer) {
        const json = _models_OfferMapper__WEBPACK_IMPORTED_MODULE_2__["default"].toJSON(offer);
        _data_DataBaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().save("offers", json);
    }
    search(query) {
        const jsonList = _data_DataBaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().search("offers", query);
        return jsonList.map(json => _models_OfferMapper__WEBPACK_IMPORTED_MODULE_2__["default"].fromJSON(json));
    }
}


/***/ }),

/***/ "./src/data/UserRepository.ts":
/*!************************************!*\
  !*** ./src/data/UserRepository.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserRepository)
/* harmony export */ });
/* harmony import */ var _data_DataBaseAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @data/DataBaseAPI */ "./src/data/DataBaseAPI.ts");
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @models/User */ "./src/models/User.ts");
/* harmony import */ var _models_UserMapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @models/UserMapper */ "./src/models/UserMapper.ts");



class UserRepository {
    get(id) {
        const user = new _models_User__WEBPACK_IMPORTED_MODULE_1__["default"]();
        user.id = 123;
        user.email = "j.veluz2002@gmail.com";
        user.name = "Jesse";
        user.setPassword("sdf");
        user.rating = 2.5;
        return user;
        // removed by dead control flow

        // removed by dead control flow

    }
    save(user) {
        const json = _models_UserMapper__WEBPACK_IMPORTED_MODULE_2__["default"].toJSON(user);
        _data_DataBaseAPI__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().save("users", json);
    }
    findByEmail(email) {
        const user = new _models_User__WEBPACK_IMPORTED_MODULE_1__["default"]();
        user.email = "j.veluz2002@gmail.com";
        user.name = "Jesse";
        user.setPassword("sdf");
        return user;
        // removed by dead control flow

        // removed by dead control flow

        // removed by dead control flow

    }
}


/***/ }),

/***/ "./src/loader.ts":
/*!***********************!*\
  !*** ./src/loader.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elements_OfferSearchPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @elements/OfferSearchPage */ "./src/presentation/elements/OfferSearchPage.ts");
/* harmony import */ var _elements_LoginPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @elements/LoginPage */ "./src/presentation/elements/LoginPage.ts");
/* harmony import */ var _elements_RegisterPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @elements/RegisterPage */ "./src/presentation/elements/RegisterPage.ts");
/* harmony import */ var _elements_OfferPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @elements/OfferPage */ "./src/presentation/elements/OfferPage.ts");
/* harmony import */ var _elements_UserPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @elements/UserPage */ "./src/presentation/elements/UserPage.ts");
/* harmony import */ var _elements_EditOfferPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @elements/EditOfferPage */ "./src/presentation/elements/EditOfferPage.ts");
/* harmony import */ var _elements_EditUserPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @elements/EditUserPage */ "./src/presentation/elements/EditUserPage.ts");
/* harmony import */ var _elements_LoginElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @elements/LoginElement */ "./src/presentation/elements/LoginElement.ts");
/* harmony import */ var _elements_NavbarElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @elements/NavbarElement */ "./src/presentation/elements/NavbarElement.ts");
/* harmony import */ var _elements_OfferElement__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @elements/OfferElement */ "./src/presentation/elements/OfferElement.ts");
/* harmony import */ var _elements_UserElement__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @elements/UserElement */ "./src/presentation/elements/UserElement.ts");











// Pages
customElements.define("offer-search-page", _elements_OfferSearchPage__WEBPACK_IMPORTED_MODULE_0__["default"]);
customElements.define("offer-page", _elements_OfferPage__WEBPACK_IMPORTED_MODULE_3__["default"]);
customElements.define("edit-offer-page", _elements_EditOfferPage__WEBPACK_IMPORTED_MODULE_5__["default"]);
customElements.define("login-page", _elements_LoginPage__WEBPACK_IMPORTED_MODULE_1__["default"]);
customElements.define("register-page", _elements_RegisterPage__WEBPACK_IMPORTED_MODULE_2__["default"]);
customElements.define("user-page", _elements_UserPage__WEBPACK_IMPORTED_MODULE_4__["default"]);
customElements.define("edit-user-page", _elements_EditUserPage__WEBPACK_IMPORTED_MODULE_6__["default"]);
// Elements
customElements.define("navbar-element", _elements_NavbarElement__WEBPACK_IMPORTED_MODULE_8__["default"]);
customElements.define("offer-element", _elements_OfferElement__WEBPACK_IMPORTED_MODULE_9__["default"]);
customElements.define("user-element", _elements_UserElement__WEBPACK_IMPORTED_MODULE_10__["default"]);
customElements.define("login-element", _elements_LoginElement__WEBPACK_IMPORTED_MODULE_7__["default"], { extends: "form" });


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
}


/***/ }),

/***/ "./src/models/OfferMapper.ts":
/*!***********************************!*\
  !*** ./src/models/OfferMapper.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferMapper)
/* harmony export */ });
/* harmony import */ var _Offer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Offer */ "./src/models/Offer.ts");

class OfferMapper {
    static fromJSON(json) {
        const data = JSON.parse(json);
        const offer = new _Offer__WEBPACK_IMPORTED_MODULE_0__["default"]();
        Object.assign(offer, data);
        return offer;
    }
    static toJSON(offer) {
        return JSON.stringify(offer);
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
class User {
    static getHashedPassword(password) {
        return password + "hashed";
    }
    setPassword(password) {
        this.password = User.getHashedPassword(password);
    }
    getPassword() {
        return this.password;
    }
}


/***/ }),

/***/ "./src/models/UserMapper.ts":
/*!**********************************!*\
  !*** ./src/models/UserMapper.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserMapper)
/* harmony export */ });
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./User */ "./src/models/User.ts");

class UserMapper {
    static fromJSON(json) {
        const data = JSON.parse(json);
        const user = new _User__WEBPACK_IMPORTED_MODULE_0__["default"]();
        Object.assign(user, data);
        console.log(user);
        return user;
    }
    static toJSON(user) {
        console.log(JSON.stringify(user));
        return JSON.stringify(user);
    }
}


/***/ }),

/***/ "./src/presentation/controllers/LoginController.ts":
/*!*********************************************************!*\
  !*** ./src/presentation/controllers/LoginController.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginController)
/* harmony export */ });
/* harmony import */ var _core_ApplicationModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/ApplicationModel */ "./src/core/ApplicationModel.ts");
/* harmony import */ var _services_UserService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @services/UserService */ "./src/services/UserService.ts");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../router */ "./src/router.ts");



class LoginController {
    constructor(form, logoutButton = null) {
        this.form = form;
        this.logoutButton = logoutButton;
        this.model = _core_ApplicationModel__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.userService = new _services_UserService__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.form.onsubmit = (event) => this.onSubmit(event);
        if (this.logoutButton) {
            this.logoutButton.onclick = (event) => this.onLogout(event);
        }
    }
    onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        const email = formData.get("email");
        const password = formData.get("password");
        console.log(`onSubmit(${email}, ${password})`);
        const response = this.userService.tryLogin(email, password);
        console.log(response);
        if (response.success) {
            this.model.set("currentUser", response.user);
            (0,_router__WEBPACK_IMPORTED_MODULE_2__["default"])("/");
        }
    }
    onLogout(event) {
        event.preventDefault();
        console.log("onLogout()");
        this.model.set("currentUser", null);
        (0,_router__WEBPACK_IMPORTED_MODULE_2__["default"])("/");
    }
}


/***/ }),

/***/ "./src/presentation/controllers/NavbarController.ts":
/*!**********************************************************!*\
  !*** ./src/presentation/controllers/NavbarController.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavbarController)
/* harmony export */ });
/* harmony import */ var _core_ApplicationModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/ApplicationModel */ "./src/core/ApplicationModel.ts");

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

/***/ "./src/presentation/controllers/OfferEditorController.ts":
/*!***************************************************************!*\
  !*** ./src/presentation/controllers/OfferEditorController.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferController)
/* harmony export */ });
/* harmony import */ var _services_OfferService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @services/OfferService */ "./src/services/OfferService.ts");

class OfferController {
    constructor(view, offerID) {
        this.offerService = new _services_OfferService__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.view = view;
        this.loadOffer(offerID);
    }
    async loadOffer(offerID) {
        this.model = await this.offerService.get(offerID);
        this.view.update(this.model);
    }
}


/***/ }),

/***/ "./src/presentation/controllers/OfferPageController.ts":
/*!*************************************************************!*\
  !*** ./src/presentation/controllers/OfferPageController.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferPageController)
/* harmony export */ });
/* harmony import */ var _services_OfferService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @services/OfferService */ "./src/services/OfferService.ts");

class OfferPageController {
    constructor(view) {
        this.offerService = new _services_OfferService__WEBPACK_IMPORTED_MODULE_0__["default"]();
        const urlParams = new URLSearchParams(window.location.search);
        const offerID = parseInt(urlParams.get("id"));
        console.log(offerID);
        this.offerService.get(offerID).then((offer) => {
            view.offerElement.update(offer);
            view.userElement.update(offer.seller);
        });
    }
}


/***/ }),

/***/ "./src/presentation/controllers/RegisterController.ts":
/*!************************************************************!*\
  !*** ./src/presentation/controllers/RegisterController.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RegisterController)
/* harmony export */ });
/* harmony import */ var _services_UserService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @services/UserService */ "./src/services/UserService.ts");

class RegisterController {
    constructor(form) {
        this.form = form;
        this.userService = new _services_UserService__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.form.onsubmit = (event) => this.onSubmit(event);
    }
    onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        console.log(`onSubmit(${email}, ${password})`);
        const response = this.userService.tryRegister(name, email, password);
        console.log(response);
    }
}


/***/ }),

/***/ "./src/presentation/controllers/SearchPageController.ts":
/*!**************************************************************!*\
  !*** ./src/presentation/controllers/SearchPageController.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchPageController)
/* harmony export */ });
/* harmony import */ var _services_OfferService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @services/OfferService */ "./src/services/OfferService.ts");

class SearchPageController {
    constructor(view, searchForm, filterForm) {
        this.view = view;
        this.searchForm = searchForm;
        this.filterForm = filterForm;
        this.offerService = new _services_OfferService__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.searchForm.onsubmit = (event) => this.onSearchSubmit(event);
        this.filterForm.onsubmit = (event) => this.onSearchSubmit(event);
    }
    onSearchSubmit(event) {
        event.preventDefault();
        const search = Object.fromEntries(new FormData(this.searchForm));
        const filter = Object.fromEntries(new FormData(this.filterForm));
        const query = { search, filter };
        console.log(`onSearchSubmit(${JSON.stringify(query)})`);
        const result = this.offerService.search(query);
        console.log(result);
        this.view.update(result);
    }
}


/***/ }),

/***/ "./src/presentation/controllers/UserController.ts":
/*!********************************************************!*\
  !*** ./src/presentation/controllers/UserController.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserController)
/* harmony export */ });
/* harmony import */ var _services_UserService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @services/UserService */ "./src/services/UserService.ts");

class UserController {
    constructor(view, userID) {
        this.userService = new _services_UserService__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.userService.get(userID).then((user) => {
            view.update(user);
        });
    }
}


/***/ }),

/***/ "./src/presentation/elements/EditOfferPage.ts":
/*!****************************************************!*\
  !*** ./src/presentation/elements/EditOfferPage.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditOfferPage)
/* harmony export */ });
/* harmony import */ var _controllers_OfferEditorController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @controllers/OfferEditorController */ "./src/presentation/controllers/OfferEditorController.ts");
/* harmony import */ var _html_offer_edit_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @html/offer-edit-page.html */ "./src/presentation/html/offer-edit-page.html");


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

/***/ "./src/presentation/elements/EditUserPage.ts":
/*!***************************************************!*\
  !*** ./src/presentation/elements/EditUserPage.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditUserPage)
/* harmony export */ });
/* harmony import */ var _html_user_edit_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @html/user-edit-page.html */ "./src/presentation/html/user-edit-page.html");
/* harmony import */ var _core_ApplicationModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/ApplicationModel */ "./src/core/ApplicationModel.ts");


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

/***/ "./src/presentation/elements/LoginElement.ts":
/*!***************************************************!*\
  !*** ./src/presentation/elements/LoginElement.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginElement)
/* harmony export */ });
/* harmony import */ var _controllers_LoginController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @controllers/LoginController */ "./src/presentation/controllers/LoginController.ts");

class LoginElement extends HTMLFormElement {
    connectedCallback() {
        new _controllers_LoginController__WEBPACK_IMPORTED_MODULE_0__["default"](this);
    }
}


/***/ }),

/***/ "./src/presentation/elements/LoginPage.ts":
/*!************************************************!*\
  !*** ./src/presentation/elements/LoginPage.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var _html_login_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @html/login-page.html */ "./src/presentation/html/login-page.html");

class LoginPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_login_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
    }
}


/***/ }),

/***/ "./src/presentation/elements/NavbarElement.ts":
/*!****************************************************!*\
  !*** ./src/presentation/elements/NavbarElement.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavbarElement)
/* harmony export */ });
/* harmony import */ var _controllers_LoginController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @controllers/LoginController */ "./src/presentation/controllers/LoginController.ts");
/* harmony import */ var _controllers_NavbarController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @controllers/NavbarController */ "./src/presentation/controllers/NavbarController.ts");
/* harmony import */ var _html_navbar_element_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @html/navbar-element.html */ "./src/presentation/html/navbar-element.html");



class NavbarElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_navbar_element_html__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.loginDropdown = this.querySelector('.login-dropdown');
        this.loginForm = this.querySelector('.login-form');
        this.logoutButton = this.querySelector('.logout-button');
        this.newOfferButton = this.querySelector('.new-offer-button');
        this.profileDropdown = this.querySelector('.profile-dropdown');
        this.userElement = this.querySelector('user-element');
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

/***/ "./src/presentation/elements/OfferElement.ts":
/*!***************************************************!*\
  !*** ./src/presentation/elements/OfferElement.ts ***!
  \***************************************************/
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
        const sellerElement = this.querySelector('.offer-seller');
        const categoryElement = this.querySelector('.offer-category');
        const askExchangeElement = this.querySelector('.offer-ask-exchange');
        const locationElement = this.querySelector('.offer-location');
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
            sellerElement.update(offer.seller);
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

/***/ "./src/presentation/elements/OfferPage.ts":
/*!************************************************!*\
  !*** ./src/presentation/elements/OfferPage.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferPage)
/* harmony export */ });
/* harmony import */ var _html_offer_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @html/offer-page.html */ "./src/presentation/html/offer-page.html");
/* harmony import */ var _controllers_OfferPageController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @controllers/OfferPageController */ "./src/presentation/controllers/OfferPageController.ts");


class OfferPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_offer_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        this.offerElement = this.querySelector("offer-element");
        this.userElement = this.querySelector("user-element");
        new _controllers_OfferPageController__WEBPACK_IMPORTED_MODULE_1__["default"](this);
    }
}


/***/ }),

/***/ "./src/presentation/elements/OfferSearchPage.ts":
/*!******************************************************!*\
  !*** ./src/presentation/elements/OfferSearchPage.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferSearchPage)
/* harmony export */ });
/* harmony import */ var _html_offer_search_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @html/offer-search-page.html */ "./src/presentation/html/offer-search-page.html");
/* harmony import */ var _controllers_SearchPageController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @controllers/SearchPageController */ "./src/presentation/controllers/SearchPageController.ts");
/* harmony import */ var _html_offer_card_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @html/offer-card.html */ "./src/presentation/html/offer-card.html");



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

/***/ "./src/presentation/elements/RegisterPage.ts":
/*!***************************************************!*\
  !*** ./src/presentation/elements/RegisterPage.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RegisterPage)
/* harmony export */ });
/* harmony import */ var _controllers_RegisterController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @controllers/RegisterController */ "./src/presentation/controllers/RegisterController.ts");
/* harmony import */ var _html_register_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @html/register-page.html */ "./src/presentation/html/register-page.html");


class RegisterPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_register_page_html__WEBPACK_IMPORTED_MODULE_1__["default"];
        new _controllers_RegisterController__WEBPACK_IMPORTED_MODULE_0__["default"](this.querySelector(".register-form"));
    }
}


/***/ }),

/***/ "./src/presentation/elements/UserElement.ts":
/*!**************************************************!*\
  !*** ./src/presentation/elements/UserElement.ts ***!
  \**************************************************/
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

/***/ "./src/presentation/elements/UserPage.ts":
/*!***********************************************!*\
  !*** ./src/presentation/elements/UserPage.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserPage)
/* harmony export */ });
/* harmony import */ var _html_user_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @html/user-page.html */ "./src/presentation/html/user-page.html");
/* harmony import */ var _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @controllers/UserController */ "./src/presentation/controllers/UserController.ts");


class UserPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_user_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        const urlParams = new URLSearchParams(window.location.search);
        const userID = parseInt(urlParams.get("id"));
        new _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__["default"](this.querySelector('user-element'), userID);
    }
}


/***/ }),

/***/ "./src/presentation/html/login-page.html":
/*!***********************************************!*\
  !*** ./src/presentation/html/login-page.html ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<navbar-element></navbar-element>\r\n\r\n<div class=\"pt-4\"></div>\r\n\r\n<main class=\"container main-container d-flex align-items-center justify-content-center py-5\">\r\n    <div class=\"col-12 col-md-8 col-lg-5 col-xl-4\">\r\n        <div class=\"card shadow-lg border-0 rounded-3\">\r\n            <div class=\"card-body p-4 p-md-5\">\r\n\r\n                <h2 class=\"card-title text-center fw-bold text-primary mb-4\">Connexion</h2>\r\n\r\n                <form is=\"login-element\">\r\n                    <!-- Champ Email -->\r\n                    <div class=\"form-floating mb-3\">\r\n                        <input type=\"email\" class=\"form-control\" name=\"email\" id=\"floatingEmail\"\r\n                            placeholder=\"votre.email@exemple.com\" required>\r\n                        <label for=\"floatingEmail\">Adresse Email</label>\r\n                    </div>\r\n\r\n                    <!-- Champ Mot de passe -->\r\n                    <div class=\"form-floating mb-3\">\r\n                        <input type=\"password\" class=\"form-control\" name=\"password\" id=\"floatingPassword\"\r\n                            placeholder=\"Mot de passe\" required>\r\n                        <label for=\"floatingPassword\">Mot de passe</label>\r\n                    </div>\r\n\r\n                    <!-- Bouton de Soumission -->\r\n                    <div class=\"d-grid mb-3\">\r\n                        <button class=\"btn btn-primary btn-lg fw-bold\" type=\"submit\">Se connecter</button>\r\n                    </div>\r\n\r\n                    <!-- Lien vers l'inscription -->\r\n                    <div class=\"text-center\">\r\n                        <small class=\"text-muted\">Pas encore de compte ? <a href=\"/register\"\r\n                                class=\"fw-bold text-primary\">S'inscrire</a></small>\r\n                    </div>\r\n                </form>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</main>");

/***/ }),

/***/ "./src/presentation/html/navbar-element.html":
/*!***************************************************!*\
  !*** ./src/presentation/html/navbar-element.html ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<nav class=\"sticky-top navbar navbar-expand-lg bg-body-tertiary shadow-sm\">\r\n    <div class=\"container-xxl\">\r\n        <!-- Logo/Marque -->\r\n        <a class=\"navbar-brand fw-bold text-primary\" href=\"/\">\r\n            LesBonBails\r\n        </a>\r\n\r\n        <!-- Toggler pour mobile -->\r\n        <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navContent\"\r\n            aria-controls=\"navContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n            <span class=\"navbar-toggler-icon\"></span>\r\n        </button>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"navContent\">\r\n            <ul class=\"navbar-nav ms-auto mb-2 mb-lg-0 align-items-center\">\r\n\r\n                <!-- 1. Bouton \"Nouveau Bon Bail\" -->\r\n                <li class=\"nav-item me-2\">\r\n                    <a href=\"/offer/edit\" class=\"new-offer-button btn btn-outline-success\">\r\n                        Nouveau Bon Bail\r\n                    </a>\r\n                </li>\r\n\r\n                <!-- 2. Bloc Déconnecté (Dropdown Connexion) -->\r\n                <li class=\"login-dropdown nav-item dropdown me-2\">\r\n                    <button class=\"btn btn-outline-primary\" role=\"button\" data-bs-toggle=\"dropdown\"\r\n                        data-bs-auto-close=\"outside\" aria-expanded=\"false\">\r\n                        Connexion\r\n                    </button>\r\n\r\n                    <div class=\"dropdown-menu dropdown-menu-end p-3 shadow border-0\" style=\"min-width: 220px;\">\r\n                        <form class=\"login-form\">\r\n                            <div class=\"mb-2\">\r\n                                <input name=\"email\" type=\"email\" class=\"form-control form-control-sm\"\r\n                                    placeholder=\"Email\" required>\r\n                            </div>\r\n                            <div class=\"mb-3\">\r\n                                <input name=\"password\" type=\"password\" class=\"form-control form-control-sm\"\r\n                                    placeholder=\"Mot de passe\" required>\r\n                            </div>\r\n\r\n                            <button type=\"submit\" class=\"btn btn-primary w-100 btn-sm mb-2\">Se connecter</button>\r\n                            <a href=\"/register\" class=\"btn btn-secondary w-100 btn-sm\">S'enregistrer</a>\r\n                        </form>\r\n                    </div>\r\n                </li>\r\n\r\n                <!-- 3. Bloc Connecté (Dropdown Profil) -->\r\n                <li class=\"profile-dropdown nav-item dropdown d-flex align-items-center\">\r\n                    <a class=\"nav-link dropdown-toggle p-0\" href=\"#\" role=\"button\" data-bs-toggle=\"dropdown\"\r\n                        aria-expanded=\"false\">\r\n                        <user-element>\r\n                            <img src=\"https://placehold.co/32x32/17A2B8/ffffff?text=?\" width=\"32\" height=\"32\"\r\n                                alt=\"Profil\" class=\"user-avatar rounded-circle border border-2 border-primary\">\r\n                        </user-element>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu dropdown-menu-end shadow border-0\">\r\n                        <li><a href=\"/user\" class=\"user-profile-button dropdown-item\">\r\n                                Profil\r\n                            </a></li>\r\n                        <li><button class=\"logout-button dropdown-item text-danger\" type=\"button\">Déconnexion</button>\r\n                        </li>\r\n                    </ul>\r\n                </li>\r\n\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>");

/***/ }),

/***/ "./src/presentation/html/offer-card.html":
/*!***********************************************!*\
  !*** ./src/presentation/html/offer-card.html ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<a class=\"offer-lookup-button card shadow-sm\">\r\n    <img src=\"https://placehold.co/600x400\" class=\"card-img-top\" alt=\"Titre de l'objet\">\r\n    <div class=\"card-body\">\r\n        <h5 class=\"offer-title card-title text-primary\">\r\n            ?\r\n        </h5>\r\n        <p class=\"offer-description card-text\">\r\n            ?\r\n        </p>\r\n    </div>\r\n</a>");

/***/ }),

/***/ "./src/presentation/html/offer-edit-page.html":
/*!****************************************************!*\
  !*** ./src/presentation/html/offer-edit-page.html ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La navbar est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Contenu Principal -->\r\n<main class=\"container py-5\">\r\n    <div class=\"row justify-content-center\">\r\n        <div class=\"col-12 col-lg-8\">\r\n\r\n            <h2 class=\"text-center fw-bold text-primary mb-4\">Modifier votre annonce</h2>\r\n\r\n            <!-- Carte principale contenant le formulaire -->\r\n            <div class=\"card shadow-lg border-0\">\r\n                <div class=\"card-body p-4 p-md-5\">\r\n\r\n                    <form id=\"edit-offer-form\">\r\n\r\n                        <!-- Champ Titre -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"offer-title\" class=\"form-label fw-bold\">Titre de l'annonce</label>\r\n                            <input type=\"text\" class=\"form-control\" id=\"offer-title\"\r\n                                value=\"Tondeuse à Gazon Thermique Puissante\" required>\r\n                        </div>\r\n\r\n                        <!-- Ligne pour Catégorie et Type -->\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-6 mb-3\">\r\n                                <label for=\"offer-category\" class=\"form-label fw-bold\">Catégorie</label>\r\n                                <select class=\"form-select\" id=\"offer-category\" required>\r\n                                    <option value=\"jardinage\" selected>Jardinage</option>\r\n                                    <option value=\"bricolage\">Bricolage</option>\r\n                                    <option value=\"services\">Services</option>\r\n                                    <option value=\"maison\">Maison</option>\r\n                                </select>\r\n                            </div>\r\n                            <div class=\"col-md-6 mb-3\">\r\n                                <label for=\"offer-type\" class=\"form-label fw-bold\">Type d'offre</label>\r\n                                <select class=\"form-select\" id=\"offer-type\" required>\r\n                                    <option value=\"objet\" selected>Objet à Prêter</option>\r\n                                    <option value=\"competence\">Compétence</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Champ Description -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"offer-description\" class=\"form-label fw-bold\">Description</label>\r\n                            <textarea class=\"form-control\" id=\"offer-description\" rows=\"4\"\r\n                                required>Tondeuse de marque XYZ, bien entretenue. Idéale pour les grandes surfaces...</textarea>\r\n                        </div>\r\n\r\n                        <!-- Champ \"En échange de\" -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"offer-ask\" class=\"form-label fw-bold\">Ce que vous demandez en échange</label>\r\n                            <textarea class=\"form-control\" id=\"offer-ask\" rows=\"3\"\r\n                                required>Je souhaite l'échanger contre un cours d'initiation à la programmation...</textarea>\r\n                        </div>\r\n\r\n                        <!-- Champ Localisation -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"offer-location\" class=\"form-label fw-bold\">Localisation</label>\r\n                            <input type=\"text\" class=\"form-control\" id=\"offer-location\" value=\"Pau\" required>\r\n                        </div>\r\n\r\n                        <!-- Champ Gestion des Images -->\r\n                        <div class=\"mb-3\">\r\n                            <label class=\"form-label fw-bold\">Images actuelles</label>\r\n                            <!-- Simulation des images existantes -->\r\n                            <div>\r\n                                <img src=\"https://placehold.co/100x75/33A366/ffffff?text=Img+1\"\r\n                                    class=\"img-thumbnail me-2\" alt=\"Image 1\">\r\n                                <img src=\"https://placehold.co/100x75/33A366/ffffff?text=Img+2\" class=\"img-thumbnail\"\r\n                                    alt=\"Image 2\">\r\n                            </div>\r\n                            <label for=\"offer-images\" class=\"form-label mt-3\">Ajouter ou remplacer des images</label>\r\n                            <input class=\"form-control\" type=\"file\" id=\"offer-images\" multiple>\r\n                        </div>\r\n\r\n                        <hr class=\"my-4\">\r\n\r\n                        <!-- Boutons d'action -->\r\n                        <div class=\"d-flex flex-wrap justify-content-between align-items-center\">\r\n                            <!-- Bouton Enregistrer -->\r\n                            <button type=\"submit\" class=\"btn btn-primary btn-lg mb-2\">\r\n                                <i class=\"bi bi-check-circle me-2\"></i>Enregistrer\r\n                            </button>\r\n\r\n                            <!-- Bouton Annuler -->\r\n                            <a href=\"/profile\" class=\"btn btn-outline-secondary mb-2\">\r\n                                Annuler\r\n                            </a>\r\n\r\n                            <!-- Bouton Supprimer (ouvre le modal) -->\r\n                            <button type=\"button\" class=\"btn btn-outline-danger mb-2\" data-bs-toggle=\"modal\"\r\n                                data-bs-target=\"#deleteModal\">\r\n                                <i class=\"bi bi-trash me-2\"></i>Supprimer l'annonce\r\n                            </button>\r\n                        </div>\r\n\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</main>");

/***/ }),

/***/ "./src/presentation/html/offer-page.html":
/*!***********************************************!*\
  !*** ./src/presentation/html/offer-page.html ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La barre de navigation est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Petit espacement vertical sous la navbar -->\r\n<div class=\"pt-4\"></div>\r\n\r\n<!-- Conteneur principal de la page -->\r\n<main class=\"container py-4\">\r\n    <!-- Grille Bootstrap principale. g-5 ajoute un large espacement (gutter) entre les colonnes -->\r\n    <div class=\"row g-5\">\r\n\r\n        <!-- SECTION GAUCHE (Contenu principal de l'annonce) - 8 colonnes sur grand écran -->\r\n        <offer-element class=\"col-lg-8\">\r\n\r\n            <!-- Titre de l'annonce -->\r\n            <h1 class=\"offer-title fw-bolder mb-2\">Tondeuse à Gazon Thermique Puissante</h1>\r\n\r\n            <!-- Badges pour la catégorie et le type d'offre -->\r\n            <div class=\"mb-4\">\r\n                <span class=\"offer-category badge bg-primary text-uppercase me-2\">\r\n                    ?\r\n                </span>\r\n            </div>\r\n\r\n            <!-- Carousel (diaporama d'images) de l'annonce -->\r\n            <div class=\"carousel slide mb-5\" data-bs-ride=\"carousel\" id=\"offer-carousel\">\r\n                <!-- Indicateurs (les petits points en bas) -->\r\n                <div class=\"carousel-indicators\">\r\n                    <button type=\"button\" data-bs-target=\"#offer-carousel\" data-bs-slide-to=\"0\" class=\"active\"\r\n                        aria-current=\"true\" aria-label=\"Slide 1\"></button>\r\n                    <button type=\"button\" data-bs-target=\"#offer-carousel\" data-bs-slide-to=\"1\"\r\n                        aria-label=\"Slide 2\"></button>\r\n                </div>\r\n\r\n                <!-- Conteneur pour les images (slides) -->\r\n                <div id=\"offer-image-container\" class=\"carousel-inner rounded-3 shadow-lg\">\r\n                    <!-- Slide 1 (active = visible au chargement) -->\r\n                    <div class=\"carousel-item active\">\r\n                        <img src=\"https://placehold.co/800x450/33A366/ffffff?text=Image+1\" class=\"d-block w-100\"\r\n                            alt=\"Image 1 de l'annonce\">\r\n                    </div>\r\n                    <!-- Slide 2 -->\r\n                    <div class=\"carousel-item\">\r\n                        <img src=\"https://placehold.co/800x450/33A366/ffffff?text=Image+2\" class=\"d-block w-100\"\r\n                            alt=\"Image 2 de l'annonce\">\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- Contrôles (flèches) Précédent/Suivant -->\r\n                <button class=\"carousel-control-prev\" type=\"button\" data-bs-target=\"#offer-carousel\"\r\n                    data-bs-slide=\"prev\">\r\n                    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n                    <span class=\"visually-hidden\">Précédent</span>\r\n                </button>\r\n                <button class=\"carousel-control-next\" type=\"button\" data-bs-target=\"#offer-carousel\"\r\n                    data-bs-slide=\"next\">\r\n                    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n                    <span class=\"visually-hidden\">Suivant</span>\r\n                </button>\r\n            </div>\r\n\r\n            <!-- Section Description -->\r\n            <h3 class=\"border-bottom pb-2 mb-3 text-secondary\">Description de l'Offre</h3>\r\n            <p class=\"offer-description lead text-muted\">\r\n                <!-- ? = Emplacement pour la description dynamique -->\r\n                ?\r\n            </p>\r\n\r\n            <!-- Section \"En échange de\" -->\r\n            <h3 class=\"border-bottom pb-2 mb-3 mt-5 text-secondary\">Ce qui est demandé en Échange</h3>\r\n            <!-- Carte stylisée pour mettre en avant la demande -->\r\n            <div id=\"offer-ask-exchange\" class=\"card border-warning mb-4\">\r\n                <div class=\"card-body\">\r\n                    <i class=\"bi bi-info-circle-fill text-warning me-2\"></i>\r\n                    <!-- ? = Emplacement pour la demande d'échange dynamique -->\r\n                    ?\r\n                </div>\r\n            </div>\r\n\r\n            <!-- Section Localisation -->\r\n            <h3 class=\"border-bottom pb-2 mb-3 mt-5 text-secondary\">Localisation</h3>\r\n            <p class=\"user-location mb-5\">\r\n                <i class=\"bi bi-geo-alt-fill text-danger me-2\"></i>\r\n                <!-- ? = Emplacement pour la localisation dynamique -->\r\n                ?\r\n            </p>\r\n        </offer-element>\r\n\r\n        <!-- SECTION DROITE (Barre latérale) - 4 colonnes sur grand écran -->\r\n        <aside class=\"col-lg-4\">\r\n\r\n            <!-- Carte \"Propriétaire\" -->\r\n            <div class=\"card mb-4 shadow-lg text-center p-3\">\r\n                <div class=\"card-body\">\r\n                    <h4 class=\"card-title text-primary mb-3\">Le Propriétaire</h4>\r\n\r\n                    <!-- Composant personnalisé pour les infos utilisateur -->\r\n                    <user-element>\r\n                        <!-- Avatar -->\r\n                        <img alt=\"Vendeur\" width=\"80\" height=\"80\"\r\n                            class=\"user-avatar rounded-circle mb-3 border border-3 border-primary shadow\">\r\n\r\n                        <!-- Nom (dynamique) -->\r\n                        <h5 class=\"user-name fw-bold mb-1\">\r\n                            ?\r\n                        </h5>\r\n                        <!-- Note (dynamique) -->\r\n                        <p class=\"user-rating mb-3 text-warning\">\r\n                            ?\r\n                        </p>\r\n                        <!-- Lien vers le profil -->\r\n                        <a class=\"user-profile-button btn btn-outline-primary w-100 mt-2\">Voir le Profil</a>\r\n                    </user-element>\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <!-- Carte \"Proposer un Échange\" (Formulaire) -->\r\n            <div class=\"card shadow-lg border-success\">\r\n                <div class=\"card-header bg-success text-white fw-bold\">\r\n                    Proposer un Échange\r\n                </div>\r\n                <div class=\"card-body\">\r\n                    <form>\r\n                        <!-- Champ: Contre-proposition -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"proposition-text\" class=\"form-label fw-bold\">Votre Contre-Proposition <span\r\n                                    class=\"text-danger\">*</span></label>\r\n                            <textarea id=\"proposition-text\" class=\"form-control\" rows=\"3\" required\r\n                                placeholder=\"Ex: Je vous offre une heure de cours de cuisine...\"></textarea>\r\n                        </div>\r\n                        <!-- Champ: Disponibilité -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"disponibility-input\" class=\"form-label fw-bold\">Votre Disponibilité <span\r\n                                    class=\"text-danger\">*</span></label>\r\n                            <input id=\"disponibility-input\" type=\"text\" class=\"form-control\" required\r\n                                placeholder=\"Ex: Disponible le 15/11 ou tous les weekends.\">\r\n                        </div>\r\n                        <!-- Bouton d'envoi -->\r\n                        <button type=\"submit\" class=\"btn btn-success w-100 btn-lg mt-2\">Envoyer la Demande</button>\r\n                        <p class=\"mt-3 text-center\"><small class=\"text-muted\">Vous recevrez une notification après\r\n                                acceptation.</small></p>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </aside>\r\n    </div>\r\n</main>");

/***/ }),

/***/ "./src/presentation/html/offer-search-page.html":
/*!******************************************************!*\
  !*** ./src/presentation/html/offer-search-page.html ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<navbar-element></navbar-element>\r\n\r\n<div class=\"pt-4\"></div>\r\n\r\n<main class=\"container\">\r\n    <div class=\"row\">\r\n        <aside class=\"col-lg-3 mb-4\">\r\n\r\n            <div class=\"card border-0 shadow-sm\">\r\n                <div class=\"card-header bg-primary text-white fw-bold\">\r\n                    Filtres de Recherche\r\n                </div>\r\n                <div class=\"card-body\">\r\n\r\n                    <form id=\"filter-form\">\r\n                        <h6 class=\"card-title text-muted mb-3\">Catégorie</h6>\r\n                        <div class=\"form-check mb-2\">\r\n                            <input checked name=\"enable-objects\" class=\"form-check-input\" type=\"checkbox\"\r\n                                id=\"filter-objects\" value=\"true\">\r\n                            <label class=\"form-check-label\" for=\"filter-objects\">Objets</label>\r\n                        </div>\r\n                        <div class=\"form-check\">\r\n                            <input checked name=\"enable-skills\" class=\"form-check-input\" type=\"checkbox\"\r\n                                id=\"filter-skills\" value=\"true\">\r\n                            <label class=\"form-check-label\" for=\"filter-skills\">Compétences</label>\r\n                        </div>\r\n\r\n                        <hr class=\"my-3\">\r\n\r\n                        <h6 class=\"card-title text-muted mb-3\">Localisation</h6>\r\n                        <input name=\"location\" type=\"text\" class=\"form-control\" placeholder=\"Ville ou code postal\"\r\n                            aria-label=\"Localisation\">\r\n\r\n                        <hr class=\"my-3\">\r\n\r\n                        <button class=\"btn btn-primary w-100 mt-2\" type=\"submit\">Appliquer les filtres</button>\r\n                    </form>\r\n\r\n                </div>\r\n            </div>\r\n\r\n        </aside>\r\n\r\n        <section class=\"col-lg-9\">\r\n\r\n            <form id=\"search-form\" class=\"mb-4\">\r\n                <div class=\"input-group input-group-lg shadow-sm\">\r\n                    <input name=\"input\" class=\"form-control border-end-0\"\r\n                        placeholder=\"Rechercher des objets ou des compétences...\" aria-label=\"Rechercher\">\r\n                    <button class=\"btn btn-warning\" type=\"submit\" aria-label=\"Lancer la recherche\">\r\n                        <i class=\"bi bi-search\"></i>\r\n                    </button>\r\n                </div>\r\n            </form>\r\n\r\n            <h2 class=\"mb-3\">Annonces Disponibles</h2>\r\n\r\n            <div class=\"offer-container row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4\">\r\n            </div>\r\n\r\n        </section>\r\n    </div>\r\n</main>");

/***/ }),

/***/ "./src/presentation/html/register-page.html":
/*!**************************************************!*\
  !*** ./src/presentation/html/register-page.html ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<navbar-element></navbar-element>\r\n\r\n<div class=\"pt-4\"></div>\r\n\r\n<main class=\"container main-container d-flex align-items-center justify-content-center py-5\">\r\n    <div class=\"col-12 col-md-8 col-lg-5 col-xl-4\">\r\n        <div class=\"card shadow-lg border-0 rounded-3\">\r\n            <div class=\"card-body p-4 p-md-5\">\r\n\r\n                <h2 class=\"card-title text-center fw-bold text-primary mb-4\">Créer un compte</h2>\r\n\r\n                <form class=\"register-form\">\r\n                    <!-- Champ Nom -->\r\n                    <div class=\"form-floating mb-3\">\r\n                        <input type=\"text\" class=\"form-control\" name=\"username\" id=\"floatingName\"\r\n                            placeholder=\"Votre nom\" required>\r\n                        <label for=\"floatingName\">Votre Nom</label>\r\n                    </div>\r\n\r\n                    <!-- Champ Email -->\r\n                    <div class=\"form-floating mb-3\">\r\n                        <input type=\"email\" class=\"form-control\" name=\"email\" id=\"floatingEmail\"\r\n                            placeholder=\"votre.email@exemple.com\" required>\r\n                        <label for=\"floatingEmail\">Adresse Email</label>\r\n                    </div>\r\n\r\n                    <!-- Champ Mot de passe -->\r\n                    <div class=\"form-floating mb-3\">\r\n                        <input type=\"password\" class=\"form-control\" name=\"password\" id=\"floatingPassword\"\r\n                            placeholder=\"Mot de passe\" required>\r\n                        <label for=\"floatingPassword\">Mot de passe</label>\r\n                    </div>\r\n\r\n                    <!-- Bouton de Soumission -->\r\n                    <div class=\"d-grid mb-3\">\r\n                        <button class=\"btn btn-primary btn-lg fw-bold\" type=\"submit\">S'inscrire</button>\r\n                    </div>\r\n\r\n                    <!-- Lien vers la connexion -->\r\n                    <div class=\"text-center\">\r\n                        <small class=\"text-muted\">Déjà un compte ? <a href=\"/login\" class=\"fw-bold text-primary\">Se\r\n                                connecter</a></small>\r\n                    </div>\r\n                </form>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</main>");

/***/ }),

/***/ "./src/presentation/html/user-edit-page.html":
/*!***************************************************!*\
  !*** ./src/presentation/html/user-edit-page.html ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La navbar est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Contenu Principal -->\r\n<main class=\"container py-5\">\r\n    <!-- Changement de la structure en 2 colonnes avec g-5 pour l'espacement -->\r\n    <div class=\"row g-5 justify-content-center\">\r\n\r\n        <!-- COLONNE 1: FORMULAIRE D'ÉDITION -->\r\n        <div class=\"col-12 col-lg-7\">\r\n\r\n            <h2 class=\"text-center fw-bold text-primary mb-4\">Modifier votre profil</h2>\r\n\r\n            <!-- Carte principale contenant le formulaire -->\r\n            <div class=\"card shadow-lg border-0\">\r\n                <div class=\"card-body p-4 p-md-5\">\r\n\r\n                    <form>\r\n\r\n                        <!-- Champ Avatar -->\r\n                        <div class=\"mb-3 text-center\">\r\n                            <label for=\"edit-avatar\" class=\"form-label fw-bold\">Photo de profil</label>\r\n                            <div>\r\n                                <img src=\"https://placehold.co/120x120/17A2B8/ffffff?text=U\"\r\n                                    class=\"img-thumbnail rounded-circle mb-3\" alt=\"Avatar actuel\" width=\"120\"\r\n                                    height=\"120\">\r\n                            </div>\r\n                            <!-- ID ajouté pour le script -->\r\n                            <input class=\"form-control\" type=\"file\" accept=\"image/*\" id=\"edit-avatar\">\r\n                        </div>\r\n\r\n                        <!-- Champ Nom -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"edit-name\" class=\"form-label fw-bold\">Votre Nom</label>\r\n                            <!-- ID ajouté pour le script -->\r\n                            <input type=\"text\" class=\"form-control\" value=\"Alice Dubois\" required id=\"edit-name\">\r\n                        </div>\r\n\r\n                        <!-- Champ Email -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"edit-email\" class=\"form-label fw-bold\">Adresse Email</label>\r\n                            <!-- ID ajouté pour le script -->\r\n                            <input type=\"email\" class=\"form-control\" value=\"alice.dubois@exemple.com\" required\r\n                                id=\"edit-email\">\r\n                        </div>\r\n\r\n                        <!-- Champ Biographie -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"edit-bio\" class=\"form-label fw-bold\">Ma biographie</label>\r\n                            <!-- ID ajouté pour le script -->\r\n                            <textarea class=\"form-control\" rows=\"4\"\r\n                                id=\"edit-bio\">J'aime le jardinage et les échanges de services.</textarea>\r\n                        </div>\r\n\r\n                        <hr class=\"my-4\">\r\n\r\n                        <!-- Boutons d'action -->\r\n                        <div class=\"d-flex flex-wrap justify-content-between align-items-center\">\r\n                            <button type=\"submit\" class=\"btn btn-primary btn-lg mb-2\">\r\n                                <i class=\"bi bi-check-circle me-2\"></i>Enregistrer\r\n                            </button>\r\n                            <a href=\"/profile\" class=\"btn btn-outline-secondary mb-2\">\r\n                                Annuler\r\n                            </a>\r\n                            <button type=\"button\" class=\"btn btn-outline-danger mb-2\" data-bs-toggle=\"modal\"\r\n                                data-bs-target=\"#deleteUserModal\">\r\n                                <i class=\"bi bi-trash me-2\"></i>Supprimer le compte\r\n                            </button>\r\n                        </div>\r\n\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div> <!-- Fin de la colonne formulaire -->\r\n\r\n        <!-- COLONNE 2: APERÇU DE LA CARTE -->\r\n        <div class=\"col-12 col-lg-5\">\r\n            <!-- sticky-top garde l'aperçu visible pendant le scroll -->\r\n            <div class=\"sticky-top\" style=\"top: 5rem;\">\r\n                <h4 class=\"text-center text-primary mb-4\">Aperçu de la carte</h4>\r\n\r\n                <!-- Carte d'aperçu -->\r\n                <div class=\"card shadow-lg text-center p-3\">\r\n                    <div class=\"card-body\">\r\n\r\n                        <user-element>\r\n                            <img src=\"https://placehold.co/120x120/17A2B8/ffffff?text=U\" alt=\"Aperçu Avatar\" width=\"120\"\r\n                                height=\"120\"\r\n                                class=\"user-avatar rounded-circle mb-3 border border-3 border-primary shadow\">\r\n\r\n                            <h5 class=\"user-name fw-bold mb-1\">\r\n                                ?\r\n                            </h5>\r\n\r\n                            <p class=\"user-bio text-muted fst-italic\">\r\n                                ?\r\n                            </p>\r\n\r\n                            <p class=\"user-rating mb-3 text-warning\">⭐⭐⭐⭐⭐ <small class=\"text-muted\">(Aperçu)</small>\r\n                            </p>\r\n\r\n                            <a href=\"#\" class=\"btn btn-outline-primary w-100 mt-2 disabled\" tabindex=\"-1\"\r\n                                aria-disabled=\"true\">\r\n                                Voir le Profil\r\n                            </a>\r\n                        </user-element>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div> <!-- Fin de la colonne aperçu -->\r\n\r\n    </div>\r\n</main>\r\n\r\n<!-- Modal de Confirmation de Suppression de Compte (Inchangé) -->\r\n<div class=\"modal fade\" id=\"deleteUserModal\" tabindex=\"-1\" aria-labelledby=\"deleteUserModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-dialog-centered\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h5 class=\"modal-title text-danger\" id=\"deleteUserModalLabel\">\r\n                    <i class=\"bi bi-exclamation-triangle-fill me-2\"></i>Confirmer la suppression du compte\r\n                </h5>\r\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                Êtes-vous sûr de vouloir supprimer votre compte ? <br>\r\n                Toutes vos annonces et informations seront définitivement perdues.\r\n                <br><strong>Cette action est irréversible.</strong>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Annuler</button>\r\n                <button type=\"button\" class=\"btn btn-danger\">Oui, supprimer mon compte</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ }),

/***/ "./src/presentation/html/user-page.html":
/*!**********************************************!*\
  !*** ./src/presentation/html/user-page.html ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<navbar-element></navbar-element>\r\n\r\n<div class=\"pt-4\"></div>\r\n\r\n<main class=\"container\">\r\n    <user-element class=\"row\">\r\n        <!-- Colonne Profil (gauche) -->\r\n        <div class=\"col-lg-4 mb-4\">\r\n            <div class=\"card shadow-lg border-0 text-center p-4\">\r\n                <div class=\"card-body\">\r\n                    <!-- Avatar -->\r\n                    <img src=\"https://placehold.co/128x128/17A2B8/ffffff?text=JD\" alt=\"Avatar Utilisateur\" width=\"128\"\r\n                        height=\"128\" class=\"user-avatar rounded-circle mb-3 border border-4 border-primary shadow-sm\">\r\n\r\n                    <!-- Nom et Taux -->\r\n                    <h2 class=\"user-name fw-bold mb-1\">\r\n                        ?\r\n                    </h2>\r\n                    <p class=\"user-rating text-warning mb-4\">\r\n                        ?\r\n                    </p>\r\n\r\n                    <!-- Bouton Modifier -->\r\n                    <a href=\"/user/edit\" class=\"user-edit-button btn btn-primary w-100 mb-2\">\r\n                        <i class=\"bi bi-pencil-square me-2\"></i>\r\n                        Modifier le Profil\r\n                    </a>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <!-- Colonne Contenu (droite) -->\r\n        <div class=\"col-lg-8\">\r\n\r\n            <!-- Section Informations de Base -->\r\n            <div class=\"card shadow-sm mb-4\">\r\n                <div class=\"card-header border-bottom fw-bold text-primary\">\r\n                    <i class=\"bi bi-person-lines-fill me-2\"></i>Informations de Compte\r\n                </div>\r\n                <ul class=\"list-group list-group-flush\">\r\n                    <li class=\"list-group-item d-flex justify-content-between align-items-center\">\r\n                        <span class=\"fw-bold\">\r\n                            Habite à:\r\n                        </span>\r\n                        <span class=\"user-location\">\r\n                            ?\r\n                        </span>\r\n                    </li>\r\n                    <li class=\"list-group-item d-flex justify-content-between align-items-center\">\r\n                        <span class=\"fw-bold\">\r\n                            Membre depuis:\r\n                        </span>\r\n                        <span class=\"member-since\">\r\n                            ?\r\n                        </span>\r\n                    </li>\r\n                    <li class=\"list-group-item\">\r\n                        <span class=\"fw-bold d-block mb-1\">\r\n                            Ma Bio:\r\n                        </span>\r\n                        <p class=\"user-bio text-muted mb-0\">\r\n                            ?\r\n                        </p>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n\r\n            <!-- Section Annonces -->\r\n            <h3 class=\"mt-4 mb-3 text-secondary border-bottom pb-2\">\r\n                Mes Annonces\r\n            </h3>\r\n            <div class=\"user-offers row row-cols-1 row-cols-md-2 g-4\">\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </user-element>\r\n</main>");

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
const DEFAULT_PAGE = document.createElement('offer-search-page');
const ROUTES_TO_PAGES = {
    "/login": document.createElement('login-page'),
    "/register": document.createElement('register-page'),
    "/offer": document.createElement('offer-page'),
    "/offer/edit": document.createElement('edit-offer-page'),
    "/user": document.createElement('user-page'),
    "/user/edit": document.createElement('edit-user-page'),
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
window.onpopstate = () => renderCurrentPage();
const initialPath = window.location.pathname + window.location.search;
history.replaceState(null, "", initialPath);
renderCurrentPage();


/***/ }),

/***/ "./src/services/OfferService.ts":
/*!**************************************!*\
  !*** ./src/services/OfferService.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferService)
/* harmony export */ });
/* harmony import */ var _data_OfferRepository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @data/OfferRepository */ "./src/data/OfferRepository.ts");

class OfferService {
    constructor() {
        this.repository = new _data_OfferRepository__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
    async get(id) {
        return this.repository.get(id);
    }
    async save(offer) {
        await this.repository.save(offer);
    }
    search(query) {
        return this.repository.search(JSON.stringify(query));
    }
}


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
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @models/User */ "./src/models/User.ts");
/* harmony import */ var _data_UserRepository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @data/UserRepository */ "./src/data/UserRepository.ts");


const LOGIN_WRONG_PASSWORD = { success: false, isPasswordCorrect: false };
const LOGIN_USER_NOT_FOUND = { success: false, isPasswordCorrect: true };
const REGISTER_EMAIL_TAKEN = { success: false, isEmailTaken: true };
class UserService {
    constructor() {
        this.repository = new _data_UserRepository__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
    async get(id) {
        return this.repository.get(id);
    }
    save(user) {
        this.repository.save(user);
    }
    tryLogin(email, password) {
        const user = this.repository.findByEmail(email);
        if (user === null) {
            return LOGIN_USER_NOT_FOUND;
        }
        if (user.getPassword() !== _models_User__WEBPACK_IMPORTED_MODULE_0__["default"].getHashedPassword(password)) {
            return LOGIN_WRONG_PASSWORD;
        }
        return { success: true, isPasswordCorrect: true, user: user };
    }
    tryRegister(name, email, password) {
        const existingUser = this.repository.findByEmail(email);
        if (existingUser) {
            return REGISTER_EMAIL_TAKEN;
        }
        const newUser = new _models_User__WEBPACK_IMPORTED_MODULE_0__["default"]();
        newUser.name = name;
        newUser.email = email;
        newUser.setPassword(password);
        this.repository.save(newUser);
        return { success: true, isEmailTaken: false, user: newUser };
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
/* harmony import */ var _core_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/Application */ "./src/core/Application.ts");
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader */ "./src/loader.ts");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router */ "./src/router.ts");

// Chargement des éléments personnalisés

// Configuration du routeur

// Initialisation de l'application
_core_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();

})();

/******/ })()
;
//# sourceMappingURL=index.js.map