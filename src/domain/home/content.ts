import type { HomePageContent, NavigationItem } from "./models";
import { SERVICES } from "@/src/domain/services/services";

const serviceLinks: readonly NavigationItem[] = SERVICES.map((service) => ({
  label: service.title,
  href: `/services/${service.slug}`,
}));

const navigationLinks: readonly NavigationItem[] = [
  { label: "Accueil", href: "/#accueil" },
  { label: "Services", href: "/services" },
  { label: "Secteurs", href: "/#services" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Soumission", href: "/#soumission" },
  { label: "Contact", href: "/#contact" },
];

const headerNavigation: readonly NavigationItem[] = navigationLinks.map((item) =>
  item.href === "/services" ? { ...item, children: serviceLinks } : item,
);

export const homePageContent: HomePageContent = {
  navigation: headerNavigation,
  contacts: [
    { label: "Montréal & Rive-Nord", icon: "location" },
    { label: "Lundi - Vendredi : 7h00 - 18h00", icon: "clock" },
    { label: "514 123-4567", href: "tel:+15141234567", icon: "phone" },
    {
      label: "info@latinovamenage.com",
      href: "mailto:info@latinovamenage.com",
      icon: "email",
    },
  ],
  trustBenefits: [
    { label: "Service fiable et professionnel", icon: "shieldCheck" },
    { label: "Réponse rapide 24h", icon: "replyFast" },
    { label: "Satisfaction garantie", icon: "satisfaction" },
  ],
  aboutBenefits: [
    { label: "Équipe professionnelle", icon: "team" },
    { label: "Produits de qualité et écologiques", icon: "eco" },
    { label: "Respect de vos espaces", icon: "respect" },
    { label: "Flexibilité et adaptabilité", icon: "flexibility" },
  ],
  footerColumns: [
    {
      title: "Navigation",
      links: navigationLinks,
    },
    {
      title: "Services",
      links: serviceLinks,
    },
  ],
};
