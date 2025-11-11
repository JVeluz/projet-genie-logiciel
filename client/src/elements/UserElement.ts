import User from "../models/User";

export default class UserElement extends HTMLElement {

    public update(user: User): void {
        const profileButton = this.querySelector(".user-profile-button") as HTMLAnchorElement;
        const nameElement = this.querySelector(".user-name") as HTMLElement;
        const bioElement = this.querySelector(".user-bio") as HTMLElement;
        const locationElement = this.querySelector(".user-location") as HTMLElement;
        const rateElement = this.querySelector(".user-rating") as HTMLElement;
        const avatarElement = this.querySelector(".user-avatar") as HTMLImageElement;
        const memberSinceElement = this.querySelector(".user-member-since") as HTMLElement;

        if (profileButton) profileButton.href = `/user?id=${user._id}`;
        if (nameElement) nameElement.textContent = user.name;


        if (bioElement) bioElement.textContent = this.getBio(user);
        if (locationElement) locationElement.textContent = this.getLocation(user);
        if (rateElement) rateElement.textContent = this.rateToStars(user.rating);
        if (avatarElement) avatarElement.src = this.getAvatarUrl(user);
        if (memberSinceElement) memberSinceElement.textContent = this.getMemberSince(user);
    }

    private getMemberSince(user: User): string {
        return `Membre depuis le ${user.createdAt.toLocaleDateString()}`;
    }

    private getBio(user: User): string {
        return user.bio || "Aucune bio disponible.";
    }

    private getLocation(user: User): string {
        return user.location || "Non spécifiée";
    }

    private getAvatarUrl(user: User): string {
        return user.avatar || `https://placehold.co/120x120/17A2B8/ffffff?text=${user.name[0]}`;
    }

    private rateToStars(rate: number): string {
        const fullStars = Math.floor(rate);
        const halfStar = rate % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        return "⭐".repeat(fullStars) + (halfStar ? "⭐️" : "") + "☆".repeat(emptyStars);
    }
}