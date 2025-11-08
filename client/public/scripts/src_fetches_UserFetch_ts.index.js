"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_fetches_UserFetch_ts"],{

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
//# sourceMappingURL=src_fetches_UserFetch_ts.index.js.map