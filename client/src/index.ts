import Application from "./application"

import "@pages/offer-page/offer_page_view";
import "@components/card";
import "@components/grid";

const offerPageView: HTMLElement = document.createElement("offer-page-view");

Application.getInstance().changeView(offerPageView);