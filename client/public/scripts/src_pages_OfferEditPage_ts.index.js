"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_pages_OfferEditPage_ts"],{

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

/***/ "./src/controllers/OfferEditPageController.ts":
/*!****************************************************!*\
  !*** ./src/controllers/OfferEditPageController.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferEditPageController)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");
/* harmony import */ var _models_Offer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/Offer */ "./src/models/Offer.ts");
/* harmony import */ var _services_OfferService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/OfferService */ "./src/services/OfferService.ts");



class OfferEditPageController {
    constructor(preview, form, createButton, updateButton, deleteButton) {
        this.preview = preview;
        this.form = form;
        this.createButton = createButton;
        this.updateButton = updateButton;
        this.deleteButton = deleteButton;
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.currentUser = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance().get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser);
        this.offer = new _models_Offer__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.initialize();
    }
    async initialize() {
        // URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const offerID = urlParams.get("id");
        if (!offerID) {
            console.log("Offer ID is missing in URL parameters.");
            return;
        }
        // Load offer data
        try {
            this.offer = await _services_OfferService__WEBPACK_IMPORTED_MODULE_2__["default"].getByID(offerID);
        }
        catch (error) {
            console.error("Failed to load offer:", error);
            return;
        }
        // Update form and preview
        this.form.update(this.offer);
        this.preview.update(this.offer);
        this.connectEvents();
    }
    connectEvents() {
        this.createButton.onclick = (event) => this.onCreateButton(event);
        this.updateButton.onclick = (event) => this.onUpdateButton(event);
        this.deleteButton.onclick = (event) => this.onDeleteButton(event);
        this.form.oninput = () => this.onChange();
    }
    async onCreateButton(event) {
        event.preventDefault();
        let newOffer;
        try {
            newOffer = await _services_OfferService__WEBPACK_IMPORTED_MODULE_2__["default"].create(this.offer, this.currentUser);
        }
        catch (error) {
            alert(error.message);
            return;
        }
        window.location.href = `/offer?id=${newOffer._id}`;
    }
    async onUpdateButton(event) {
        event.preventDefault();
        this.offer = this.form.getEntries();
        try {
            await _services_OfferService__WEBPACK_IMPORTED_MODULE_2__["default"].update(this.offer, this.currentUser);
        }
        catch (error) {
            alert(error.message);
            return;
        }
        window.location.href = `/offer?id=${this.offer._id}`;
    }
    async onDeleteButton(event) {
        event.preventDefault();
        try {
            await _services_OfferService__WEBPACK_IMPORTED_MODULE_2__["default"].delete(this.offer, this.currentUser);
        }
        catch (error) {
            alert(error.message);
            return;
        }
        window.location.href = `/user?id=${this.offer.sellerID}`;
    }
    onChange() {
        this.offer = this.form.getEntries();
        this.preview.update(this.offer);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La navbar est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Contenu Principal -->\r\n<main class=\"container py-5\">\r\n    <!-- Passage à une structure en 2 colonnes avec espacement g-5 -->\r\n    <div class=\"row g-5 justify-content-center\">\r\n\r\n        <!-- COLONNE 1: FORMULAIRE D'ÉDITION -->\r\n        <div class=\"col-12 col-lg-7\">\r\n\r\n            <h2 class=\"page-title text-center fw-bold text-primary mb-4\">Modifier votre annonce</h2>\r\n\r\n            <!-- Carte principale contenant le formulaire -->\r\n            <div class=\"card shadow-lg border-0\">\r\n                <div class=\"card-body p-4 p-md-5\">\r\n\r\n                    <!-- Formulaire d'édition d'annonce -->\r\n                    <form is=\"offer-form\" class=\"offer-form\">\r\n\r\n                        <!-- Champ Titre -->\r\n                        <div class=\"mb-3\">\r\n                            <label class=\"form-label fw-bold\">Titre de l'annonce</label>\r\n                            <input name=\"title\" type=\"text\" class=\"form-control\" placeholder=\"Ex: Tondeuse à gazon\"\r\n                                required>\r\n                        </div>\r\n\r\n                        <div class=\"row\">\r\n                            <!-- Champ Catégorie -->\r\n                            <div class=\"col-md-6 mb-3\">\r\n                                <label class=\"form-label fw-bold\">Catégorie</label>\r\n                                <select name=\"category\" class=\"form-select\" required>\r\n                                    <option value=\"\" selected disabled>Choisir...</option>\r\n                                    <option value=\"Jardinage\">Jardinage</option>\r\n                                    <option value=\"Informatique\">Informatique</option>\r\n                                    <option value=\"Bricolage\">Bricolage</option>\r\n                                    <option value=\"Services\">Services</option>\r\n                                    <option value=\"Autre\">Autre</option>\r\n                                </select>\r\n                            </div>\r\n                            <!-- Champ Type d'offre -->\r\n                            <div class=\"col-md-6 mb-3\">\r\n                                <label class=\"form-label fw-bold\">Type d'offre</label>\r\n                                <select name=\"type\" class=\"form-select\" required>\r\n                                    <option value=\"\" selected disabled>Choisir...</option>\r\n                                    <option value=\"Prêt d'Objet\">Prêt d'Objet</option>\r\n                                    <option value=\"Offre de Compétence\">Offre de Compétence</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Champ Description -->\r\n                        <div class=\"mb-3\">\r\n                            <label class=\"form-label fw-bold\">Description</label>\r\n                            <textarea name=\"description\" class=\"form-control\" rows=\"5\"\r\n                                placeholder=\"Décrivez ce que vous proposez...\" required></textarea>\r\n                        </div>\r\n\r\n                        <!-- Champ \"En échange de...\" -->\r\n                        <div class=\"mb-3\">\r\n                            <label class=\"form-label fw-bold\">Ce que vous recherchez en échange</label>\r\n                            <textarea name=\"exchange\" class=\"form-control\" rows=\"3\"\r\n                                placeholder=\"Ex: Un cours de cuisine...\" required></textarea>\r\n                        </div>\r\n\r\n                        <!-- Champ Localisation -->\r\n                        <div class=\"mb-3\">\r\n                            <label class=\"form-label fw-bold\">Localisation</label>\r\n                            <input name=\"location\" type=\"text\" class=\"form-control\" placeholder=\"Ex: Pau, 64000\"\r\n                                required>\r\n                        </div>\r\n\r\n                        <!-- NOUVEAU CHAMP: Prix Demandé -->\r\n                        <div class=\"mb-3\">\r\n                            <label class=\"form-label fw-bold\">Prix / Valeur estimée (Optionnel)</label>\r\n                            <div class=\"input-group\">\r\n                                <input name=\"price\" type=\"number\" class=\"form-control\" placeholder=\"Ex: 50\" min=\"0\"\r\n                                    step=\"1\">\r\n                                <span class=\"input-group-text\">€</span>\r\n                            </div>\r\n                            <div class=\"form-text\">Laissez vide si c'est un pur échange ou un don.</div>\r\n                        </div>\r\n\r\n                        <!-- Champ Images -->\r\n                        <div class=\"mb-3\">\r\n                            <label class=\"form-label fw-bold\">Ajouter des photos</label>\r\n                            <input name=\"pictures\" class=\"form-control\" type=\"file\" accept=\"image/*\">\r\n                            <div class=\"form-text\">La première image sera utilisée pour l'aperçu.</div>\r\n                        </div>\r\n\r\n                        <hr class=\"my-4\">\r\n\r\n                        <!-- Boutons d'action (Mode Édition) -->\r\n                        <div class=\"d-flex flex-wrap justify-content-between align-items-center\">\r\n                            <!-- Bouton Supprimer (à gauche) -->\r\n                            <button type=\"button\" class=\"offer-delete-button btn btn-outline-danger\"\r\n                                data-bs-toggle=\"modal\" data-bs-target=\"#deleteConfirmModal\">\r\n                                <i class=\"bi bi-trash-fill me-2\"></i>\r\n                                Supprimer l'annonce\r\n                            </button>\r\n\r\n                            <!-- Groupe de boutons (à droite) -->\r\n                            <div>\r\n                                <a href=\"/\" class=\"btn btn-outline-secondary me-2\">\r\n                                    Annuler\r\n                                </a>\r\n                                <button type=\"button\" class=\"offer-update-button btn btn-primary btn-lg\">\r\n                                    <i class=\"bi bi-save-fill me-2\"></i>\r\n                                    Enregistrer les modifications\r\n                                </button>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div> <!-- Fin de la colonne formulaire -->\r\n\r\n        <!-- COLONNE 2: APERÇU DE L'OFFRE (Statique) -->\r\n        <div class=\"col-12 col-lg-5\">\r\n            <div class=\"sticky-top\" style=\"top: 2rem;\">\r\n                <h4 class=\"text-center text-primary mb-4\">Aperçu de l'annonce</h4>\r\n                <!-- Carte d'aperçu (style inspiré de la page de détail) -->\r\n                <div class=\"card shadow-lg border-0\">\r\n                    <offer-element class=\"offer-preview\">\r\n                        <!-- Image d'aperçu -->\r\n                        <img src=\"https://placehold.co/800x450/eee/ccc?text=Image+de+l'annonce\"\r\n                            class=\"card-img-top preview-card-image\" alt=\"Aperçu\">\r\n\r\n                        <div class=\"card-body p-4\">\r\n                            <!-- Titre -->\r\n                            <h3 class=\"offer-title card-title fw-bolder preview-title\">\r\n                                Titre de votre annonce\r\n                            </h3>\r\n\r\n                            <!-- APERÇU: Prix -->\r\n                            <h4 class=\"offer-price text-success fw-bold mb-3\">\r\n                                Prix ou valeur\r\n                            </h4>\r\n\r\n                            <!-- Badges -->\r\n                            <div>\r\n                                <span class=\"offer-category badge bg-primary text-uppercase me-2\">\r\n                                    Catégorie\r\n                                </span>\r\n                                <span class=\"offer-type badge bg-warning text-dark text-uppercase\">\r\n                                    Type\r\n                                </span>\r\n                            </div>\r\n\r\n                            <hr>\r\n\r\n                            <!-- Description -->\r\n                            <p class=\"offer-description card-text text-muted preview-description\">\r\n                                Votre description apparaîtra ici...\r\n                            </p>\r\n\r\n                            <h6 class=\"text-secondary mt-4\">Échange souhaité :</h6>\r\n                            <!-- Échange -->\r\n                            <p class=\"offer-exchange card-text fst-italic preview-exchange\">\r\n                                Ce que vous recherchez en échange...\r\n                            </p>\r\n\r\n                            <h6 class=\"text-secondary mt-4\">Localisation :</h6>\r\n                            <!-- Localisation -->\r\n                            <p class=\"offer-location card-text fw-bold preview-location\">\r\n                                <i class=\"bi bi-geo-alt-fill text-danger me-2\"></i>\r\n                                Votre localisation...\r\n                            </p>\r\n                        </div>\r\n                    </offer-element>\r\n                </div>\r\n            </div>\r\n        </div> <!-- Fin de la colonne aperçu -->\r\n    </div>\r\n</main>");

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

