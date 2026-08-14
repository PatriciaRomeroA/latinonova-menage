import type { HomePageContent, NavigationItem } from "./models";
import {
  contactInfo,
  getEmailHref,
  getPhoneTelHref,
} from "@/src/domain/contact/contact-info";
import { SERVICES } from "@/src/domain/services/services";

const serviceLinks: readonly NavigationItem[] = SERVICES.map((service) => ({
  label: service.title,
  href: `/services/${service.slug}`,
}));

const navigationLinks: readonly NavigationItem[] = [
  { label: "Accueil", href: "/#accueil" },
  { label: "Services", href: "/services" },
  { label: "À propos", href: "/a-propos" },
  { label: "Soumission", href: "/soumission" },
  { label: "Contact", href: "/#contact" },
];

const headerNavigation: readonly NavigationItem[] = navigationLinks
  .filter((item) => item.label !== "Soumission")
  .map((item) =>
    item.href === "/services" ? { ...item, children: serviceLinks } : item,
  );

export const homePageContent: HomePageContent = {
  navigation: headerNavigation,
  contacts: [
    { label: "Montréal & Rive-Nord", icon: "location" },
    { label: "Lundi - Vendredi : 7h00 - 18h00", icon: "clock" },
    { label: contactInfo.phoneDisplay, href: getPhoneTelHref(), icon: "phone" },
    {
      label: contactInfo.email,
      href: getEmailHref(),
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
