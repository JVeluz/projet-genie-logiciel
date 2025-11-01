"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_EditOfferPage_ts"],{

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
        this.view.update(offer);
    }
}


/***/ }),

/***/ "./src/elements/EditOfferPage.ts":
/*!***************************************!*\
  !*** ./src/elements/EditOfferPage.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditOfferPage)
/* harmony export */ });
/* harmony import */ var _controllers_OfferController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/OfferController */ "./src/controllers/OfferController.ts");
/* harmony import */ var _html_offer_edit_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/offer-edit-page.html */ "./src/html/offer-edit-page.html");


class EditOfferPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_offer_edit_page_html__WEBPACK_IMPORTED_MODULE_1__["default"];
        const urlParams = new URLSearchParams(window.location.search);
        const offerID = urlParams.get('id');
        if (offerID) {
            new _controllers_OfferController__WEBPACK_IMPORTED_MODULE_0__["default"](this);
        }
    }
    update(offer) {
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
class OfferFetch {
    static async fetch(route, method, body) {
        return await fetch(`${"http://localhost:3000"}${route}`, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
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
    static async create(offerData) {
        const response = await this.fetch("/offers", "POST", offerData);
        if (response.ok === false)
            throw new Error("Failed to create offer");
        return response.json();
    }
    static async update(offerId, offerData) {
        const response = await this.fetch(`/offers/${offerId}`, "PUT", offerData);
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

/***/ "./src/html/offer-edit-page.html":
/*!***************************************!*\
  !*** ./src/html/offer-edit-page.html ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La navbar est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Contenu Principal -->\r\n<main class=\"container py-5\">\r\n    <div class=\"row justify-content-center\">\r\n        <div class=\"col-12 col-lg-8\">\r\n\r\n            <h2 class=\"text-center fw-bold text-primary mb-4\">Modifier votre annonce</h2>\r\n\r\n            <!-- Carte principale contenant le formulaire -->\r\n            <div class=\"card shadow-lg border-0\">\r\n                <div class=\"card-body p-4 p-md-5\">\r\n\r\n                    <form id=\"edit-offer-form\">\r\n\r\n                        <!-- Champ Titre -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"offer-title\" class=\"form-label fw-bold\">Titre de l'annonce</label>\r\n                            <input type=\"text\" class=\"form-control\" id=\"offer-title\"\r\n                                value=\"Tondeuse à Gazon Thermique Puissante\" required>\r\n                        </div>\r\n\r\n                        <!-- Ligne pour Catégorie et Type -->\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-6 mb-3\">\r\n                                <label for=\"offer-category\" class=\"form-label fw-bold\">Catégorie</label>\r\n                                <select class=\"form-select\" id=\"offer-category\" required>\r\n                                    <option value=\"jardinage\" selected>Jardinage</option>\r\n                                    <option value=\"bricolage\">Bricolage</option>\r\n                                    <option value=\"services\">Services</option>\r\n                                    <option value=\"maison\">Maison</option>\r\n                                </select>\r\n                            </div>\r\n                            <div class=\"col-md-6 mb-3\">\r\n                                <label for=\"offer-type\" class=\"form-label fw-bold\">Type d'offre</label>\r\n                                <select class=\"form-select\" id=\"offer-type\" required>\r\n                                    <option value=\"objet\" selected>Objet à Prêter</option>\r\n                                    <option value=\"competence\">Compétence</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Champ Description -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"offer-description\" class=\"form-label fw-bold\">Description</label>\r\n                            <textarea class=\"form-control\" id=\"offer-description\" rows=\"4\"\r\n                                required>Tondeuse de marque XYZ, bien entretenue. Idéale pour les grandes surfaces...</textarea>\r\n                        </div>\r\n\r\n                        <!-- Champ \"En échange de\" -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"offer-ask\" class=\"form-label fw-bold\">Ce que vous demandez en échange</label>\r\n                            <textarea class=\"form-control\" id=\"offer-ask\" rows=\"3\"\r\n                                required>Je souhaite l'échanger contre un cours d'initiation à la programmation...</textarea>\r\n                        </div>\r\n\r\n                        <!-- Champ Localisation -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"offer-location\" class=\"form-label fw-bold\">Localisation</label>\r\n                            <input type=\"text\" class=\"form-control\" id=\"offer-location\" value=\"Pau\" required>\r\n                        </div>\r\n\r\n                        <!-- Champ Gestion des Images -->\r\n                        <div class=\"mb-3\">\r\n                            <label class=\"form-label fw-bold\">Images actuelles</label>\r\n                            <!-- Simulation des images existantes -->\r\n                            <div>\r\n                                <img src=\"https://placehold.co/100x75/33A366/ffffff?text=Img+1\"\r\n                                    class=\"img-thumbnail me-2\" alt=\"Image 1\">\r\n                                <img src=\"https://placehold.co/100x75/33A366/ffffff?text=Img+2\" class=\"img-thumbnail\"\r\n                                    alt=\"Image 2\">\r\n                            </div>\r\n                            <label for=\"offer-images\" class=\"form-label mt-3\">Ajouter ou remplacer des images</label>\r\n                            <input class=\"form-control\" type=\"file\" id=\"offer-images\" multiple>\r\n                        </div>\r\n\r\n                        <hr class=\"my-4\">\r\n\r\n                        <!-- Boutons d'action -->\r\n                        <div class=\"d-flex flex-wrap justify-content-between align-items-center\">\r\n                            <!-- Bouton Enregistrer -->\r\n                            <button type=\"submit\" class=\"btn btn-primary btn-lg mb-2\">\r\n                                <i class=\"bi bi-check-circle me-2\"></i>Enregistrer\r\n                            </button>\r\n\r\n                            <!-- Bouton Annuler -->\r\n                            <a href=\"/profile\" class=\"btn btn-outline-secondary mb-2\">\r\n                                Annuler\r\n                            </a>\r\n\r\n                            <!-- Bouton Supprimer (ouvre le modal) -->\r\n                            <button type=\"button\" class=\"btn btn-outline-danger mb-2\" data-bs-toggle=\"modal\"\r\n                                data-bs-target=\"#deleteModal\">\r\n                                <i class=\"bi bi-trash me-2\"></i>Supprimer l'annonce\r\n                            </button>\r\n                        </div>\r\n\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</main>");

/***/ })

}]);
//# sourceMappingURL=src_elements_EditOfferPage_ts.index.js.map