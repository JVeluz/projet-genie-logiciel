"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_NewChatForm_ts"],{

/***/ "./src/elements/NewChatForm.ts":
/*!*************************************!*\
  !*** ./src/elements/NewChatForm.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NewChatForm)
/* harmony export */ });
/* harmony import */ var _fetches_ChatFetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../fetches/ChatFetch */ "./src/fetches/ChatFetch.ts");
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");
/* harmony import */ var _models_Chat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/Chat */ "./src/models/Chat.ts");



class NewChatForm extends HTMLFormElement {
    constructor() {
        super(...arguments);
        // Attributes to inject
        this.offerID = null;
        // Models
        this.application = _models_Application__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance();
        this.currentUser = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_1__.Item.CurrentUser);
        this.token = this.application.get(_models_Application__WEBPACK_IMPORTED_MODULE_1__.Item.AuthToken);
    }
    async connectedCallback() {
        await customElements.whenDefined("new-chat-form");
        this.offerID = this.getAttribute("offer-id");
        if (!this.offerID) {
            console.error("Missing required attributes.");
            return;
        }
        if (!this.currentUser || !this.token) {
            console.error("User is not authenticated.");
            return;
        }
        this.onsubmit = (event) => this.handleSubmit(event);
    }
    async handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const message = formData.get("message");
        const result = await _fetches_ChatFetch__WEBPACK_IMPORTED_MODULE_0__["default"].getOrCreateWithMessage(this.offerID, this.currentUser._id, message, this.token);
        if (!result) {
            console.error("Failed to create or retrieve chat.");
            return;
        }
        const chat = _models_Chat__WEBPACK_IMPORTED_MODULE_2__["default"].fromJSON(result);
        window.location.href = `/offer/chat?id=${chat._id}`;
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
//# sourceMappingURL=src_elements_NewChatForm_ts.index.js.map