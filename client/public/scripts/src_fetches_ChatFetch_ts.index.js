"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_fetches_ChatFetch_ts"],{

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
    static async getOrCreate(offerID, buyerID, token) {
        const body = { offerID, buyerID };
        return this.request("/chats", "POST", body, token);
    }
    static async sendMessage(chatID, currentUserID, content, token) {
        const body = { senderID: currentUserID, content };
        return this.request(`/chats/${chatID}`, "POST", body, token);
    }
}
ChatFetch.pendingRequests = new Map();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatFetch);


/***/ })

}]);
//# sourceMappingURL=src_fetches_ChatFetch_ts.index.js.map