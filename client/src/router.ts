const DEFAULT_PAGE: string = "offer-search-page";

const ROUTES_TO_PAGES: { [key: string]: string } = {
    "/login": "login-page",
    "/register": "register-page",
    "/offer": "offer-page",
    "/offer/chat": "offer-chat-page",
    "/offer/new": "offer-create-page",
    "/offer/edit": "offer-edit-page",
    "/user": "user-page",
    "/user/edit": "user-edit-page",
};

export default class Router {

    public static initialize(): void {
        const path: string = window.location.pathname + window.location.search;
        history.replaceState(null, "", path);
        Router.renderCurrentPage();
        window.onpopstate = () => Router.onPopState();
        window.onclick = (event: Event) => Router.onClick(event);
    }

    private static renderCurrentPage(): void {
        const path: string = window.location.pathname;
        const page: HTMLElement = document.createElement(ROUTES_TO_PAGES[path] || DEFAULT_PAGE);
        document.body.innerHTML = "";
        document.body.appendChild(page);
    }

    private static onPopState(): void { Router.renderCurrentPage(); }

    // Interception des liens dans les balises <a>
    private static onClick(event: Event): void {
        const target: HTMLElement = event.target as HTMLElement;
        const anchor: HTMLAnchorElement | null = target.closest("a");
        if (anchor === null)
            return;
        const href: string | null = anchor.getAttribute("href");
        if (href && href.startsWith("/")) {
            event.preventDefault();
            history.pushState(null, "", href);
            Router.renderCurrentPage();
        }
    }
}
