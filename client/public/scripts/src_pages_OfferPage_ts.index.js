"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_pages_OfferPage_ts"],{

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

/***/ "./src/controllers/OfferPageController.ts":
/*!************************************************!*\
  !*** ./src/controllers/OfferPageController.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferPageController)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");
/* harmony import */ var _services_OfferService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/OfferService */ "./src/services/OfferService.ts");
/* harmony import */ var _services_UserService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/UserService */ "./src/services/UserService.ts");
/* harmony import */ var _services_ChatService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/ChatService */ "./src/services/ChatService.ts");




class OfferPageController {
    constructor(page, offerElement, userElement) {
        // URL Parameters
        this.urlParams = new URLSearchParams(window.location.search);
        this.offerID = this.urlParams.get("id");
        // Model
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.model = {
            offerID: "", isOfferMine: false, isUserLoggedIn: false, chats: []
        };
        this.page = page;
        this.offerElement = offerElement;
        this.userElement = userElement;
        this.initialize();
    }
    async initialize() {
        // URL Parameters
        if (!this.offerID) {
            console.error("Offer ID is missing in URL parameters.");
            return;
        }
        // Fetching Data
        let offer = null;
        try {
            offer = await _services_OfferService__WEBPACK_IMPORTED_MODULE_1__["default"].getByID(this.offerID);
        }
        catch (error) {
            console.error("Error fetching offer data:", error);
            return;
        }
        let seller;
        try {
            seller = await _services_UserService__WEBPACK_IMPORTED_MODULE_2__["default"].getByID(offer.sellerID);
        }
        catch (error) {
            console.error("Error fetching seller data:", error);
            return;
        }
        let chats = [];
        let buyers = [];
        for (const chatID of offer.chatIDs) {
            try {
                const chat = await _services_ChatService__WEBPACK_IMPORTED_MODULE_3__["default"].getByID(chatID);
                const buyer = await _services_UserService__WEBPACK_IMPORTED_MODULE_2__["default"].getByID(chat.buyerID);
                buyers.push(buyer);
                chats.push(chat);
            }
            catch (error) {
                console.error(`Error fetching chat data for chat ID ${chatID}:`, error);
            }
        }
        // Updating Model
        this.model.offerID = this.offerID;
        const currentUser = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser);
        this.model.isUserLoggedIn = currentUser !== null;
        if (currentUser) {
            this.model.isOfferMine = currentUser.offers.some(offer => offer._id === this.offerID);
            for (let i = 0; i < chats.length; i++) {
                const chat = chats[i];
                const buyer = buyers[i];
                const lastMessage = (chat.messages.length > 0) ?
                    chat.messages[chat.messages.length - 1].content : "";
                const chatPreview = {
                    id: chat._id, buyerName: buyer.name, lastMessage: lastMessage
                };
                this.model.chats.push(chatPreview);
            }
        }
        this.page.update(this.model);
        this.offerElement.update(offer);
        this.userElement.update(seller);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La barre de navigation est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Petit espacement vertical sous la navbar -->\r\n<div class=\"pt-4\"></div>\r\n\r\n<!-- Conteneur principal de la page -->\r\n<main class=\"container py-4\">\r\n\r\n    <offer-element id=\"offer-element\">\r\n\r\n        <!-- Grille Bootstrap principale. g-5 ajoute un large espacement (gutter) entre les colonnes -->\r\n        <div class=\"row g-5\">\r\n\r\n            <!-- SECTION GAUCHE (Contenu principal de l'annonce) - 8 colonnes sur grand écran -->\r\n            <section class=\"col-lg-8\">\r\n\r\n                <div class=\"d-flex flex-wrap justify-content-between align-items-center mb-2\">\r\n                    <!-- Titre de l'annonce -->\r\n                    <h1 class=\"offer-title fw-bolder mb-0\"></h1>\r\n\r\n                    <!-- Bouton d'édition (lien vers la page d'édition) -->\r\n                    <a id=\"offer-edit-button\" class=\"btn btn-outline-primary\" style=\"display: none;\">\r\n                        <i class=\"bi bi-pencil-fill me-2\"></i>\r\n                        Modifier l'annonce\r\n                    </a>\r\n                </div>\r\n\r\n                <!-- Badges pour la catégorie et le type d'offre -->\r\n                <div class=\"mb-4\">\r\n                    <span class=\"offer-category badge bg-primary text-uppercase me-2\">\r\n                    </span>\r\n                    <span class=\"offer-type badge bg-warning text-dark text-uppercase\">\r\n                    </span>\r\n                </div>\r\n\r\n                <!-- Carousel (diaporama d'images) de l'annonce -->\r\n                <div class=\"carousel slide mb-5\" data-bs-ride=\"carousel\" id=\"offer-carousel\">\r\n                    <!-- Indicateurs (les petits points en bas) -->\r\n                    <div class=\"carousel-indicators\">\r\n                        <button type=\"button\" data-bs-target=\"#offer-carousel\" data-bs-slide-to=\"0\" class=\"active\"\r\n                            aria-current=\"true\" aria-label=\"Slide 1\"></button>\r\n                        <button type=\"button\" data-bs-target=\"#offer-carousel\" data-bs-slide-to=\"1\"\r\n                            aria-label=\"Slide 2\"></button>\r\n                    </div>\r\n\r\n                    <!-- Conteneur pour les images (slides) -->\r\n                    <div id=\"offer-image-container\" class=\"carousel-inner rounded-3 shadow-lg\">\r\n                        <!-- Slide 1 (active = visible au chargement) -->\r\n                        <div class=\"carousel-item active\">\r\n                            <img src=\"https://placehold.co/800x450/33A366/ffffff?text=Image+1\" class=\"d-block w-100\"\r\n                                alt=\"Image 1 de l'annonce\">\r\n                        </div>\r\n                        <!-- Slide 2 -->\r\n                        <div class=\"carousel-item\">\r\n                            <img src=\"https://placehold.co/800x450/33A366/ffffff?text=Image+2\" class=\"d-block w-100\"\r\n                                alt=\"Image 2 de l'annonce\">\r\n                        </div>\r\n                    </div>\r\n\r\n                    <!-- Contrôles (flèches) Précédent/Suivant -->\r\n                    <button class=\"carousel-control-prev\" type=\"button\" data-bs-target=\"#offer-carousel\"\r\n                        data-bs-slide=\"prev\">\r\n                        <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n                        <span class=\"visually-hidden\">Précédent</span>\r\n                    </button>\r\n                    <button class=\"carousel-control-next\" type=\"button\" data-bs-target=\"#offer-carousel\"\r\n                        data-bs-slide=\"next\">\r\n                        <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n                        <span class=\"visually-hidden\">Suivant</span>\r\n                    </button>\r\n                </div>\r\n\r\n                <!-- Section Description -->\r\n                <h3 class=\"border-bottom pb-2 mb-3 text-secondary\">Description de l'Offre</h3>\r\n                <p class=\"offer-description lead text-muted\">\r\n                    <!-- ? = Emplacement pour la description dynamique -->\r\n                </p>\r\n\r\n                <!-- Section \"En échange de\" -->\r\n                <h3 class=\"border-bottom pb-2 mb-3 mt-5 text-secondary\">Ce qui est demandé en Échange</h3>\r\n                <!-- Carte stylisée pour mettre en avant la demande -->\r\n                <div class=\"card border-warning mb-4\">\r\n                    <div class=\"card-body\">\r\n                        <i class=\"bi bi-info-circle-fill text-warning me-2\"></i>\r\n                        <!-- ? = Emplacement pour la demande d'échange dynamique -->\r\n                        <p class=\"offer-exchange\"></p>\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- Section Localisation -->\r\n                <h3 class=\"border-bottom pb-2 mb-3 mt-5 text-secondary\">Localisation</h3>\r\n                <p class=\"mb-5\">\r\n                    <i class=\"offer-location bi bi-geo-alt-fill text-danger me-2\"></i>\r\n                </p>\r\n            </section>\r\n\r\n            <!-- SECTION DROITE (Barre latérale) - 4 colonnes sur grand écran -->\r\n            <aside class=\"col-lg-4\">\r\n\r\n                <!-- Carte \"Propriétaire\" -->\r\n                <div class=\"card mb-4 shadow-lg text-center p-3\">\r\n                    <div class=\"card-body\">\r\n                        <h4 class=\"card-title text-primary mb-3\">Le Propriétaire</h4>\r\n\r\n                        <!-- Composant personnalisé pour les infos utilisateur -->\r\n                        <user-element id=\"offer-seller\">\r\n                            <!-- Avatar -->\r\n                            <img alt=\"Vendeur\" width=\"80\" height=\"80\"\r\n                                class=\"user-avatar rounded-circle mb-3 border border-3 border-primary shadow\">\r\n\r\n                            <!-- Nom (dynamique) -->\r\n                            <h5 class=\"user-name fw-bold mb-1\">\r\n                            </h5>\r\n                            <!-- Note (dynamique) -->\r\n                            <p class=\"user-rating mb-3 text-warning\">\r\n                            </p>\r\n                            <!-- Lien vers le profil -->\r\n                            <a class=\"user-profile-button btn btn-outline-primary w-100 mt-2\">Voir le Profil</a>\r\n                        </user-element>\r\n\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- Carte \"Vos Conversations\" (Pour le propriétaire) -->\r\n                <div id=\"chat-list-card\" style=\"display: none;\" class=\"card shadow-lg border-info mb-4\">\r\n                    <div class=\"card-header bg-info text-white fw-bold\">\r\n                        <i class=\"bi bi-chat-dots-fill me-2\"></i>\r\n                        Vos Conversations\r\n                    </div>\r\n                    <div class=\"card-body p-0\">\r\n                        <!-- 'id=\"offer-chat-list\"' pour y injecter vos chats -->\r\n                        <div id=\"offer-chat-list\" class=\"list-group list-group-flush\"\r\n                            style=\"max-height: 300px; overflow-y: auto;\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- Carte \"Proposer un Échange\" (Formulaire) -->\r\n                <div id=\"trade-card\" style=\"display: none;\" class=\"card shadow-lg border-success\">\r\n                    <div class=\"card-header bg-success text-white fw-bold\">\r\n                        Proposer un échange\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                        <form id=\"new-chat-form\" is=\"new-chat-form\">\r\n                            <!-- Champ: Contre-proposition -->\r\n                            <div class=\"mb-3\">\r\n                                <textarea name=\"message\" class=\"form-control\" rows=\"3\" required\r\n                                    placeholder=\"Ex: Je vous offre une heure de cours de cuisine...\"></textarea>\r\n                            </div>\r\n                            <!-- Bouton d'envoi -->\r\n                            <button type=\"submit\" class=\"btn btn-success w-100 btn-lg mt-2\">\r\n                                Envoyer un message\r\n                            </button>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </aside>\r\n        </div>\r\n    </offer-element>\r\n</main>");

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

