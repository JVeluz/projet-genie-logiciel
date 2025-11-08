import User from "../models/User";
import OfferElement from "./OfferElement";
import OfferCardHTML from "../html/offer-card.html";
import Application, { Item } from "../models/Application";
import UserFetch from "../fetches/UserFetch";

export default class UserElement extends HTMLElement {

    public user: User | null = null;

    private nameElement?: HTMLElement;
    private bioElement?: HTMLElement;
    private locationElement?: HTMLElement;
    private rateElement?: HTMLElement;
    private profileButton?: HTMLAnchorElement;
    private offerContainer?: HTMLElement;
    private avatarElement?: HTMLImageElement;

    public async connectedCallback(): Promise<void> {
        await customElements.whenDefined('user-element');

        const userID: string | null = this.getAttribute('user-id');
        if (!userID) {
            console.error("UserElement: missing user-id attribute");
            return;
        }

        const result = await UserFetch.get(userID);
        this.user = result ? User.fromJSON(result) : null;
        if (!this.user) {
            console.error("UserElement: user not found");
            return;
        }

        this.nameElement = this.querySelector('.user-name') as HTMLElement;
        this.bioElement = this.querySelector('.user-bio') as HTMLElement;
        this.locationElement = this.querySelector('.user-location') as HTMLElement;
        this.rateElement = this.querySelector('.user-rating') as HTMLElement;
        this.profileButton = this.querySelector('.user-profile-button') as HTMLAnchorElement;
        this.avatarElement = this.querySelector('.user-avatar') as HTMLImageElement;
        this.offerContainer = this.querySelector('.user-offers') as HTMLElement;

        this.update(this.user!);
    }

    public update(user: User): void {
        const editButton = this.querySelector('.user-edit-button') as HTMLAnchorElement;
        if (editButton) {
            const currentUser = Application.getInstance().get(Item.CurrentUser);
            if (user._id === currentUser?._id) {
                editButton.style.display = 'inline-block';
                editButton.href = `/user/edit?id=${user._id}`;
            } else {
                editButton.style.display = 'none';
            }
        }

        if (this.nameElement) this.nameElement.textContent = user.name;
        if (this.bioElement) this.bioElement.textContent = user.bio || '...';
        if (this.locationElement) this.locationElement.textContent = user.location || '...';
        if (this.rateElement) this.rateElement.textContent = this.rateToStars(user.rating);
        if (this.profileButton) this.profileButton.href = `/user?id=${user._id}`;
        if (this.avatarElement) this.avatarElement.src = this.getAvatarUrl(user);
        if (this.offerContainer) {
            this.offerContainer.innerHTML = '';
            user.offers?.forEach(offer => {
                const offerElement = document.createElement('offer-element') as OfferElement;
                offerElement.innerHTML = OfferCardHTML;
                offerElement.classList.add('col');
                this.offerContainer!.appendChild(offerElement);
                offerElement.setAttribute('offer-id', offer._id);
            });
        }
    }

    private getAvatarUrl(user: User): string {
        return user.avatar || `https://placehold.co/120x120/17A2B8/ffffff?text=${user.name[0]}`;
    }

    private rateToStars(rate: number): string {
        const fullStars = Math.floor(rate);
        const halfStar = rate % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        return '⭐'.repeat(fullStars) + (halfStar ? '⭐️' : '') + '☆'.repeat(emptyStars);
    }
}