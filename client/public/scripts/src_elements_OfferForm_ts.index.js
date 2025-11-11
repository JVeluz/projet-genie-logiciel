"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_OfferForm_ts"],{

/***/ "./src/elements/OfferForm.ts":
/*!***********************************!*\
  !*** ./src/elements/OfferForm.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferForm)
/* harmony export */ });
class OfferForm extends HTMLFormElement {
    connectedCallback() {
        this.titleInput = this.querySelector('input[name="title"]');
        this.descriptionInput = this.querySelector('textarea[name="description"]');
        this.locationInput = this.querySelector('input[name="location"]');
        this.categoryInput = this.querySelector('select[name="category"]');
        this.typeInput = this.querySelector('select[name="type"]');
        this.exchangeInput = this.querySelector('textarea[name="exchange"]');
    }
    update(offer) {
        this.titleInput.value = offer.title;
        this.descriptionInput.value = offer.description;
        this.categoryInput.value = offer.category;
        this.typeInput.value = offer.type;
        this.exchangeInput.value = offer.exchange || '';
        this.locationInput.value = offer.location || '';
    }
    getEntries() {
        return {
            title: this.titleInput.value,
            description: this.descriptionInput.value,
            category: this.categoryInput.value,
            type: this.typeInput.value,
            exchange: this.exchangeInput.value,
            location: this.locationInput.value
        };
    }
}


/***/ })

}]);
//# sourceMappingURL=src_elements_OfferForm_ts.index.js.map