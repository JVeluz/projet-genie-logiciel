import OfferSearchPage from "elements/OfferSearchPage";
import LoginPage from "elements/LoginPage";
import RegisterPage from "elements/RegisterPage";
import OfferPage from "elements/OfferPage";
import UserPage from "elements/UserPage";
import EditOfferPage from "elements/EditOfferPage";
import EditUserPage from "elements/EditUserPage";

import LoginElement from "elements/LoginElement";
import NavbarElement from "elements/NavbarElement";
import OfferElement from "elements/OfferElement";
import UserElement from "elements/UserElement";


// Pages
customElements.define("offer-search-page", OfferSearchPage);
customElements.define("offer-page", OfferPage);
customElements.define("edit-offer-page", EditOfferPage);
customElements.define("login-page", LoginPage);
customElements.define("register-page", RegisterPage);
customElements.define("user-page", UserPage);
customElements.define("edit-user-page", EditUserPage);

// Elements
customElements.define("navbar-element", NavbarElement);
customElements.define("offer-element", OfferElement);
customElements.define("user-element", UserElement);
customElements.define("login-element", LoginElement, { extends: "form" });