/***/ "./src/models/User.ts":
/*!****************************!*\
  !*** ./src/models/User.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ User)
/* harmony export */ });
/* harmony import */ var _Offer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Offer */ "./src/models/Offer.ts");

class User {
    static fromJSON(data) {
        const user = new User();
        user._id = data._id;
        user.name = data.name;
        user.email = data.email;
        user.rating = data.rating;
        user.createdAt = new Date(data.createdAt);
        user.offers = data.offers.map((offer) => _Offer__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(offer));
        user.bio = data.bio || "";
        return user;
    }
    getAvatar() {
        return this.avatar || `https://placehold.co/120x120/17A2B8/ffffff?text=${this.name[0]}`;
    }
}


/***/ }),

/***/ "./src/pages/OfferPage.ts":
/*!********************************!*\
  !*** ./src/pages/OfferPage.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferPage)
/* harmony export */ });
/* harmony import */ var _html_offer_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/offer-page.html */ "./src/html/offer-page.html");
/* harmony import */ var _controllers_OfferPageController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/OfferPageController */ "./src/controllers/OfferPageController.ts");


const CHAT_PREVIEW = (chat) => {
    return `
        <a href="/offer/chat?id=${chat.id}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
                <strong class="mb-1">${chat.buyerName}</strong>    
                <p class="mb-0 text-muted text-truncate" style="max-width: 200px;">
                    ${chat.lastMessage}
                </p>
            </div>
            <span class="badge bg-danger rounded-pill">
                *
            </span>
        </a>
    `;
};
class OfferPage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = _html_offer_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        new _controllers_OfferPageController__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.querySelector("#offer-element"), this.querySelector("#offer-seller"));
    }
    update(model) {
        console.log(model);
        const editButton = this.querySelector("#offer-edit-button");
        const chatListCard = this.querySelector("#chat-list-card");
        const chatList = chatListCard.querySelector("#offer-chat-list");
        const tradeCard = this.querySelector("#trade-card");
        const newChatForm = this.querySelector("#new-chat-form");
        editButton.href = `/offer/edit?id=${model.offerID}`;
        editButton.style.display = model.isOfferMine ? "block" : "none";
        chatListCard.style.display = (model.isOfferMine && model.chats.length > 0) ? "block" : "none";
        tradeCard.style.display = (model.isUserLoggedIn && !model.isOfferMine) ? "block" : "none";
        newChatForm.offerID = model.offerID;
        newChatForm.setAttribute("offer-id", model.offerID);
        chatList.innerHTML = "";
        for (const chat of model.chats) {
            const chatElement = document.createElement("div");
            chatElement.innerHTML = CHAT_PREVIEW(chat);
            chatList.appendChild(chatElement);
        }
    }
}


