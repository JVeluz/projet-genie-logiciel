"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_OfferChatPage_ts"],{

/***/ "./src/elements/OfferChatPage.ts":
/*!***************************************!*\
  !*** ./src/elements/OfferChatPage.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferChatPage)
/* harmony export */ });
/* harmony import */ var _html_offer_chat_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/offer-chat-page.html */ "./src/html/offer-chat-page.html");
/* harmony import */ var _html_HTMLLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/HTMLLoader */ "./src/html/HTMLLoader.ts");
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");
/* harmony import */ var _models_Chat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/Chat */ "./src/models/Chat.ts");
/* harmony import */ var _models_Offer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/Offer */ "./src/models/Offer.ts");
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/User */ "./src/models/User.ts");
/* harmony import */ var _fetches_ChatFetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../fetches/ChatFetch */ "./src/fetches/ChatFetch.ts");
/* harmony import */ var _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../fetches/OfferFetch */ "./src/fetches/OfferFetch.ts");
/* harmony import */ var _fetches_UserFetch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../fetches/UserFetch */ "./src/fetches/UserFetch.ts");









const UPDATE_WAIT_TIME = 10000; // 10 seconds
const MESSAGE = `
<div class="d-flex justify-content-start mb-3">
    <div class="bg-secondary rounded-3 p-2">
        <p></p>
        <small class="text-muted" style="font-size: 0.75rem;"></small>
    </div>
</div>
`;
const MESSAGE_SELF = `
<div class="d-flex justify-content-end mb-3">
    <div class="bg-primary text-white rounded-3 p-2">
        <p></p>
        <small class="text-white-50" style="font-size: 0.75rem;"></small>
    </div>
</div>
`;
class OfferChatPage extends HTMLElement {
    constructor() {
        super(...arguments);
        // URLSearchParams
        this.urlParams = new URLSearchParams(window.location.search);
        this.chatID = this.urlParams.get("id");
        // Models
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance();
        this.currentUser = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_2__.Item.CurrentUser);
        this.token = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_2__.Item.AuthToken);
        this.chat = null;
        this.offer = null;
        this.otherUser = null;
        // Other
        this.isCurrentUserSeller = false;
    }
    async connectedCallback() {
        await this.initialize();
        this.create();
        this.connectEvents();
        this.updateInterval = setInterval(() => this.keepUpdated(), UPDATE_WAIT_TIME);
    }
    async disconnectedCallback() {
        clearInterval(this.updateInterval);
    }
    async initialize() {
        if (!this.currentUser || !this.token) {
            console.error("user not connected");
            return;
        }
        if (!this.chatID) {
            console.error("invalid url");
            return;
        }
        await _fetches_ChatFetch__WEBPACK_IMPORTED_MODULE_6__["default"].get(this.chatID, this.token).then(result => {
            this.chat = result ? _models_Chat__WEBPACK_IMPORTED_MODULE_3__["default"].fromJSON(result) : null;
        });
        if (!this.chat) {
            console.error("chat not found");
            return;
        }
        await _fetches_OfferFetch__WEBPACK_IMPORTED_MODULE_7__["default"].get(this.chat.offerID).then(result => {
            this.offer = result ? _models_Offer__WEBPACK_IMPORTED_MODULE_4__["default"].fromJSON(result) : null;
        });
        if (!this.offer) {
            console.error("offer not found");
            return;
        }
        this.isCurrentUserSeller = this.currentUser._id === this.offer.sellerID;
        const otherUserID = this.isCurrentUserSeller ? this.chat.buyerID : this.offer.sellerID;
        await _fetches_UserFetch__WEBPACK_IMPORTED_MODULE_8__["default"].get(otherUserID).then(result => {
            this.otherUser = result ? _models_User__WEBPACK_IMPORTED_MODULE_5__["default"].fromJSON(result) : null;
        });
    }
    create() {
        this.innerHTML = _html_offer_chat_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        const offerElement = this.querySelector("offer-element");
        const sellerElement = this.querySelector(".offer-seller");
        customElements.whenDefined("offer-element").then(() => {
            offerElement.update(this.offer);
        });
        customElements.whenDefined("user-element").then(() => {
            sellerElement.update(this.isCurrentUserSeller ? this.currentUser : this.otherUser);
        });
        console.log(this.chat);
        const chatBox = this.querySelector(".chat-box");
        for (const message of this.chat.messages) {
            const isSelf = message.senderID === this.currentUser._id;
            const messageElement = (isSelf) ?
                _html_HTMLLoader__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(MESSAGE_SELF) :
                _html_HTMLLoader__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(MESSAGE);
            const messageContent = messageElement.querySelector("div");
            const messageText = messageContent.querySelector("p");
            const messageTime = messageContent.querySelector("small");
            messageText.textContent = message.content;
            messageTime.textContent = message.timestamp.toLocaleString();
            chatBox.appendChild(messageElement);
        }
    }
    connectEvents() {
        const messageForm = this.querySelector(".message-form");
        messageForm.onsubmit = (event) => this.onSubmitMessage(event);
    }
    onSubmitMessage(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const message = formData.get("message");
        _fetches_ChatFetch__WEBPACK_IMPORTED_MODULE_6__["default"].sendMessage(this.chat._id, this.currentUser._id, message, this.token);
        form.reset();
    }
    async keepUpdated() {
        const result = await _fetches_ChatFetch__WEBPACK_IMPORTED_MODULE_6__["default"].get(this.chat._id, this.token);
        if (!result) {
            console.error("Failed to fetch updated chat data");
            return;
        }
        const newChat = _models_Chat__WEBPACK_IMPORTED_MODULE_3__["default"].fromJSON(result);
        const oldMessagesCount = this.chat.messages.length;
        const newMessagesCount = newChat.messages.length;
        if (newMessagesCount > oldMessagesCount) {
            const messagesToAdd = newChat.messages.slice(oldMessagesCount);
            this.appendMessages(messagesToAdd);
            this.chat = newChat;
        }
    }
    appendMessages(messages) {
        const chatBox = this.querySelector(".chat-box");
        for (const message of messages) {
            const isSelf = message.senderID === this.currentUser._id;
            const messageElement = (isSelf) ?
                _html_HTMLLoader__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(MESSAGE_SELF) :
                _html_HTMLLoader__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(MESSAGE);
            const messageContent = messageElement.querySelector("div");
            const messageText = messageContent.querySelector("p");
            const messageTime = messageContent.querySelector("small");
            messageText.textContent = message.content;
            messageTime.textContent = message.timestamp.toLocaleString();
            chatBox.appendChild(messageElement);
        }
        chatBox.scrollTop = chatBox.scrollHeight;
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

/***/ "./src/html/HTMLLoader.ts":
/*!********************************!*\
  !*** ./src/html/HTMLLoader.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTMLLoader)
/* harmony export */ });
class HTMLLoader {
    static createElement(html) {
        const element = document.createElement("div");
        element.innerHTML = html;
        if (element.childElementCount === 1) {
            return element.firstElementChild;
        }
        return element;
    }
}


