"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_OfferPage_ts"],{

/***/ "./src/controllers/OfferController.ts":
/*!********************************************!*\
  !*** ./src/controllers/OfferController.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferController)
/* harmony export */ });
/* harmony import */ var _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../fetches/OfferFetch */ "./src/fetches/OfferFetch.ts");

class OfferController {
    constructor(view) {
        this.view = view;
    }
    async load(offerID) {
        const offer = await _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_0__["default"].get(offerID);
        console.log(offer);
        this.view.update(offer);
        this.model = offer;
    }
}


/***/ }),

/***/ "./src/elements/OfferPage.ts":
/*!***********************************!*\
  !*** ./src/elements/OfferPage.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferPage)
/* harmony export */ });
/* harmony import */ var _html_offer_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/offer-page.html */ "./src/html/offer-page.html");
/* harmony import */ var _controllers_OfferController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/OfferController */ "./src/controllers/OfferController.ts");


class OfferPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_offer_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        const urlParams = new URLSearchParams(window.location.search);
        const offerID = urlParams.get("id");
        const offerElement = this.querySelector("offer-element");
        new _controllers_OfferController__WEBPACK_IMPORTED_MODULE_1__["default"](offerElement)
            .load(offerID);
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

/***/ "./src/html/offer-page.html":
/*!**********************************!*\
  !*** ./src/html/offer-page.html ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La barre de navigation est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Petit espacement vertical sous la navbar -->\r\n<div class=\"pt-4\"></div>\r\n\r\n<!-- Conteneur principal de la page -->\r\n<main class=\"container py-4\">\r\n\r\n    <offer-element>\r\n\r\n        <!-- Grille Bootstrap principale. g-5 ajoute un large espacement (gutter) entre les colonnes -->\r\n        <div class=\"row g-5\">\r\n\r\n            <!-- SECTION GAUCHE (Contenu principal de l'annonce) - 8 colonnes sur grand écran -->\r\n            <section class=\"col-lg-8\">\r\n\r\n                <!-- Titre de l'annonce -->\r\n                <h1 class=\"offer-title fw-bolder mb-2\">Tondeuse à Gazon Thermique Puissante</h1>\r\n\r\n                <!-- Badges pour la catégorie et le type d'offre -->\r\n                <div class=\"mb-4\">\r\n                    <span class=\"offer-category badge bg-primary text-uppercase me-2\">\r\n                        ?\r\n                    </span>\r\n                    <span class=\"offer-type badge bg-warning text-dark text-uppercase\">\r\n                        ?\r\n                    </span>\r\n                </div>\r\n\r\n                <!-- Carousel (diaporama d'images) de l'annonce -->\r\n                <div class=\"carousel slide mb-5\" data-bs-ride=\"carousel\" id=\"offer-carousel\">\r\n                    <!-- Indicateurs (les petits points en bas) -->\r\n                    <div class=\"carousel-indicators\">\r\n                        <button type=\"button\" data-bs-target=\"#offer-carousel\" data-bs-slide-to=\"0\" class=\"active\"\r\n                            aria-current=\"true\" aria-label=\"Slide 1\"></button>\r\n                        <button type=\"button\" data-bs-target=\"#offer-carousel\" data-bs-slide-to=\"1\"\r\n                            aria-label=\"Slide 2\"></button>\r\n                    </div>\r\n\r\n                    <!-- Conteneur pour les images (slides) -->\r\n                    <div id=\"offer-image-container\" class=\"carousel-inner rounded-3 shadow-lg\">\r\n                        <!-- Slide 1 (active = visible au chargement) -->\r\n                        <div class=\"carousel-item active\">\r\n                            <img src=\"https://placehold.co/800x450/33A366/ffffff?text=Image+1\" class=\"d-block w-100\"\r\n                                alt=\"Image 1 de l'annonce\">\r\n                        </div>\r\n                        <!-- Slide 2 -->\r\n                        <div class=\"carousel-item\">\r\n                            <img src=\"https://placehold.co/800x450/33A366/ffffff?text=Image+2\" class=\"d-block w-100\"\r\n                                alt=\"Image 2 de l'annonce\">\r\n                        </div>\r\n                    </div>\r\n\r\n                    <!-- Contrôles (flèches) Précédent/Suivant -->\r\n                    <button class=\"carousel-control-prev\" type=\"button\" data-bs-target=\"#offer-carousel\"\r\n                        data-bs-slide=\"prev\">\r\n                        <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n                        <span class=\"visually-hidden\">Précédent</span>\r\n                    </button>\r\n                    <button class=\"carousel-control-next\" type=\"button\" data-bs-target=\"#offer-carousel\"\r\n                        data-bs-slide=\"next\">\r\n                        <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n                        <span class=\"visually-hidden\">Suivant</span>\r\n                    </button>\r\n                </div>\r\n\r\n                <!-- Section Description -->\r\n                <h3 class=\"border-bottom pb-2 mb-3 text-secondary\">Description de l'Offre</h3>\r\n                <p class=\"offer-description lead text-muted\">\r\n                    <!-- ? = Emplacement pour la description dynamique -->\r\n                    ?\r\n                </p>\r\n\r\n                <!-- Section \"En échange de\" -->\r\n                <h3 class=\"border-bottom pb-2 mb-3 mt-5 text-secondary\">Ce qui est demandé en Échange</h3>\r\n                <!-- Carte stylisée pour mettre en avant la demande -->\r\n                <div class=\"card border-warning mb-4\">\r\n                    <div class=\"card-body\">\r\n                        <i class=\"bi bi-info-circle-fill text-warning me-2\"></i>\r\n                        <!-- ? = Emplacement pour la demande d'échange dynamique -->\r\n                        <p class=\"offer-exchange\"></p>\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- Section Localisation -->\r\n                <h3 class=\"border-bottom pb-2 mb-3 mt-5 text-secondary\">Localisation</h3>\r\n                <p class=\"mb-5\">\r\n                    <i class=\"offer-location bi bi-geo-alt-fill text-danger me-2\"></i>\r\n                </p>\r\n            </section>\r\n\r\n            <!-- SECTION DROITE (Barre latérale) - 4 colonnes sur grand écran -->\r\n            <aside class=\"col-lg-4\">\r\n\r\n                <!-- Carte \"Propriétaire\" -->\r\n                <div class=\"card mb-4 shadow-lg text-center p-3\">\r\n                    <div class=\"card-body\">\r\n                        <h4 class=\"card-title text-primary mb-3\">Le Propriétaire</h4>\r\n\r\n                        <!-- Composant personnalisé pour les infos utilisateur -->\r\n                        <user-element class=\"offer-seller\">\r\n                            <!-- Avatar -->\r\n                            <img alt=\"Vendeur\" width=\"80\" height=\"80\"\r\n                                class=\"user-avatar rounded-circle mb-3 border border-3 border-primary shadow\">\r\n\r\n                            <!-- Nom (dynamique) -->\r\n                            <h5 class=\"user-name fw-bold mb-1\">\r\n                                ?\r\n                            </h5>\r\n                            <!-- Note (dynamique) -->\r\n                            <p class=\"user-rating mb-3 text-warning\">\r\n                                ?\r\n                            </p>\r\n                            <!-- Lien vers le profil -->\r\n                            <a class=\"user-profile-button btn btn-outline-primary w-100 mt-2\">Voir le Profil</a>\r\n                        </user-element>\r\n\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- Carte \"Proposer un Échange\" (Formulaire) -->\r\n                <div class=\"card shadow-lg border-success\">\r\n                    <div class=\"card-header bg-success text-white fw-bold\">\r\n                        Proposer un Échange\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                        <form>\r\n                            <!-- Champ: Contre-proposition -->\r\n                            <div class=\"mb-3\">\r\n                                <label for=\"proposition-text\" class=\"form-label fw-bold\">Votre Contre-Proposition <span\r\n                                        class=\"text-danger\">*</span></label>\r\n                                <textarea id=\"proposition-text\" class=\"form-control\" rows=\"3\" required\r\n                                    placeholder=\"Ex: Je vous offre une heure de cours de cuisine...\"></textarea>\r\n                            </div>\r\n                            <!-- Champ: Disponibilité -->\r\n                            <div class=\"mb-3\">\r\n                                <label for=\"disponibility-input\" class=\"form-label fw-bold\">Votre Disponibilité <span\r\n                                        class=\"text-danger\">*</span></label>\r\n                                <input id=\"disponibility-input\" type=\"text\" class=\"form-control\" required\r\n                                    placeholder=\"Ex: Disponible le 15/11 ou tous les weekends.\">\r\n                            </div>\r\n                            <!-- Bouton d'envoi -->\r\n                            <button type=\"submit\" class=\"btn btn-success w-100 btn-lg mt-2\">Envoyer la Demande</button>\r\n                            <p class=\"mt-3 text-center\"><small class=\"text-muted\">Vous recevrez une notification après\r\n                                    acceptation.</small></p>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </aside>\r\n        </div>\r\n    </offer-element>\r\n</main>");

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
//# sourceMappingURL=src_elements_OfferPage_ts.index.js.map