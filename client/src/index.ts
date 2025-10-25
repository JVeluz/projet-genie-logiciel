// Load custom elements
import "@presentation/offer_page_element";
import "@presentation/login_element";
import "@presentation/navbar_element";
import "@presentation/card_element";
import "@presentation/grid_element";

const navbar: HTMLElement = document.createElement("app-navbar");
const offerPage: HTMLElement = document.createElement("app-offer-page");

document.body.prepend(navbar);
document.body.appendChild(offerPage);