"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_EditOfferPage_ts"],{

/***/ "./src/elements/EditOfferPage.ts":
/*!***************************************!*\
  !*** ./src/elements/EditOfferPage.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditOfferPage)
/* harmony export */ });
/* harmony import */ var _html_edit_offer_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/edit-offer-page.html */ "./src/html/edit-offer-page.html");

class EditOfferPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = _html_edit_offer_page_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        const pageTitle = this.querySelector(".page-title");
        const offerForm = this.querySelector(".offer-form");
        const offerPreview = this.querySelector(".offer-preview");
        const createButton = this.querySelector(".offer-create-button");
        const updateButton = this.querySelector(".offer-update-button");
        const deleteButton = this.querySelector(".offer-delete-button");
        const confirmDeleteButton = this.querySelector(".offer-confirm-delete-button");
        const urlParams = new URLSearchParams(window.location.search);
        const offerID = urlParams.get("id");
        const editMode = offerID !== null;
        if (editMode) {
            createButton.style.display = "none";
            updateButton.style.display = "block";
            deleteButton.style.display = "block";
            pageTitle.textContent = "Modifier l'offre";
        }
        else {
            createButton.style.display = "block";
            updateButton.style.display = "none";
            deleteButton.style.display = "none";
            pageTitle.textContent = "Créer une offre";
        }
        customElements.whenDefined("offer-form").then(() => {
            offerForm.controller?.setPreview(offerPreview);
            if (editMode) {
                offerForm.controller?.load(offerID);
                offerForm.controller?.setUpdateButton(updateButton);
                offerForm.controller?.setDeleteButton(confirmDeleteButton);
            }
            else {
                offerForm.controller?.setCreateButton(createButton);
            }
        });
    }
}


/***/ }),

