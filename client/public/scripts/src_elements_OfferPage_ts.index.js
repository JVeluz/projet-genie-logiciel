"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_OfferPage_ts"],{

/***/ "./src/elements/OfferPage.ts":
/*!***********************************!*\
  !*** ./src/elements/OfferPage.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferPage)
/* harmony export */ });
/* harmony import */ var _fetches_ChatFetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../fetches/ChatFetch */ "./src/fetches/ChatFetch.ts");
/* harmony import */ var _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fetches/OfferFetch */ "./src/fetches/OfferFetch.ts");
/* harmony import */ var _fetches_UserFetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fetches/UserFetch */ "./src/fetches/UserFetch.ts");
/* harmony import */ var _html_offer_page_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../html/offer-page.html */ "./src/html/offer-page.html");
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");
/* harmony import */ var _models_Chat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/Chat */ "./src/models/Chat.ts");






const CHAT_PREVIEW = (chat, buyer) => {
    const lastMessage = chat.messages.length > 0 ?
        chat.messages[chat.messages.length - 1].content : "Pas de messages encore.";
    return `
        <a href="/offer/chat?id=${chat._id}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
                <strong class="mb-1">${buyer.name}</strong>    
                <p class="mb-0 text-muted text-truncate" style="max-width: 200px;">
                    ${lastMessage}
                </p>
            </div>
            <span class="badge bg-danger rounded-pill">
                *
            </span>
        </a>
    `;
};
class OfferPage extends HTMLElement {
    constructor() {
        super(...arguments);
        // URL Parameters
        this.urlParams = new URLSearchParams(window.location.search);
        this.offerID = this.urlParams.get("id");
        // Models
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance();
        this.currentUser = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_4__.Item.CurrentUser);
        this.token = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_4__.Item.AuthToken);
        this.offer = null;
        // Computed
        this.isOfferMine = false;
    }
    async connectedCallback() {
        await customElements.whenDefined("offer-page");
        await this.ready();
        await this.create();
    }
    async ready() {
        if (!this.offerID) {
            console.error("Offer ID is missing in URL parameters.");
            return;
        }
        this.offer = await _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_1__["default"].get(this.offerID);
        if (!this.offer) {
            console.error("Offer not found.");
            return;
        }
        if (this.currentUser) {
            this.isOfferMine = this.currentUser.offers.some(offer => offer._id === this.offerID);
        }
    }
    async create() {
        this.innerHTML = _html_offer_page_html__WEBPACK_IMPORTED_MODULE_3__["default"];
        const offerElement = this.querySelector("#offer-element");
        const userElement = this.querySelector("#offer-seller");
        const chatForm = this.querySelector("#new-chat-form");
        const editButton = this.querySelector("#offer-edit-button");
        const tradeCard = this.querySelector("#trade-card");
        const chatListCard = this.querySelector("#chat-list-card");
        const chatList = chatListCard.querySelector("#offer-chat-list");
        offerElement.setAttribute("offer-id", this.offerID);
        userElement.setAttribute("user-id", this.offer.sellerID);
        chatForm.setAttribute("offer-id", this.offerID);
        editButton.href = `/offer/edit?id=${this.offerID}`;
        for (const chatID of this.offer.chatIDs) {
            const chatElement = document.createElement("div");
            const result = await _fetches_ChatFetch__WEBPACK_IMPORTED_MODULE_0__["default"].get(chatID, this.token);
            const chat = _models_Chat__WEBPACK_IMPORTED_MODULE_5__["default"].fromJSON(result);
            const buyer = await _fetches_UserFetch__WEBPACK_IMPORTED_MODULE_2__["default"].get(chat.buyerID);
            chatElement.innerHTML = CHAT_PREVIEW(chat, buyer);
            chatList.appendChild(chatElement);
        }
        const displayChatListCard = this.offer.chatIDs.length > 0;
        editButton.style.display = this.isOfferMine ? "block" : "none";
        tradeCard.style.display = this.isOfferMine ? "none" : "block";
        chatListCard.style.display = displayChatListCard ? "block" : "none";
    }
}


/***/ }),

