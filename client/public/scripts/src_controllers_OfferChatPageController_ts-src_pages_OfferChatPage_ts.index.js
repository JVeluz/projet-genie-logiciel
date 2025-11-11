"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_controllers_OfferChatPageController_ts-src_pages_OfferChatPage_ts"],{

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

/***/ "./src/controllers/OfferChatPageController.ts":
/*!****************************************************!*\
  !*** ./src/controllers/OfferChatPageController.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OfferChatPageController)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");
/* harmony import */ var _pages_OfferChatPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/OfferChatPage */ "./src/pages/OfferChatPage.ts");
/* harmony import */ var _services_ChatService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/ChatService */ "./src/services/ChatService.ts");
/* harmony import */ var _services_OfferService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/OfferService */ "./src/services/OfferService.ts");
/* harmony import */ var _services_UserService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/UserService */ "./src/services/UserService.ts");





const UPDATE_WAIT_TIME = 10000; // 10 seconds
class OfferChatPageController {
    constructor(view) {
        // URLSearchParams
        this.urlParams = new URLSearchParams(window.location.search);
        this.chatID = this.urlParams.get("id");
        // Models
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.currentUser = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser);
        this.model = new _pages_OfferChatPage__WEBPACK_IMPORTED_MODULE_1__.OfferChatPageModel();
        this.view = view;
        this.initialize();
    }
    async initialize() {
        // Preconditions
        if (!this.currentUser)
            throw new Error("user not connected");
        // URL Parameters
        if (!this.chatID)
            throw new Error("missing chat ID");
        let chat;
        try {
            // Fetch data
            chat = await _services_ChatService__WEBPACK_IMPORTED_MODULE_2__["default"].getByID(this.chatID);
            if (!chat)
                throw new Error("chat not found");
            this.model.offer = await _services_OfferService__WEBPACK_IMPORTED_MODULE_3__["default"].getByID(chat.offerID);
            if (!this.model.offer)
                throw new Error("offer not found");
            this.model.seller = await _services_UserService__WEBPACK_IMPORTED_MODULE_4__["default"].getByID(this.model.offer.sellerID);
            if (!this.model.seller)
                throw new Error("seller not found");
        }
        catch (error) {
            console.error(`Error Fetching data: ${error}`);
            return;
        }
        // Processing data
        for (let i = 0; i < chat.messages.length; i++) {
            const message = chat.messages[i];
            this.model.messages.push({
                isMine: message.senderID === this.currentUser._id,
                content: message.content,
                timestamp: message.timestamp
            });
        }
        this.connectEvents();
        this.view.create(this.model);
    }
    connectEvents() {
        const messageForm = this.view.querySelector(".message-form");
        messageForm.onsubmit = (event) => this.onSubmitMessage(event);
        if (this.updateInterval)
            clearInterval(this.updateInterval);
        this.updateInterval = setInterval(() => this.keepUpdated(), UPDATE_WAIT_TIME);
    }
    async onSubmitMessage(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const message = formData.get("message");
        await _services_ChatService__WEBPACK_IMPORTED_MODULE_2__["default"].sendMessage(this.chatID, message, this.currentUser);
        form.reset();
    }
    async keepUpdated() {
        let newChat;
        try {
            newChat = await _services_ChatService__WEBPACK_IMPORTED_MODULE_2__["default"].getByID(this.chatID);
        }
        catch (error) {
            console.error(`Error updating chat: ${error}`);
        }
        const oldMessagesCount = this.model.messages.length;
        const newMessagesCount = newChat.messages.length;
        const newMessages = newChat.messages.map(msg => ({
            isMine: msg.senderID === this.currentUser._id,
            content: msg.content,
            timestamp: msg.timestamp
        }));
        if (newMessagesCount > oldMessagesCount) {
            this.view.update(newMessages.slice(oldMessagesCount));
        }
        this.model.messages = newMessages;
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La navbar est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Contenu Principal -->\r\n<main class=\"container py-4\">\r\n    <div class=\"row justify-content-center\">\r\n        <div class=\"col-12 col-lg-10 col-xl-9\">\r\n\r\n            <!-- 1. CARTE CONTEXTUELLE DE L'OBJET (OfferCard simplifiée) -->\r\n            <!-- C'est le rappel de l'objet dont parle le chat -->\r\n            <div class=\"card shadow-sm mb-3\">\r\n                <div class=\"row g-0\">\r\n                    <offer-element>\r\n                        <div class=\"col-md-3\">\r\n                            <img src=\"https://placehold.co/400x300/33A366/ffffff?text=Objet\"\r\n                                class=\"offer-picture img-fluid rounded-start w-100\" alt=\"Objet du chat\"\r\n                                style=\"object-fit: cover; height: 100%;\">\r\n                        </div>\r\n                        <div class=\"col-md-9\">\r\n                            <div class=\"card-body\">\r\n                                <h5 class=\"offer-title card-title text-primary fw-bold\">\r\n                                    ?\r\n                                </h5>\r\n                                <span class=\"offer-category badge bg-primary text-uppercase me-2\">\r\n                                    Jardinage\r\n                                </span>\r\n                                <span class=\"offer-type badge bg-warning text-dark text-uppercase\">\r\n                                    Prêt d'Objet\r\n                                </span>\r\n                            </div>\r\n                        </div>\r\n                    </offer-element>\r\n                </div>\r\n            </div>\r\n\r\n            <!-- 2. FENÊTRE DE CHAT PRINCIPALE -->\r\n            <div class=\"card shadow-lg border-0\">\r\n                <!-- En-tête de la conversation -->\r\n                <div class=\"card-header border-bottom-0 p-3\">\r\n                    <user-element class=\"offer-seller\">\r\n                        <h5 class=\"user-name mb-0 fw-bold\">\r\n                            Conversation avec Alice Dubois\r\n                        </h5>\r\n                    </user-element>\r\n                </div>\r\n\r\n                <!-- Historique des messages (avec scroll) -->\r\n                <div class=\"chat-box card-body p-4\" style=\"height: 50vh; overflow-y: auto;\">\r\n                </div>\r\n\r\n                <!-- Pied de carte (Zone de saisie) -->\r\n                <div class=\"card-footer p-3 border-0\">\r\n                    <!-- Formulaire d'envoi de message -->\r\n                    <form class=\"message-form\">\r\n                        <div class=\"input-group\">\r\n                            <input name=\"message\" type=\"text\" class=\"form-control\"\r\n                                placeholder=\"Écrivez votre message...\" aria-label=\"Écrivez votre message\" required>\r\n                            <button class=\"btn btn-success\" type=\"submit\" aria-label=\"Envoyer\">\r\n                                <i class=\"bi bi-send-fill\"></i>\r\n                            </button>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</main>");

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

