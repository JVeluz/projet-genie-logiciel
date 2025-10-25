// Load custom elements
import "@elements/offer_page_element";
import "@elements/login_element";
import "@elements/navbar_element";
import "@elements/card_element";
import "@elements/grid_element";

const navbar: HTMLElement = document.createElement("app-navbar");
const offerPage: HTMLElement = document.createElement("app-offer-page");

document.body.prepend(navbar);
document.body.appendChild(offerPage);