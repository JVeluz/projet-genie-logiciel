"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_pages_EditUserPage_ts"],{

/***/ "./src/html/user-edit-page.html":
/*!**************************************!*\
  !*** ./src/html/user-edit-page.html ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La navbar est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Contenu Principal -->\r\n<main class=\"container py-5\">\r\n    <!-- Changement de la structure en 2 colonnes avec g-5 pour l'espacement -->\r\n    <div class=\"row g-5 justify-content-center\">\r\n\r\n        <!-- COLONNE 1: FORMULAIRE D'ÉDITION -->\r\n        <div class=\"col-12 col-lg-7\">\r\n\r\n            <h2 class=\"text-center fw-bold text-primary mb-4\">Modifier votre profil</h2>\r\n\r\n            <!-- Carte principale contenant le formulaire -->\r\n            <div class=\"card shadow-lg border-0\">\r\n                <div class=\"card-body p-4 p-md-5\">\r\n\r\n                    <form>\r\n\r\n                        <!-- Champ Avatar -->\r\n                        <div class=\"mb-3 text-center\">\r\n                            <label for=\"edit-avatar\" class=\"form-label fw-bold\">Photo de profil</label>\r\n                            <div>\r\n                                <img src=\"https://placehold.co/120x120/17A2B8/ffffff?text=U\"\r\n                                    class=\"img-thumbnail rounded-circle mb-3\" alt=\"Avatar actuel\" width=\"120\"\r\n                                    height=\"120\">\r\n                            </div>\r\n                            <!-- ID ajouté pour le script -->\r\n                            <input class=\"form-control\" type=\"file\" accept=\"image/*\" id=\"edit-avatar\">\r\n                        </div>\r\n\r\n                        <!-- Champ Nom -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"edit-name\" class=\"form-label fw-bold\">Votre Nom</label>\r\n                            <!-- ID ajouté pour le script -->\r\n                            <input type=\"text\" class=\"form-control\" value=\"Alice Dubois\" required id=\"edit-name\">\r\n                        </div>\r\n\r\n                        <!-- Champ Email -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"edit-email\" class=\"form-label fw-bold\">Adresse Email</label>\r\n                            <!-- ID ajouté pour le script -->\r\n                            <input type=\"email\" class=\"form-control\" value=\"alice.dubois@exemple.com\" required\r\n                                id=\"edit-email\">\r\n                        </div>\r\n\r\n                        <!-- Champ Biographie -->\r\n                        <div class=\"mb-3\">\r\n                            <label for=\"edit-bio\" class=\"form-label fw-bold\">Ma biographie</label>\r\n                            <!-- ID ajouté pour le script -->\r\n                            <textarea class=\"form-control\" rows=\"4\"\r\n                                id=\"edit-bio\">J'aime le jardinage et les échanges de services.</textarea>\r\n                        </div>\r\n\r\n                        <hr class=\"my-4\">\r\n\r\n                        <!-- Boutons d'action -->\r\n                        <div class=\"d-flex flex-wrap justify-content-between align-items-center\">\r\n                            <button type=\"submit\" class=\"btn btn-primary btn-lg mb-2\">\r\n                                <i class=\"bi bi-check-circle me-2\"></i>Enregistrer\r\n                            </button>\r\n                            <a href=\"/profile\" class=\"btn btn-outline-secondary mb-2\">\r\n                                Annuler\r\n                            </a>\r\n                            <button type=\"button\" class=\"btn btn-outline-danger mb-2\" data-bs-toggle=\"modal\"\r\n                                data-bs-target=\"#deleteUserModal\">\r\n                                <i class=\"bi bi-trash me-2\"></i>Supprimer le compte\r\n                            </button>\r\n                        </div>\r\n\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div> <!-- Fin de la colonne formulaire -->\r\n\r\n        <!-- COLONNE 2: APERÇU DE LA CARTE -->\r\n        <div class=\"col-12 col-lg-5\">\r\n            <!-- sticky-top garde l'aperçu visible pendant le scroll -->\r\n            <div class=\"sticky-top\" style=\"top: 5rem;\">\r\n                <h4 class=\"text-center text-primary mb-4\">Aperçu de la carte</h4>\r\n\r\n                <!-- Carte d'aperçu -->\r\n                <div class=\"card shadow-lg text-center p-3\">\r\n                    <div class=\"card-body\">\r\n\r\n                        <user-element>\r\n                            <img src=\"https://placehold.co/120x120/17A2B8/ffffff?text=U\" alt=\"Aperçu Avatar\" width=\"120\"\r\n                                height=\"120\"\r\n                                class=\"user-avatar rounded-circle mb-3 border border-3 border-primary shadow\">\r\n\r\n                            <h5 class=\"user-name fw-bold mb-1\">\r\n                                ?\r\n                            </h5>\r\n\r\n                            <p class=\"user-bio text-muted fst-italic\">\r\n                                ?\r\n                            </p>\r\n\r\n                            <p class=\"user-rating mb-3 text-warning\">⭐⭐⭐⭐⭐ <small class=\"text-muted\">(Aperçu)</small>\r\n                            </p>\r\n\r\n                            <a href=\"#\" class=\"btn btn-outline-primary w-100 mt-2 disabled\" tabindex=\"-1\"\r\n                                aria-disabled=\"true\">\r\n                                Voir le Profil\r\n                            </a>\r\n                        </user-element>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div> <!-- Fin de la colonne aperçu -->\r\n\r\n    </div>\r\n</main>\r\n\r\n<!-- Modal de Confirmation de Suppression de Compte (Inchangé) -->\r\n<div class=\"modal fade\" id=\"deleteUserModal\" tabindex=\"-1\" aria-labelledby=\"deleteUserModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-dialog-centered\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h5 class=\"modal-title text-danger\" id=\"deleteUserModalLabel\">\r\n                    <i class=\"bi bi-exclamation-triangle-fill me-2\"></i>Confirmer la suppression du compte\r\n                </h5>\r\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                Êtes-vous sûr de vouloir supprimer votre compte ? <br>\r\n                Toutes vos annonces et informations seront définitivement perdues.\r\n                <br><strong>Cette action est irréversible.</strong>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Annuler</button>\r\n                <button type=\"button\" class=\"btn btn-danger\">Oui, supprimer mon compte</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

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

/***/ "./src/pages/EditUserPage.ts":
/*!***********************************!*\
  !*** ./src/pages/EditUserPage.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditUserPage)
/* harmony export */ });
/* harmony import */ var _html_user_edit_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/user-edit-page.html */ "./src/html/user-edit-page.html");
/* harmony import */ var _models_Application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/Application */ "./src/models/Application.ts");


class EditUserPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_user_edit_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        const currentUser = _models_Application__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance().get(_models_Application__WEBPACK_IMPORTED_MODULE_1__.Item.CurrentUser);
        if (currentUser) {
            const userElement = this.querySelector('user-element');
            customElements.whenDefined('user-element').then(() => {
                userElement.update(currentUser);
            });
        }
    }
}


/***/ })

}]);
//# sourceMappingURL=src_pages_EditUserPage_ts.index.js.map