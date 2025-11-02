"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_OfferSearchPage_ts"],{

/***/ "./src/controllers/SearchOfferController.ts":
/*!**************************************************!*\
  !*** ./src/controllers/SearchOfferController.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchPageController)
/* harmony export */ });
/* harmony import */ var _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../fetches/OfferFetch */ "./src/fetches/OfferFetch.ts");

class SearchPageController {
    constructor(view, searchForm, filterForm) {
        this.view = view;
        this.searchForm = searchForm;
        this.filterForm = filterForm;
        this.searchForm.onsubmit = (event) => this.onSearchSubmit(event);
        this.filterForm.onsubmit = (event) => this.onSearchSubmit(event);
    }
    async onSearchSubmit(event) {
        event.preventDefault();
        const search = Object.fromEntries(new FormData(this.searchForm));
        const filter = Object.fromEntries(new FormData(this.filterForm));
        const query = { search, filter };
        console.log(`onSearchSubmit(${JSON.stringify(query)})`);
        const result = await _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_0__["default"].getAll();
        this.view.update(result);
    }
}


/***/ }),

/***/ "./src/elements/OfferSearchPage.ts":
/*!*****************************************!*\
  !*** ./src/elements/OfferSearchPage.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferSearchPage)
/* harmony export */ });
/* harmony import */ var _html_offer_search_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/offer-search-page.html */ "./src/html/offer-search-page.html");
/* harmony import */ var _controllers_SearchOfferController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/SearchOfferController */ "./src/controllers/SearchOfferController.ts");
/* harmony import */ var _html_offer_card_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../html/offer-card.html */ "./src/html/offer-card.html");



class OfferSearchPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_offer_search_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        this.offerContainer = this.querySelector(".offer-container");
        new _controllers_SearchOfferController__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.querySelector("#search-form"), this.querySelector("#filter-form"));
    }
    update(offers) {
        this.offerContainer.innerHTML = "";
        for (const offer of offers) {
            const offerElement = document.createElement("offer-element");
            offerElement.innerHTML = _html_offer_card_html__WEBPACK_IMPORTED_MODULE_2__["default"];
            customElements.whenDefined("offer-element").then(() => {
                offerElement.update(offer);
                this.offerContainer.appendChild(offerElement);
            });
        }
    }
}


/***/ }),

/***/ "./src/fetches/OfferFetch.ts":
/*!***********************************!*\
  !*** ./src/fetches/OfferFetch.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferFetch)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");

class OfferFetch {
    static async fetch(route, method, body) {
        const token = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.AuthToken);
        const headers = { "Content-Type": "application/json" };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        return await fetch(`${"http://localhost:3000"}${route}`, {
            method, headers, body: JSON.stringify(body)
        });
    }
    static async get(offerId) {
        const response = await this.fetch(`/offers/${offerId}`, "GET");
        if (response.ok === false)
            throw new Error("Failed to fetch offer");
        return response.json();
    }
    static async getAll() {
        const response = await this.fetch("/offers", "GET");
        if (response.ok === false)
            throw new Error("Failed to fetch offers");
        return response.json();
    }
    static async create(offer) {
        const response = await this.fetch("/offers", "POST", offer);
        if (response.ok === false)
            throw new Error("Failed to create offer");
        return response.json();
    }
    static async update(offer) {
        const response = await this.fetch(`/offers/${offer._id}`, "PUT", offer);
        if (response.ok === false)
            throw new Error("Failed to update offer");
        return response.json();
    }
    static async delete(offerId) {
        const response = await this.fetch(`/offers/${offerId}`, "DELETE");
        if (response.ok === false)
            throw new Error("Failed to delete offer");
    }
    static async search(terms) {
        const response = await this.fetch(`/offers/search/${terms}`, "GET");
        if (response.ok === false)
            throw new Error("Failed to search offers");
        return response.json();
    }
}


/***/ }),

