const DEFAULT_PAGE: string = "offer-search-page";

const ROUTES_TO_PAGES: { [key: string]: string } = {
    "/login": "login-page",
    "/register": "register-page",
    "/offer": "offer-page",
    "/offer/create": "create-offer-page",
    "/offer/edit": "edit-offer-page",
    "/user": "user-page",
    "/user/edit": "edit-user-page",
};

function renderCurrentPage(): void {
    const path: string = window.location.pathname;
    const page: HTMLElement = document.createElement(ROUTES_TO_PAGES[path] || DEFAULT_PAGE);
    document.body.innerHTML = "";
    document.body.appendChild(page);
}

function onPopState(): void { renderCurrentPage(); }

function onClick(event: Event): void {
    const target: HTMLElement = event.target as HTMLElement;
    const anchor: HTMLAnchorElement | null = target.closest("a");
    if (anchor === null) {
        return;
    }
    const href: string | null = anchor.getAttribute("href");
    if (href && href.startsWith("/")) {
        event.preventDefault();
        history.pushState(null, "", href);
        renderCurrentPage();
    }
}

export default function initialize(): void {
    const initialPath: string = window.location.pathname + window.location.search;
    history.replaceState(null, "", initialPath);
    renderCurrentPage();

    window.onpopstate = () => onPopState();
    window.onclick = (event: Event) => onClick(event);
}