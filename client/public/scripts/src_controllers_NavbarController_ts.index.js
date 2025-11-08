"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_controllers_NavbarController_ts"],{

/***/ "./src/controllers/NavbarController.ts":
/*!*********************************************!*\
  !*** ./src/controllers/NavbarController.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavbarController)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");

class NavbarController {
    constructor(view) {
        this.model = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.view = view;
        this.onUserUpdate(this.model.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser));
        this.onLoadingUpdate(this.model.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.Loading));
        this.model.addListener(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser, this.onUserUpdate.bind(this));
        this.model.addListener(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.Loading, this.onLoadingUpdate.bind(this));
    }
    onUserUpdate(value) {
        this.view.update(value);
    }
    onLoadingUpdate(value) {
        this.view.setLoading(value);
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
//# sourceMappingURL=src_controllers_NavbarController_ts.index.js.map