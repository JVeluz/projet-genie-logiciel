"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_models_User_ts"],{

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
    static fromJSON(data) {
        const user = new User();
        user._id = data._id;
        user.name = data.name;
        user.email = data.email;
        user.rating = data.rating;
        user.createdAt = new Date(data.createdAt);
        return user;
    }
    getAvatar() {
        return this.avatar || `https://placehold.co/120x120/17A2B8/ffffff?text=${this.name[0]}`;
    }
}


/***/ })

}]);
//# sourceMappingURL=src_models_User_ts.index.js.map