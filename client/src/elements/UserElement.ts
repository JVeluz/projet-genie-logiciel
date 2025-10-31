import User from "../models/User";
import OfferElement from "../elements/OfferElement";


export default class UserElement extends HTMLElement {

    private nameElement?: HTMLElement;
    private bioElement?: HTMLElement;
    private locationElement?: HTMLElement;
    private rateElement?: HTMLElement;
    private profileButton?: HTMLAnchorElement;
    private offerContainer?: HTMLElement;
    private avatarElement?: HTMLImageElement;

    public connectedCallback(): void {
        this.nameElement = this.querySelector('.user-name') as HTMLElement;
        this.bioElement = this.querySelector('.user-bio') as HTMLElement;
        this.locationElement = this.querySelector('.user-location') as HTMLElement;
        this.rateElement = this.querySelector('.user-rating') as HTMLElement;
        this.profileButton = this.querySelector('.user-profile-button') as HTMLAnchorElement;
        this.avatarElement = this.querySelector('.user-avatar') as HTMLImageElement;
        this.offerContainer = this.querySelector('.user-offers') as HTMLElement;
    }

    public update(user: User): void {
        if (this.nameElement) this.nameElement.textContent = user.name;
        if (this.bioElement) this.bioElement.textContent = user.bio || '?';
        if (this.locationElement) this.locationElement.textContent = user.location || '?';
        if (this.rateElement) this.rateElement.textContent = this.rateToStars(user.rating);
        if (this.profileButton) this.profileButton.href = `/user?id=${user.id}`;
        if (this.avatarElement) this.avatarElement.src = this.getAvatarUrl(user);
        if (this.offerContainer) {
            this.offerContainer.innerHTML = '';
            user.offers?.forEach(offer => {
                const offerElement = document.createElement('offer-element') as OfferElement;
                offerElement.classList.add('col');
                this.offerContainer!.appendChild(offerElement);
                offerElement.update(offer);
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