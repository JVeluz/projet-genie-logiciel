"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_OfferElement_ts"],{

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
        const typeElement = this.querySelector('.offer-type');
        const descriptionElement = this.querySelector('.offer-description');
        const categoryElement = this.querySelector('.offer-category');
        const locationElement = this.querySelector('.offer-location');
        const exchangeElement = this.querySelector('.offer-exchange');
        if (lookupButton)
            lookupButton.href = `/offer?id=${offer._id}`;
        if (titleElement)
            titleElement.textContent = offer.title === "" ? "Sans titre" : offer.title;
        if (typeElement)
            typeElement.textContent = offer.type;
        if (descriptionElement)
            descriptionElement.textContent = offer.description;
        if (categoryElement)
            categoryElement.textContent = offer.category || "";
        if (locationElement)
            locationElement.textContent = offer.location || "Non spécifiée";
        if (exchangeElement)
            exchangeElement.textContent = offer.exchange || "Non spécifiée";
    }
}


/***/ })

}]);
//# sourceMappingURL=src_elements_OfferElement_ts.index.js.map