/***/ }),

/***/ "./src/repositories/ChatRepository.ts":
/*!********************************************!*\
  !*** ./src/repositories/ChatRepository.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChatRepository)
/* harmony export */ });
/* harmony import */ var _models_Chat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Chat */ "./src/models/Chat.ts");
/* harmony import */ var _ServerAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ServerAPI */ "./src/ServerAPI.ts");


class ChatRepository {
    static async getByID(chatID) {
        return _models_Chat__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(await _ServerAPI__WEBPACK_IMPORTED_MODULE_1__["default"].get(`/chats/${chatID}`));
    }
    static async getOrCreateWithMessage(offerID, userID, message) {
        const body = JSON.stringify({
            offerID, buyerID: userID, message
        });
        return _models_Chat__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(await _ServerAPI__WEBPACK_IMPORTED_MODULE_1__["default"].post(`/chats`, body));
    }
    static async sendMessage(chatID, senderID, content) {
        const body = JSON.stringify({
            senderID, content
        });
        await _ServerAPI__WEBPACK_IMPORTED_MODULE_1__["default"].post(`/chats/${chatID}`, body);
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

/***/ "./src/repositories/UserRepository.ts":
/*!********************************************!*\
  !*** ./src/repositories/UserRepository.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserRepository)
/* harmony export */ });
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/User */ "./src/models/User.ts");
/* harmony import */ var _ServerAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ServerAPI */ "./src/ServerAPI.ts");


