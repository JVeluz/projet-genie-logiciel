"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_NewChatForm_ts"],{

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

/***/ "./src/elements/NewChatForm.ts":
/*!*************************************!*\
  !*** ./src/elements/NewChatForm.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NewChatForm)
/* harmony export */ });
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");
/* harmony import */ var _services_ChatService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/ChatService */ "./src/services/ChatService.ts");


class NewChatForm extends HTMLFormElement {
    constructor() {
        super(...arguments);
        // Attributes to inject
        this.offerID = null;
        // Models
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
        this.currentUser = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.CurrentUser);
        this.token = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_0__.Item.AuthToken);
    }
    async connectedCallback() {
        if (!this.currentUser || !this.token) {
            console.log("User is not authenticated.");
            return;
        }
        this.onsubmit = (event) => this.handleSubmit(event);
    }
    async handleSubmit(event) {
        event.preventDefault();
        this.offerID = this.getAttribute("offer-id");
        if (!this.offerID) {
            console.error("Missing required attributes.");
            return;
        }
        const form = event.target;
        const formData = new FormData(form);
        const message = formData.get("message");
        let chat;
        try {
            chat = await _services_ChatService__WEBPACK_IMPORTED_MODULE_1__["default"].getOrCreateWithMessage(this.offerID, this.currentUser._id, message);
        }
        catch (error) {
            console.error("Error creating or retrieving chat:", error);
            return;
        }
        window.location.href = `/offer/chat?id=${chat._id}`;
    }
}


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


/***/ })

}]);
//# sourceMappingURL=src_elements_NewChatForm_ts.index.js.map