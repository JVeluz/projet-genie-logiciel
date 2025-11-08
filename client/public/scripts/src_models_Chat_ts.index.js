"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_models_Chat_ts"],{

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
//# sourceMappingURL=src_models_Chat_ts.index.js.map