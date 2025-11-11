"use strict";
(self["webpackChunkfront_end"] = self["webpackChunkfront_end"] || []).push([["src_composants_UserElement_ts"],{

/***/ "./src/composants/UserElement.ts":
/*!***************************************!*\
  !*** ./src/composants/UserElement.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserElement)
/* harmony export */ });
class UserElement extends HTMLElement {
    update(user) {
        const profileButton = this.querySelector(".user-profile-button");
        const nameElement = this.querySelector(".user-name");
        const bioElement = this.querySelector(".user-bio");
        const locationElement = this.querySelector(".user-location");
        const rateElement = this.querySelector(".user-rating");
        const avatarElement = this.querySelector(".user-avatar");
        if (profileButton)
            profileButton.href = `/user?id=${user._id}`;
        if (nameElement)
            nameElement.textContent = user.name;
        if (bioElement)
            bioElement.textContent = this.getBio(user);
        if (locationElement)
            locationElement.textContent = this.getLocation(user);
        if (rateElement)
            rateElement.textContent = this.rateToStars(user.rating);
        if (avatarElement)
            avatarElement.src = this.getAvatarUrl(user);
    }
    getBio(user) {
        return user.bio || "Aucune bio disponible.";
    }
    getLocation(user) {
        return user.location || "Non spécifiée";
    }
    getAvatarUrl(user) {
        return user.avatar || `https://placehold.co/120x120/17A2B8/ffffff?text=${user.name[0]}`;
    }
    rateToStars(rate) {
        const fullStars = Math.floor(rate);
        const halfStar = rate % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        return "⭐".repeat(fullStars) + (halfStar ? "⭐️" : "") + "☆".repeat(emptyStars);
    }
}


/***/ })

}]);
//# sourceMappingURL=src_composants_UserElement_ts.index.js.map