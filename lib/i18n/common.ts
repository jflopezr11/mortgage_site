import type { Locale } from "./config";

const common = {
  en: {
    nav: { home: "Home", mortgage: "Mortgage", realEstate: "Real Estate", about: "About Joshua", resources: "Resources", contact: "Contact", getStarted: "Get Started" },
    language: "Español",
    languageAria: "Cambiar a español",
    primaryNavigation: "Primary navigation",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    footerDescription: "Mortgage and real estate guidance for California consumers, available in English and Spanish.",
    navigation: "Navigation",
    affiliations: "Current affiliations",
    mortgageAffiliation: "Mortgage services through Got Mortgage Solutions.",
    realEstateAffiliation: "Real estate services through Got Real Estate Solutions.",
    contactJoshua: "Contact Joshua",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    loading: "Loading…",
    errorTitle: "Something went wrong.",
    errorBody: "Please try again. If the problem continues, contact Joshua.",
    retry: "Try again",
    notFoundTitle: "Page not found",
    notFoundBody: "The page you requested could not be found.",
    returnHome: "Return home",
  },
  es: {
    nav: { home: "Inicio", mortgage: "Hipoteca", realEstate: "Bienes raíces", about: "Sobre Joshua", resources: "Recursos", contact: "Contacto", getStarted: "Comenzar" },
    language: "English",
    languageAria: "Switch to English",
    primaryNavigation: "Navegación principal",
    openMenu: "Abrir el menú de navegación",
    closeMenu: "Cerrar el menú de navegación",
    footerDescription: "Orientación hipotecaria y de bienes raíces para consumidores de California, disponible en inglés y español.",
    navigation: "Navegación",
    affiliations: "Afiliaciones actuales",
    mortgageAffiliation: "Servicios hipotecarios por medio de Got Mortgage Solutions.",
    realEstateAffiliation: "Servicios de bienes raíces por medio de Got Real Estate Solutions.",
    contactJoshua: "Contactar a Joshua",
    rights: "Todos los derechos reservados.",
    privacy: "Política de privacidad",
    loading: "Cargando…",
    errorTitle: "Ocurrió un problema.",
    errorBody: "Inténtelo de nuevo. Si el problema continúa, contacte a Joshua.",
    retry: "Intentar de nuevo",
    notFoundTitle: "Página no encontrada",
    notFoundBody: "No se encontró la página que solicitó.",
    returnHome: "Volver al inicio",
  },
} as const;

export function getCommonMessages(locale: Locale) {
  return common[locale];
}
