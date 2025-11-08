"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_html_HTMLLoader_ts"],{

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


/***/ })

}]);
//# sourceMappingURL=src_html_HTMLLoader_ts.index.js.map