/***/ "./src/pages/OfferEditPage.ts":
/*!************************************!*\
  !*** ./src/pages/OfferEditPage.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferEditPage)
/* harmony export */ });
/* harmony import */ var _html_offer_edit_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/offer-edit-page.html */ "./src/html/offer-edit-page.html");
/* harmony import */ var _controllers_OfferEditPageController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/OfferEditPageController */ "./src/controllers/OfferEditPageController.ts");


class OfferEditPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_offer_edit_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        const pageTitle = this.querySelector(".page-title");
        const offerForm = this.querySelector(".offer-form");
        const offerPreview = this.querySelector(".offer-preview");
        const createButton = this.querySelector(".offer-create-button");
        const updateButton = this.querySelector(".offer-update-button");
        const deleteButton = this.querySelector(".offer-delete-button");
        const confirmDeleteButton = this.querySelector(".offer-confirm-delete-button");
        new _controllers_OfferEditPageController__WEBPACK_IMPORTED_MODULE_1__["default"](offerPreview, offerForm, createButton, updateButton, confirmDeleteButton);
        const editMode = true;
        if (editMode) {
            createButton.style.display = "none";
            updateButton.style.display = "block";
            deleteButton.style.display = "block";
            pageTitle.textContent = "Modifier l'offre";
        }
        else {
            createButton.style.display = "block";
            updateButton.style.display = "none";
            deleteButton.style.display = "none";
            pageTitle.textContent = "Créer une offre";
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
//# sourceMappingURL=src_pages_OfferEditPage_ts.index.js.map