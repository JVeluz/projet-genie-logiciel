"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_pages_OfferSearchPage_ts"],{

/***/ "./src/ServerAPI.ts":
/*!**************************!*\
  !*** ./src/ServerAPI.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/Application */ "./src/models/Application.ts");

class ServerAPI {
    static request(route, method, body) {
        const key = `${method}::${route}::${JSON.stringify(body)}`;
        if (this.pendingRequests.has(key)) {
            return this.pendingRequests.get(key);
        }
        const fetchPromise = this.fetch(route, method, body);
        const promiseToReturn = fetchPromise.finally(() => {
            this.pendingRequests.delete(key);
        });
        this.pendingRequests.set(key, promiseToReturn);
        return promiseToReturn;
    }
    static async fetch(route, method, body) {
        const token = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.AuthToken);
        const headers = { "Content-Type": "application/json" };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        let response;
        try {
            response = await fetch(`${"http://localhost:3000"}${route}`, {
                method, headers, body
            });
        }
        catch (networkError) {
            console.error("Fetch network error:", networkError);
            throw new Error("Network error: Failed to connect to API.");
        }
        if (response.ok === false) {
            const errorBody = await response.text();
            console.error(`API Error: ${response.status} ${response.statusText}`, errorBody);
            throw new Error(`API request failed with status ${response.status}`);
        }
        // (204 No Content)
        if (response.status === 204) {
            return null;
        }
        return response.json();
    }
    static get(route) {
        return this.request(route, "GET");
    }
    static post(route, body) {
        return this.request(route, "POST", body);
    }
    static put(route, body) {
        return this.request(route, "PUT", body);
    }
    static delete(route) {
        return this.request(route, "DELETE");
    }
}
ServerAPI.pendingRequests = new Map();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ServerAPI);


/***/ }),

/***/ "./src/controllers/OfferSearchPageController.ts":
/*!******************************************************!*\
  !*** ./src/controllers/OfferSearchPageController.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferSearchPageController)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");
/* harmony import */ var _services_OfferService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/OfferService */ "./src/services/OfferService.ts");


class OfferSearchPageController {
    constructor(page, searchForm, filterForm) {
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.page = page;
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
        this.application.loading = true;
        let result;
        try {
            result = await _services_OfferService__WEBPACK_IMPORTED_MODULE_1__["default"].getAll(); // TODO: Pass query to service
        }
        catch (error) {
            return;
        }
        this.page.update(result);
        this.application.loading = false;
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<a class=\"offer-lookup-button card shadow-sm text-decoration-none\">\r\n    <img src=\"https://placehold.co/600x400\" class=\"card-img-top\" alt=\"Titre de l'objet\">\r\n    <div class=\"card-body\">\r\n        <h5 class=\"offer-title card-title text-primary\">\r\n            ?\r\n        </h5>\r\n        <p class=\"offer-description card-text text-truncate\">\r\n            ?\r\n        </p>\r\n    </div>\r\n</a>");

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
        this.loading = false;
        this.listeners = {};
        for (const item in Item)
            this.listeners[Item[item]] = [];
        console.log(localStorage);
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


/***/ }),

/***/ "./src/models/Offer.ts":
/*!*****************************!*\
  !*** ./src/models/Offer.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Offer)
/* harmony export */ });
class Offer {
    static fromJSON(data) {
        const offer = new Offer();
        offer._id = data._id;
        offer.title = data.title;
        offer.description = data.description;
        offer.price = data.price;
        offer.available = data.available;
        offer.category = data.category;
        offer.type = data.type;
        offer.createdAt = new Date(data.createdAt);
        offer.sellerID = data.sellerID;
        offer.chatIDs = data.chatIDs;
        offer.exchange = data.exchange;
        offer.location = data.location;
        offer.pictures = data.pictures;
        offer.comments = data.comments;
        return offer;
    }
}


/***/ }),

