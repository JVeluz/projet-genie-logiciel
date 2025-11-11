"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_UserForm_ts"],{

/***/ "./src/elements/UserForm.ts":
/*!**********************************!*\
  !*** ./src/elements/UserForm.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserForm)
/* harmony export */ });
class UserForm extends HTMLFormElement {
    connectedCallback() {
        this.nameInput = this.querySelector('input[name="name"]');
        this.bioInput = this.querySelector('textarea[name="bio"]');
        this.emailInput = this.querySelector('input[name="email"]');
        this.passwordInput = this.querySelector('input[name="password"]');
    }
    update(data) {
        if (this.nameInput)
            this.nameInput.value = data.name || "";
        if (this.bioInput)
            this.bioInput.value = data.bio || "";
        if (this.emailInput)
            this.emailInput.value = data.email || "";
        if (this.passwordInput)
            this.passwordInput.value = "";
    }
    getLoginData() {
        return {
            name: this.nameInput.value,
            email: this.emailInput.value,
            password: this.passwordInput.value,
        };
    }
    getEntries() {
        return {
            name: this.nameInput?.value,
            email: this.emailInput?.value,
            password: this.passwordInput?.value,
            bio: this.bioInput?.value,
        };
    }
}


/***/ })

}]);
//# sourceMappingURL=src_elements_UserForm_ts.index.js.map