/***/ "./src/fetches/ChatFetch.ts":
/*!**********************************!*\
  !*** ./src/fetches/ChatFetch.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ChatFetch {
    static async request(route, method, body, token) {
        const requestKey = `${method}::${route}::${JSON.stringify(body)}`;
        if (this.pendingRequests.has(requestKey)) {
            return this.pendingRequests.get(requestKey);
        }
        const fetchPromise = (async () => {
            const headers = { "Content-Type": "application/json" };
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
            try {
                const response = await fetch(`${"http://localhost:3000"}${route}`, { method, headers, body: JSON.stringify(body) });
                if (response.ok === false) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            }
            finally {
                this.pendingRequests.delete(requestKey);
            }
        })();
        this.pendingRequests.set(requestKey, fetchPromise);
        return fetchPromise;
    }
    static async get(chatID, token) {
        return this.request(`/chats/${chatID}`, "GET", undefined, token);
    }
    static async getOrCreateWithMessage(offerID, buyerID, message, token) {
        const body = { offerID, buyerID, message };
        return this.request("/chats", "POST", body, token);
    }
    static async sendMessage(chatID, currentUserID, content, token) {
        const body = { senderID: currentUserID, content };
        return this.request(`/chats/${chatID}`, "POST", body, token);
    }
}
ChatFetch.pendingRequests = new Map();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatFetch);


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

/***/ "./src/fetches/UserFetch.ts":
/*!**********************************!*\
  !*** ./src/fetches/UserFetch.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserFetch)
/* harmony export */ });
class UserFetch {
    static async fetch(route, method, body) {
        let response = undefined;
        try {
            response = await fetch(`${"http://localhost:3000"}${route}`, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (response.ok === false) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
        }
        catch (error) {
            alert(error.message);
            if (response) {
                const responseMessage = await response.text();
                alert(responseMessage);
            }
        }
        throw new Error("Network error");
    }
    static async get(userID) {
        const response = await this.fetch(`/users/${userID}`, "GET");
        return response.json();
    }
    static async login(email, password) {
        const response = await this.fetch("/login", "POST", { email, password });
        return response.json();
    }
    static async register(name, email, password) {
        const response = await this.fetch("/register", "POST", { name, email, password });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La barre de navigation est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Petit espacement vertical sous la navbar -->\r\n<div class=\"pt-4\"></div>\r\n\r\n<!-- Conteneur principal de la page -->\r\n<main class=\"container py-4\">\r\n\r\n    <offer-element id=\"offer-element\">\r\n\r\n        <!-- Grille Bootstrap principale. g-5 ajoute un large espacement (gutter) entre les colonnes -->\r\n        <div class=\"row g-5\">\r\n\r\n            <!-- SECTION GAUCHE (Contenu principal de l'annonce) - 8 colonnes sur grand écran -->\r\n            <section class=\"col-lg-8\">\r\n\r\n                <div class=\"d-flex flex-wrap justify-content-between align-items-center mb-2\">\r\n                    <!-- Titre de l'annonce -->\r\n                    <h1 class=\"offer-title fw-bolder mb-0\">\r\n                        ?\r\n                    </h1>\r\n\r\n                    <!-- Bouton d'édition (lien vers la page d'édition) -->\r\n                    <a id=\"offer-edit-button\" class=\"btn btn-outline-primary\">\r\n                        <i class=\"bi bi-pencil-fill me-2\"></i>\r\n                        Modifier l'annonce\r\n                    </a>\r\n                </div>\r\n\r\n                <!-- Badges pour la catégorie et le type d'offre -->\r\n                <div class=\"mb-4\">\r\n                    <span class=\"offer-category badge bg-primary text-uppercase me-2\">\r\n                        ?\r\n                    </span>\r\n                    <span class=\"offer-type badge bg-warning text-dark text-uppercase\">\r\n                        ?\r\n                    </span>\r\n                </div>\r\n\r\n                <!-- Carousel (diaporama d'images) de l'annonce -->\r\n                <div class=\"carousel slide mb-5\" data-bs-ride=\"carousel\" id=\"offer-carousel\">\r\n                    <!-- Indicateurs (les petits points en bas) -->\r\n                    <div class=\"carousel-indicators\">\r\n                        <button type=\"button\" data-bs-target=\"#offer-carousel\" data-bs-slide-to=\"0\" class=\"active\"\r\n                            aria-current=\"true\" aria-label=\"Slide 1\"></button>\r\n                        <button type=\"button\" data-bs-target=\"#offer-carousel\" data-bs-slide-to=\"1\"\r\n                            aria-label=\"Slide 2\"></button>\r\n                    </div>\r\n\r\n                    <!-- Conteneur pour les images (slides) -->\r\n                    <div id=\"offer-image-container\" class=\"carousel-inner rounded-3 shadow-lg\">\r\n                        <!-- Slide 1 (active = visible au chargement) -->\r\n                        <div class=\"carousel-item active\">\r\n                            <img src=\"https://placehold.co/800x450/33A366/ffffff?text=Image+1\" class=\"d-block w-100\"\r\n                                alt=\"Image 1 de l'annonce\">\r\n                        </div>\r\n                        <!-- Slide 2 -->\r\n                        <div class=\"carousel-item\">\r\n                            <img src=\"https://placehold.co/800x450/33A366/ffffff?text=Image+2\" class=\"d-block w-100\"\r\n                                alt=\"Image 2 de l'annonce\">\r\n                        </div>\r\n                    </div>\r\n\r\n                    <!-- Contrôles (flèches) Précédent/Suivant -->\r\n                    <button class=\"carousel-control-prev\" type=\"button\" data-bs-target=\"#offer-carousel\"\r\n                        data-bs-slide=\"prev\">\r\n                        <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n                        <span class=\"visually-hidden\">Précédent</span>\r\n                    </button>\r\n                    <button class=\"carousel-control-next\" type=\"button\" data-bs-target=\"#offer-carousel\"\r\n                        data-bs-slide=\"next\">\r\n                        <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n                        <span class=\"visually-hidden\">Suivant</span>\r\n                    </button>\r\n                </div>\r\n\r\n                <!-- Section Description -->\r\n                <h3 class=\"border-bottom pb-2 mb-3 text-secondary\">Description de l'Offre</h3>\r\n                <p class=\"offer-description lead text-muted\">\r\n                    <!-- ? = Emplacement pour la description dynamique -->\r\n                    ?\r\n                </p>\r\n\r\n                <!-- Section \"En échange de\" -->\r\n                <h3 class=\"border-bottom pb-2 mb-3 mt-5 text-secondary\">Ce qui est demandé en Échange</h3>\r\n                <!-- Carte stylisée pour mettre en avant la demande -->\r\n                <div class=\"card border-warning mb-4\">\r\n                    <div class=\"card-body\">\r\n                        <i class=\"bi bi-info-circle-fill text-warning me-2\"></i>\r\n                        <!-- ? = Emplacement pour la demande d'échange dynamique -->\r\n                        <p class=\"offer-exchange\"></p>\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- Section Localisation -->\r\n                <h3 class=\"border-bottom pb-2 mb-3 mt-5 text-secondary\">Localisation</h3>\r\n                <p class=\"mb-5\">\r\n                    <i class=\"offer-location bi bi-geo-alt-fill text-danger me-2\"></i>\r\n                </p>\r\n            </section>\r\n\r\n            <!-- SECTION DROITE (Barre latérale) - 4 colonnes sur grand écran -->\r\n            <aside class=\"col-lg-4\">\r\n\r\n                <!-- Carte \"Propriétaire\" -->\r\n                <div class=\"card mb-4 shadow-lg text-center p-3\">\r\n                    <div class=\"card-body\">\r\n                        <h4 class=\"card-title text-primary mb-3\">Le Propriétaire</h4>\r\n\r\n                        <!-- Composant personnalisé pour les infos utilisateur -->\r\n                        <user-element id=\"offer-seller\">\r\n                            <!-- Avatar -->\r\n                            <img alt=\"Vendeur\" width=\"80\" height=\"80\"\r\n                                class=\"user-avatar rounded-circle mb-3 border border-3 border-primary shadow\">\r\n\r\n                            <!-- Nom (dynamique) -->\r\n                            <h5 class=\"user-name fw-bold mb-1\">\r\n                                ?\r\n                            </h5>\r\n                            <!-- Note (dynamique) -->\r\n                            <p class=\"user-rating mb-3 text-warning\">\r\n                                ?\r\n                            </p>\r\n                            <!-- Lien vers le profil -->\r\n                            <a class=\"user-profile-button btn btn-outline-primary w-100 mt-2\">Voir le Profil</a>\r\n                        </user-element>\r\n\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- Carte \"Vos Conversations\" (Pour le propriétaire) -->\r\n                <div id=\"chat-list-card\" class=\"card shadow-lg border-info mb-4\">\r\n                    <div class=\"card-header bg-info text-white fw-bold\">\r\n                        <i class=\"bi bi-chat-dots-fill me-2\"></i>\r\n                        Vos Conversations\r\n                    </div>\r\n                    <div class=\"card-body p-0\">\r\n                        <!-- 'id=\"offer-chat-list\"' pour y injecter vos chats -->\r\n                        <div id=\"offer-chat-list\" class=\"list-group list-group-flush\"\r\n                            style=\"max-height: 300px; overflow-y: auto;\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- Carte \"Proposer un Échange\" (Formulaire) -->\r\n                <div id=\"trade-card\" class=\"card shadow-lg border-success\">\r\n                    <div class=\"card-header bg-success text-white fw-bold\">\r\n                        Proposer un échange\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                        <form id=\"new-chat-form\" is=\"new-chat-form\">\r\n                            <!-- Champ: Contre-proposition -->\r\n                            <div class=\"mb-3\">\r\n                                <textarea name=\"message\" class=\"form-control\" rows=\"3\" required\r\n                                    placeholder=\"Ex: Je vous offre une heure de cours de cuisine...\"></textarea>\r\n                            </div>\r\n                            <!-- Bouton d'envoi -->\r\n                            <button type=\"submit\" class=\"btn btn-success w-100 btn-lg mt-2\">\r\n                                Envoyer un message\r\n                            </button>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </aside>\r\n        </div>\r\n    </offer-element>\r\n</main>");

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
    Item["Loading"] = "false";
})(Item || (Item = {}));
class Application {
    constructor() {
        this.listeners = {};
        for (const item in Item)
            this.listeners[Item[item]] = [];
        this.set(Item.Loading, false);
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

/***/ "./src/models/Chat.ts":
/*!****************************!*\
  !*** ./src/models/Chat.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Chat)
/* harmony export */ });
class Chat {
    constructor() { }
    static fromJSON(json) {
        const chat = new Chat();
        chat._id = json._id;
        chat.offerID = json.offerID;
        chat.buyerID = json.buyerID;
        chat.messages = json.messages.map((msg) => ({
            senderID: msg.senderID,
            content: msg.content,
            timestamp: new Date(msg.timestamp),
        }));
        return chat;
    }
}


/***/ })

}]);
//# sourceMappingURL=src_elements_OfferPage_ts.index.js.map