/***/ "./src/html/offer-card.html":
/*!**********************************!*\
  !*** ./src/html/offer-card.html ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<a class=\"offer-lookup-button card shadow-sm\">\r\n    <img src=\"https://placehold.co/600x400\" class=\"card-img-top\" alt=\"Titre de l'objet\">\r\n    <div class=\"card-body\">\r\n        <h5 class=\"offer-title card-title text-primary\">\r\n            ?\r\n        </h5>\r\n        <p class=\"offer-description card-text\">\r\n            ?\r\n        </p>\r\n    </div>\r\n</a>");

/***/ }),

/***/ "./src/html/offer-search-page.html":
/*!*****************************************!*\
  !*** ./src/html/offer-search-page.html ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<navbar-element></navbar-element>\r\n\r\n<div class=\"pt-4\"></div>\r\n\r\n<main class=\"container\">\r\n    <div class=\"row\">\r\n        <aside class=\"col-lg-3 mb-4\">\r\n\r\n            <div class=\"card border-0 shadow-sm\">\r\n                <div class=\"card-header bg-primary text-white fw-bold\">\r\n                    Filtres de Recherche\r\n                </div>\r\n                <div class=\"card-body\">\r\n\r\n                    <form id=\"filter-form\">\r\n                        <h6 class=\"card-title text-muted mb-3\">Catégorie</h6>\r\n                        <div class=\"form-check mb-2\">\r\n                            <input checked name=\"enable-objects\" class=\"form-check-input\" type=\"checkbox\"\r\n                                id=\"filter-objects\" value=\"true\">\r\n                            <label class=\"form-check-label\" for=\"filter-objects\">Objets</label>\r\n                        </div>\r\n                        <div class=\"form-check\">\r\n                            <input checked name=\"enable-skills\" class=\"form-check-input\" type=\"checkbox\"\r\n                                id=\"filter-skills\" value=\"true\">\r\n                            <label class=\"form-check-label\" for=\"filter-skills\">Compétences</label>\r\n                        </div>\r\n\r\n                        <hr class=\"my-3\">\r\n\r\n                        <h6 class=\"card-title text-muted mb-3\">Localisation</h6>\r\n                        <input name=\"location\" type=\"text\" class=\"form-control\" placeholder=\"Ville ou code postal\"\r\n                            aria-label=\"Localisation\">\r\n\r\n                        <hr class=\"my-3\">\r\n\r\n                        <button class=\"btn btn-primary w-100 mt-2\" type=\"submit\">Appliquer les filtres</button>\r\n                    </form>\r\n\r\n                </div>\r\n            </div>\r\n\r\n        </aside>\r\n\r\n        <section class=\"col-lg-9\">\r\n\r\n            <form id=\"search-form\" class=\"mb-4\">\r\n                <div class=\"input-group input-group-lg shadow-sm\">\r\n                    <input name=\"input\" class=\"form-control border-end-0\"\r\n                        placeholder=\"Rechercher des objets ou des compétences...\" aria-label=\"Rechercher\">\r\n                    <button class=\"btn btn-warning\" type=\"submit\" aria-label=\"Lancer la recherche\">\r\n                        <i class=\"bi bi-search\"></i>\r\n                    </button>\r\n                </div>\r\n            </form>\r\n\r\n            <h2 class=\"mb-3\">Annonces Disponibles</h2>\r\n\r\n            <div class=\"offer-container row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4\">\r\n            </div>\r\n\r\n        </section>\r\n    </div>\r\n</main>");

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
})(Item || (Item = {}));
class Application {
    constructor() {
        this.listeners = {};
    }
    static getInstance() {
        if (this.instance === null)
            this.instance = new Application();
        return this.instance;
    }
    addListener(item, listener) {
        if (this.listeners[item] === undefined)
            this.listeners[item] = [];
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
        if (this.listeners[item] === undefined)
            return;
        for (const listener of this.listeners[item])
            listener(this.get(item));
    }
}
Application.instance = null;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Application);


/***/ })

}]);
//# sourceMappingURL=src_elements_OfferSearchPage_ts.index.js.map