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

// Gérer la navigation via les boutons Précédent/Suivant du navigateur
window.onpopstate = () => renderCurrentPage();

// Intercepter les clics sur les liens internes
window.addEventListener('click', (event: Event) => {
    const anchor = (event.target as HTMLElement).closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('/')) {
        event.preventDefault();
        navigateTo(href);
    }
});
