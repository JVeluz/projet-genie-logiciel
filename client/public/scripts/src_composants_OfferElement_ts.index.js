"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_composants_OfferElement_ts"],{

/***/ "./src/composants/OfferElement.ts":
/*!****************************************!*\
  !*** ./src/composants/OfferElement.ts ***!
  \****************************************/
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
            titleElement.textContent = offer.title;
        if (typeElement)
            typeElement.textContent = offer.type;
        if (descriptionElement)
            descriptionElement.textContent = offer.description;
        if (categoryElement)
            categoryElement.textContent = this.getOfferCategory(offer);
        if (locationElement)
            locationElement.textContent = this.getOfferLocation(offer);
        if (exchangeElement)
            exchangeElement.textContent = this.getOfferExchange(offer);
    }
    getOfferCategory(offer) {
        return offer.category || "";
    }
    getOfferLocation(offer) {
        return offer.location || "Non spécifiée";
    }
    getOfferExchange(offer) {
        return offer.exchange || "Non spécifiée";
    }
}


/***/ })

}]);
//# sourceMappingURL=src_composants_OfferElement_ts.index.js.map