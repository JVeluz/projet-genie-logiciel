"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_controllers_UserController_ts"],{

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


/***/ })

}]);
//# sourceMappingURL=src_controllers_UserController_ts.index.js.map