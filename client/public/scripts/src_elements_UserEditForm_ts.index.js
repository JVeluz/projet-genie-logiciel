"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_UserEditForm_ts"],{

/***/ "./src/elements/UserEditForm.ts":
/*!**************************************!*\
  !*** ./src/elements/UserEditForm.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserEditForm)
/* harmony export */ });
class UserEditForm extends HTMLFormElement {
    connectedCallback() {
        this.nameInput = this.querySelector("input[name='name']");
        this.bioInput = this.querySelector("textarea[name='bio']");
        this.emailInput = this.querySelector("input[name='email']");
        this.passwordInput = this.querySelector("input[name='password']");
    }
    update(user) {
        this.nameInput.value = user.name;
        this.bioInput.value = user.bio || "";
    }
    getEntries() {
        return {
            name: this.nameInput.value,
            bio: this.bioInput.value,
        };
    }
}


/***/ })

}]);
//# sourceMappingURL=src_elements_UserEditForm_ts.index.js.map