/***/ "./src/pages/OfferSearchPage.ts":
/*!**************************************!*\
  !*** ./src/pages/OfferSearchPage.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferSearchPage)
/* harmony export */ });
/* harmony import */ var _html_offer_search_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/offer-search-page.html */ "./src/html/offer-search-page.html");
/* harmony import */ var _controllers_OfferSearchPageController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/OfferSearchPageController */ "./src/controllers/OfferSearchPageController.ts");
/* harmony import */ var _html_offer_card_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../html/offer-card.html */ "./src/html/offer-card.html");



class OfferSearchPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_offer_search_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        this.offerContainer = this.querySelector(".offer-container");
        new _controllers_OfferSearchPageController__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.querySelector("#search-form"), this.querySelector("#filter-form"));
    }
    update(offers) {
        this.offerContainer.innerHTML = "";
        for (const offer of offers) {
            const offerElement = document.createElement("offer-element");
            offerElement.innerHTML = _html_offer_card_html__WEBPACK_IMPORTED_MODULE_2__["default"];
            offerElement.update(offer);
            this.offerContainer.appendChild(offerElement);
        }
    }
}


/***/ }),

/***/ "./src/repositories/OfferRepository.ts":
/*!*********************************************!*\
  !*** ./src/repositories/OfferRepository.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferRepository)
/* harmony export */ });
/* harmony import */ var _ServerAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ServerAPI */ "./src/ServerAPI.ts");
/* harmony import */ var _models_Offer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/Offer */ "./src/models/Offer.ts");


class OfferRepository {
    static async getAll() {
        return (await _ServerAPI__WEBPACK_IMPORTED_MODULE_0__["default"].get("/offers")).map(_models_Offer__WEBPACK_IMPORTED_MODULE_1__["default"].fromJSON);
    }
    static async getByID(offerID) {
        return _models_Offer__WEBPACK_IMPORTED_MODULE_1__["default"].fromJSON(await _ServerAPI__WEBPACK_IMPORTED_MODULE_0__["default"].get(`/offers/${offerID}`));
    }
    static async create(offer) {
        return _models_Offer__WEBPACK_IMPORTED_MODULE_1__["default"].fromJSON(await _ServerAPI__WEBPACK_IMPORTED_MODULE_0__["default"].post("/offers", JSON.stringify(offer)));
    }
    static async update(offer) {
        await _ServerAPI__WEBPACK_IMPORTED_MODULE_0__["default"].put(`/offers/${offer._id}`, JSON.stringify(offer));
    }
    static async delete(offerID) {
        await _ServerAPI__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/offers/${offerID}`);
    }
}


/***/ }),

/***/ "./src/services/OfferService.ts":
/*!**************************************!*\
  !*** ./src/services/OfferService.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferService)
/* harmony export */ });
/* harmony import */ var _repositories_OfferRepository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../repositories/OfferRepository */ "./src/repositories/OfferRepository.ts");

class OfferService {
    static async getAll() {
        return await _repositories_OfferRepository__WEBPACK_IMPORTED_MODULE_0__["default"].getAll();
    }
    static async getByID(offerID) {
        return await _repositories_OfferRepository__WEBPACK_IMPORTED_MODULE_0__["default"].getByID(offerID);
    }
    static async create(offer, currentUser) {
        if (!currentUser)
            throw new Error("Unauthorized: You must be logged in to create an offer.");
        offer.sellerID = currentUser._id;
        return await _repositories_OfferRepository__WEBPACK_IMPORTED_MODULE_0__["default"].create(offer);
    }
    static async update(offer, currentUser) {
        if (currentUser?._id !== offer.sellerID)
            throw new Error("Unauthorized: You can only update your own offers.");
        return await _repositories_OfferRepository__WEBPACK_IMPORTED_MODULE_0__["default"].update(offer);
    }
    static async delete(offer, currentUser) {
        if (currentUser?._id !== offer.sellerID)
            throw new Error("Unauthorized: You can only delete your own offers.");
        return await _repositories_OfferRepository__WEBPACK_IMPORTED_MODULE_0__["default"].delete(offer._id);
    }
}


/***/ })

}]);
//# sourceMappingURL=src_pages_OfferSearchPage_ts.index.js.map