/***/ "./src/html/edit-offer-page.html":
/*!***************************************!*\
  !*** ./src/html/edit-offer-page.html ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<!-- La navbar est incluse ici (composant personnalisé) -->\r\n<navbar-element></navbar-element>\r\n\r\n<!-- Contenu Principal -->\r\n<main class=\"container py-5\">\r\n    <!-- Passage à une structure en 2 colonnes avec espacement g-5 -->\r\n    <div class=\"row g-5 justify-content-center\">\r\n\r\n        <!-- COLONNE 1: FORMULAIRE DE CRÉATION -->\r\n        <div class=\"col-12 col-lg-7\">\r\n\r\n            <h2 class=\"page-title text-center fw-bold text-primary mb-4\">Créer une nouvelle annonce</h2>\r\n\r\n            <!-- Carte principale contenant le formulaire -->\r\n            <div class=\"card shadow-lg border-0\">\r\n                <div class=\"card-body p-4 p-md-5\">\r\n\r\n                    <!-- Formulaire de création d'annonce -->\r\n                    <form is=\"offer-form\" class=\"offer-form\">\r\n\r\n                        <!-- Champ Titre -->\r\n                        <div class=\"mb-3\">\r\n                            <label class=\"form-label fw-bold\">Titre de l'annonce</label>\r\n                            <input name=\"title\" type=\"text\" class=\"form-control\" placeholder=\"Ex: Tondeuse à gazon\"\r\n                                required>\r\n                        </div>\r\n\r\n                        <div class=\"row\">\r\n                            <!-- Champ Catégorie -->\r\n                            <div class=\"col-md-6 mb-3\">\r\n                                <label class=\"form-label fw-bold\">Catégorie</label>\r\n                                <select name=\"category\" class=\"form-select\" required>\r\n                                    <option value=\"\" selected disabled>Choisir...</option>\r\n                                    <option value=\"Jardinage\">Jardinage</option>\r\n                                    <option value=\"Informatique\">Informatique</option>\r\n                                    <option value=\"Bricolage\">Bricolage</option>\r\n                                    <option value=\"Services\">Services</option>\r\n                                    <option value=\"Autre\">Autre</option>\r\n                                </select>\r\n                            </div>\r\n                            <!-- Champ Type d'offre -->\r\n                            <div class=\"col-md-6 mb-3\">\r\n                                <label class=\"form-label fw-bold\">Type d'offre</label>\r\n                                <select name=\"type\" class=\"form-select\" required>\r\n                                    <option value=\"\" selected disabled>Choisir...</option>\r\n                                    <option value=\"Prêt d'Objet\">Prêt d'Objet</option>\r\n                                    <option value=\"Offre de Compétence\">Offre de Compétence</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Champ Description -->\r\n                        <div class=\"mb-3\">\r\n                            <label class=\"form-label fw-bold\">Description</label>\r\n                            <textarea name=\"description\" class=\"form-control\" rows=\"5\"\r\n                                placeholder=\"Décrivez ce que vous proposez...\" required></textarea>\r\n                        </div>\r\n\r\n                        <!-- Champ \"En échange de...\" -->\r\n                        <div class=\"mb-3\">\r\n                            <label class=\"form-label fw-bold\">Ce que vous recherchez en échange</label>\r\n                            <textarea name=\"exchange\" class=\"form-control\" rows=\"3\"\r\n                                placeholder=\"Ex: Un cours de cuisine...\" required></textarea>\r\n                        </div>\r\n\r\n                        <!-- Champ Localisation -->\r\n                        <div class=\"mb-3\">\r\n                            <label class=\"form-label fw-bold\">Localisation</label>\r\n                            <input name=\"location\" type=\"text\" class=\"form-control\" placeholder=\"Ex: Pau, 64000\"\r\n                                required>\r\n                        </div>\r\n\r\n                        <!-- NOUVEAU CHAMP: Prix Demandé -->\r\n                        <div class=\"mb-3\">\r\n                            <label class=\"form-label fw-bold\">Prix / Valeur estimée (Optionnel)</label>\r\n                            <div class=\"input-group\">\r\n                                <input name=\"price\" type=\"number\" class=\"form-control\" placeholder=\"Ex: 50\" min=\"0\"\r\n                                    step=\"1\">\r\n                                <span class=\"input-group-text\">€</span>\r\n                            </div>\r\n                            <div class=\"form-text\">Laissez vide si c'est un pur échange ou un don.</div>\r\n                        </div>\r\n\r\n                        <!-- Champ Images -->\r\n                        <div class=\"mb-3\">\r\n                            <label class=\"form-label fw-bold\">Ajouter des photos</label>\r\n                            <input name=\"pictures\" class=\"form-control\" type=\"file\" accept=\"image/*\">\r\n                            <div class=\"form-text\">La première image sera utilisée pour l'aperçu.</div>\r\n                        </div>\r\n\r\n                        <hr class=\"my-4\">\r\n\r\n                        <!-- Boutons d'action -->\r\n                        <div class=\"d-grid gap-2 d-md-flex justify-content-md-end\">\r\n                            <a href=\"/\" class=\"btn btn-outline-secondary\">\r\n                                Annuler\r\n                            </a>\r\n                            <button type=\"button\" class=\"offer-delete-button btn btn-outline-danger\"\r\n                                data-bs-toggle=\"modal\" data-bs-target=\"#deleteConfirmModal\">\r\n                                <i class=\"bi bi-trash-fill me-2\"></i>\r\n                                Supprimer l'annonce\r\n                            </button>\r\n                            <button type=\"button\" class=\"offer-update-button btn btn-primary btn-lg\">\r\n                                <i class=\"bi bi-save-fill me-2\"></i>\r\n                                Modifier l'annonce\r\n                            </button>\r\n                            <button type=\"button\" class=\"offer-create-button btn btn-primary btn-lg\">\r\n                                <i class=\"bi bi-send-fill me-2\"></i>\r\n                                Publier l'annonce\r\n                            </button>\r\n                        </div>\r\n\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div> <!-- Fin de la colonne formulaire -->\r\n\r\n        <!-- COLONNE 2: APERÇU DE L'OFFRE (Statique) -->\r\n        <div class=\"col-12 col-lg-5\">\r\n            <div class=\"sticky-top\" style=\"top: 2rem;\">\r\n                <h4 class=\"text-center text-primary mb-4\">Aperçu de l'annonce</h4>\r\n                <!-- Carte d'aperçu (style inspiré de la page de détail) -->\r\n                <div class=\"card shadow-lg border-0\">\r\n                    <offer-element class=\"offer-preview\">\r\n                        <!-- Image d'aperçu -->\r\n                        <img src=\"https://placehold.co/800x450/eee/ccc?text=Image+de+l'annonce\"\r\n                            class=\"card-img-top preview-card-image\" alt=\"Aperçu\">\r\n\r\n                        <div class=\"card-body p-4\">\r\n                            <!-- Titre -->\r\n                            <h3 class=\"offer-title card-title fw-bolder preview-title\">\r\n                                Titre de votre annonce\r\n                            </h3>\r\n\r\n                            <!-- NOUVEL APERÇU: Prix -->\r\n                            <h4 class=\"offer-price text-success fw-bold mb-3\">\r\n                                Prix ou valeur\r\n                            </h4>\r\n\r\n                            <!-- Badges -->\r\n                            <div>\r\n                                <span class=\"offer-category badge bg-primary text-uppercase me-2\">\r\n                                    Catégorie\r\n                                </span>\r\n                                <span class=\"offer-type badge bg-warning text-dark text-uppercase\">\r\n                                    Type\r\n                                </span>\r\n                            </div>\r\n\r\n                            <hr>\r\n\r\n                            <!-- Description -->\r\n                            <p class=\"offer-description card-text text-muted preview-description\">\r\n                                Votre description apparaîtra ici...\r\n                            </p>\r\n\r\n                            <h6 class=\"text-secondary mt-4\">Échange souhaité :</h6>\r\n                            <!-- Échange -->\r\n                            <p class=\"offer-exchange card-text fst-italic preview-exchange\">\r\n                                Ce que vous recherchez en échange...\r\n                            </p>\r\n\r\n                            <h6 class=\"text-secondary mt-4\">Localisation :</h6>\r\n                            <!-- Localisation -->\r\n                            <p class=\"offer-location card-text fw-bold preview-location\">\r\n                                <i class=\"bi bi-geo-alt-fill text-danger me-2\"></i>\r\n                                Votre localisation...\r\n                            </p>\r\n                        </div>\r\n                    </offer-element>\r\n                </div>\r\n            </div>\r\n        </div> <!-- Fin de la colonne aperçu -->\r\n    </div>\r\n</main>\r\n\r\n<div class=\"modal fade\" id=\"deleteConfirmModal\" tabindex=\"-1\" aria-labelledby=\"deleteModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-dialog-centered\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header bg-danger text-white\">\r\n                <h5 class=\"modal-title\" id=\"deleteModalLabel\">Confirmer la suppression</h5>\r\n                <button type=\"button\" class=\"btn-close btn-close-white\" data-bs-dismiss=\"modal\"\r\n                    aria-label=\"Close\"></button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est irréversible.\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Annuler</button>\r\n                <!-- Ce bouton devrait avoir sa propre logique de suppression -->\r\n                <button type=\"button\" class=\"offer-confirm-delete-button btn btn-danger\">Oui, supprimer</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");

/***/ })

}]);
//# sourceMappingURL=src_elements_EditOfferPage_ts.index.js.map