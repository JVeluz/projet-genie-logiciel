const DEFAULT_PAGE: HTMLElement = document.createElement('offer-search-page');

const ROUTES_TO_PAGES: { [key: string]: HTMLElement } = {
    "/login": document.createElement('login-page'),
    "/register": document.createElement('register-page'),
    "/offer": document.createElement('offer-page'),
    "/offer/edit": document.createElement('edit-offer-page'),
    "/user": document.createElement('user-page'),
    "/user/edit": document.createElement('edit-user-page'),
};

function renderCurrentPage(): void {
    const path: string = window.location.pathname;
    const page: HTMLElement = ROUTES_TO_PAGES[path] || DEFAULT_PAGE;
    document.body.innerHTML = "";
    document.body.appendChild(page);
}

export default function navigateTo(fullPath: string): void {
    history.pushState(null, "", fullPath);
    renderCurrentPage();
}

const initialPath = window.location.pathname + window.location.search;
history.replaceState(null, "", initialPath);
renderCurrentPage();

window.onpopstate = () => renderCurrentPage();

window.addEventListener('click', (event: Event) => {
    const anchor = (event.target as HTMLElement).closest('a');
    if (!anchor) {
        return; // Ce n'est pas un clic sur un lien, on ne fait rien.
    }
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('/')) {
        // Empêche le navigateur de recharger la page
        event.preventDefault();
        navigateTo(href);
    }
});
