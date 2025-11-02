"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_elements_UserElement_ts"],{

/***/ "./src/elements/UserElement.ts":
/*!*************************************!*\
  !*** ./src/elements/UserElement.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserElement)
/* harmony export */ });
class UserElement extends HTMLElement {
    connectedCallback() {
        this.nameElement = this.querySelector('.user-name');
        this.bioElement = this.querySelector('.user-bio');
        this.locationElement = this.querySelector('.user-location');
        this.rateElement = this.querySelector('.user-rating');
        this.profileButton = this.querySelector('.user-profile-button');
        this.avatarElement = this.querySelector('.user-avatar');
        this.offerContainer = this.querySelector('.user-offers');
    }
    update(user) {
        if (this.nameElement)
            this.nameElement.textContent = user.name;
        if (this.bioElement)
            this.bioElement.textContent = user.bio || '?';
        if (this.locationElement)
            this.locationElement.textContent = user.location || '?';
        if (this.rateElement)
            this.rateElement.textContent = this.rateToStars(user.rating);
        if (this.profileButton)
            this.profileButton.href = `/user?id=${user._id}`;
        if (this.avatarElement)
            this.avatarElement.src = this.getAvatarUrl(user);
        if (this.offerContainer) {
            this.offerContainer.innerHTML = '';
            user.offers?.forEach(offer => {
                const offerElement = document.createElement('offer-element');
                offerElement.classList.add('col');
                this.offerContainer.appendChild(offerElement);
                offerElement.update(offer);
            });
        }
    }
    getAvatarUrl(user) {
        return user.avatar || `https://placehold.co/120x120/17A2B8/ffffff?text=${user.name[0]}`;
    }
    rateToStars(rate) {
        const fullStars = Math.floor(rate);
        const halfStar = rate % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        return '⭐'.repeat(fullStars) + (halfStar ? '⭐️' : '') + '☆'.repeat(emptyStars);
    }
}


/***/ })

}]);
//# sourceMappingURL=src_elements_UserElement_ts.index.js.map