class UserRepository {
    static async getByID(userID) {
        return _models_User__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(await _ServerAPI__WEBPACK_IMPORTED_MODULE_1__["default"].get(`/users/${userID}`));
    }
    static async login(email, password) {
        const body = JSON.stringify({
            email, password
        });
        const response = await _ServerAPI__WEBPACK_IMPORTED_MODULE_1__["default"].post(`/users/login`, body);
        return {
            token: response.token, user: _models_User__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(response.user)
        };
    }
    static async register(name, email, password) {
        const body = JSON.stringify({
            name, email, password
        });
        const response = await _ServerAPI__WEBPACK_IMPORTED_MODULE_1__["default"].post(`/users/register`, body);
        return {
            token: response.token, user: _models_User__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(response.user)
        };
    }
    static async update(user) {
        const body = JSON.stringify(user);
        const response = await _ServerAPI__WEBPACK_IMPORTED_MODULE_1__["default"].put(`/users/${user._id}`, body);
        return _models_User__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(response);
    }
}


/***/ }),

/***/ "./src/services/ChatService.ts":
/*!*************************************!*\
  !*** ./src/services/ChatService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChatService)
/* harmony export */ });
/* harmony import */ var _repositories_ChatRepository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../repositories/ChatRepository */ "./src/repositories/ChatRepository.ts");

class ChatService {
    static async getByID(chatID) {
        return await _repositories_ChatRepository__WEBPACK_IMPORTED_MODULE_0__["default"].getByID(chatID);
    }
    static async getOrCreateWithMessage(offerID, userID, message) {
        return await _repositories_ChatRepository__WEBPACK_IMPORTED_MODULE_0__["default"].getOrCreateWithMessage(offerID, userID, message);
    }
    static async sendMessage(chatID, content, currentUser) {
        if (!currentUser)
            throw new Error("Unauthorized: You must be logged in to send messages.");
        return await _repositories_ChatRepository__WEBPACK_IMPORTED_MODULE_0__["default"].sendMessage(chatID, currentUser._id, content);
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


/***/ }),

/***/ "./src/services/UserService.ts":
/*!*************************************!*\
  !*** ./src/services/UserService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var _repositories_UserRepository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../repositories/UserRepository */ "./src/repositories/UserRepository.ts");

class UserService {
    static async getByID(userID) {
        return await _repositories_UserRepository__WEBPACK_IMPORTED_MODULE_0__["default"].getByID(userID);
    }
    static async login(email, password) {
        return await _repositories_UserRepository__WEBPACK_IMPORTED_MODULE_0__["default"].login(email, password);
    }
    static async register(user, password) {
        return await _repositories_UserRepository__WEBPACK_IMPORTED_MODULE_0__["default"].register(user.name, user.email, password);
    }
    static async update(user) {
        return await _repositories_UserRepository__WEBPACK_IMPORTED_MODULE_0__["default"].update(user);
    }
}


/***/ })

}]);
//# sourceMappingURL=src_pages_OfferPage_ts.index.js.map