/***/ }),

/***/ "./src/html/offer-chat-page.html":
/*!***************************************!*\
  !*** ./src/html/offer-chat-page.html ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La navbar est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Contenu Principal -->\r\n<main class=\"container py-4\">\r\n    <div class=\"row justify-content-center\">\r\n        <div class=\"col-12 col-lg-10 col-xl-9\">\r\n\r\n            <!-- 1. CARTE CONTEXTUELLE DE L'OBJET (OfferCard simplifiée) -->\r\n            <!-- C'est le rappel de l'objet dont parle le chat -->\r\n            <div class=\"card shadow-sm mb-3\">\r\n                <div class=\"row g-0\">\r\n                    <offer-element>\r\n                        <div class=\"col-md-3\">\r\n                            <img src=\"https://placehold.co/400x300/33A366/ffffff?text=Objet\"\r\n                                class=\"offer-picture img-fluid rounded-start w-100\" alt=\"Objet du chat\"\r\n                                style=\"object-fit: cover; height: 100%;\">\r\n                        </div>\r\n                        <div class=\"col-md-9\">\r\n                            <div class=\"card-body\">\r\n                                <h5 class=\"offer-title card-title text-primary fw-bold\">\r\n                                    ?\r\n                                </h5>\r\n                                <span class=\"offer-category badge bg-primary text-uppercase me-2\">\r\n                                    Jardinage\r\n                                </span>\r\n                                <span class=\"offer-type badge bg-warning text-dark text-uppercase\">\r\n                                    Prêt d'Objet\r\n                                </span>\r\n                            </div>\r\n                        </div>\r\n                    </offer-element>\r\n                </div>\r\n            </div>\r\n\r\n            <!-- 2. FENÊTRE DE CHAT PRINCIPALE -->\r\n            <div class=\"card shadow-lg border-0\">\r\n                <!-- En-tête de la conversation -->\r\n                <div class=\"card-header border-bottom-0 p-3\">\r\n                    <user-element class=\"offer-seller\">\r\n                        <h5 class=\"user-name mb-0 fw-bold\">\r\n                            Conversation avec Alice Dubois\r\n                        </h5>\r\n                    </user-element>\r\n                </div>\r\n\r\n                <!-- Historique des messages (avec scroll) -->\r\n                <div class=\"chat-box card-body p-4\" style=\"height: 50vh; overflow-y: auto;\">\r\n\r\n                    <!-- Message Reçu (Aligné à gauche) -->\r\n                    <div class=\"d-flex justify-content-start mb-3\">\r\n                        <div class=\"bg-secondary rounded-3 p-2\">\r\n                            <p>\r\n                                Bonjour ! Votre tondeuse est-elle toujours disponible ce weekend ?\r\n                            </p>\r\n                            <small class=\"text-muted\" style=\"font-size: 0.75rem;\">Aujourd'hui, 10:30</small>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <!-- Message Envoyé (Aligné à droite) -->\r\n                    <div class=\"d-flex justify-content-end mb-3\">\r\n                        <div class=\"bg-primary text-white rounded-3 p-2\">\r\n                            <p>\r\n                                Bonjour Alice ! Oui, tout à fait. Samedi matin vous irait ?\r\n                            </p>\r\n                            <small class=\"text-white-50\" style=\"font-size: 0.75rem;\">Aujourd'hui, 10:31</small>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <!-- Message Reçu -->\r\n                    <div class=\"d-flex justify-content-start mb-3\">\r\n                        <div class=\"bg-secondary rounded-3 p-2\">\r\n                            <p>\r\n                                Parfait ! J'ai bien un cours de programmation web à vous proposer en échange, comme\r\n                                demandé.\r\n                            </p>\r\n                            <small class=\"text-muted\" style=\"font-size: 0.75rem;\">Aujourd'hui, 10:32</small>\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n\r\n                <!-- Pied de carte (Zone de saisie) -->\r\n                <div class=\"card-footer p-3 border-0\">\r\n                    <!-- Formulaire d'envoi de message -->\r\n                    <form class=\"message-form\">\r\n                        <div class=\"input-group\">\r\n                            <input name=\"message\" type=\"text\" class=\"form-control\"\r\n                                placeholder=\"Écrivez votre message...\" aria-label=\"Écrivez votre message\" required>\r\n                            <button class=\"btn btn-success\" type=\"submit\" aria-label=\"Envoyer\">\r\n                                <i class=\"bi bi-send-fill\"></i>\r\n                            </button>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</main>");

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
        return user;
    }
    getAvatar() {
        return this.avatar || `https://placehold.co/120x120/17A2B8/ffffff?text=${this.name[0]}`;
    }
}


/***/ })

}]);
//# sourceMappingURL=src_elements_OfferChatPage_ts.index.js.map