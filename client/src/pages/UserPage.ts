import IUser from "shared/src/interfaces/IUser";
import HTML from "../html/user-page.html";
import OfferCardHTML from "../html/offer-card.html";
import UserPageController from "../controllers/UserPageController";
import UserElement from "../elements/UserElement";
import OfferElement from "../elements/OfferElement";

export interface Model {
    user: Partial<IUser>;
    isCurrentUser: boolean;
}

export default class UserPage extends HTMLElement {

    public async connectedCallback(): Promise<void> {
        this.innerHTML = HTML;
        new UserPageController(this);
    }

    public update(model: Model): void {
        const editButton = this.querySelector("#user-edit-button") as HTMLAnchorElement;
        const userElement = this.querySelector("#user-element") as UserElement;
        const offersContainer = this.querySelector("#user-offers") as HTMLElement;

        editButton.href = `/user/edit?id=${model.user._id}`;
        editButton.style.display = model.isCurrentUser ? "block" : "none";
        userElement.update(model.user);

        if (!model.user.offers)
            return;
        for (const offer of model.user.offers) {
            const offerElement = document.createElement("offer-element") as OfferElement;
            offerElement.innerHTML = OfferCardHTML;
            offerElement.update(offer);
            offersContainer.appendChild(offerElement);
        }
    }
}