/***/ "./src/pages/OfferChatPage.ts":
/*!************************************!*\
  !*** ./src/pages/OfferChatPage.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Message: () => (/* binding */ Message),
/* harmony export */   OfferChatPageModel: () => (/* binding */ OfferChatPageModel),
/* harmony export */   "default": () => (/* binding */ OfferChatPage)
/* harmony export */ });
/* harmony import */ var _controllers_OfferChatPageController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/OfferChatPageController */ "./src/controllers/OfferChatPageController.ts");
/* harmony import */ var _html_offer_chat_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/offer-chat-page.html */ "./src/html/offer-chat-page.html");
/* harmony import */ var _html_HTMLLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../html/HTMLLoader */ "./src/html/HTMLLoader.ts");
/* harmony import */ var _models_Offer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/Offer */ "./src/models/Offer.ts");
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/User */ "./src/models/User.ts");





class OfferChatPageModel {
    constructor() {
        this.messages = [];
        this.offer = new _models_Offer__WEBPACK_IMPORTED_MODULE_3__["default"]();
        this.seller = new _models_User__WEBPACK_IMPORTED_MODULE_4__["default"]();
    }
}
class Message {
    constructor() {
        this.isMine = false;
        this.content = "";
        this.timestamp = new Date();
    }
}
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
    async connectedCallback() {
        this.innerHTML = _html_offer_chat_page_html__WEBPACK_IMPORTED_MODULE_1__["default"];
        new _controllers_OfferChatPageController__WEBPACK_IMPORTED_MODULE_0__["default"](this);
    }
    create(model) {
        console.log(model);
        const offerElement = this.querySelector("offer-element");
        const sellerElement = this.querySelector(".offer-seller");
        offerElement.update(model.offer);
        sellerElement.update(model.seller);
        const chatBox = this.querySelector(".chat-box");
        for (const message of model.messages) {
            const messageElement = (message.isMine) ?
                _html_HTMLLoader__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(MESSAGE_SELF) :
                _html_HTMLLoader__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(MESSAGE);
            const messageContent = messageElement.querySelector("div");
            const messageText = messageContent.querySelector("p");
            const messageTime = messageContent.querySelector("small");
            messageText.textContent = message.content;
            messageTime.textContent = message.timestamp.toLocaleString();
            chatBox.appendChild(messageElement);
        }
    }
    update(messages) {
        const chatBox = this.querySelector(".chat-box");
        for (const message of messages) {
            const messageElement = (message.isMine) ?
                _html_HTMLLoader__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(MESSAGE_SELF) :
                _html_HTMLLoader__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(MESSAGE);
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
//# sourceMappingURL=src_controllers_OfferChatPageController_ts-src_pages_OfferChatPage_ts.index.js.map