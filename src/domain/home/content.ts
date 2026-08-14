import type { HomePageContent, NavigationItem } from "./models";
import {
  contactInfo,
  getEmailHref,
  getPhoneTelHref,
} from "@/src/domain/contact/contact-info";
import { getDictionary } from "@/src/domain/i18n/dictionaries";
import { DEFAULT_LOCALE, type Locale } from "@/src/domain/i18n/locales";
import { getServices } from "@/src/domain/services/services";

export function getHomeContent(locale: Locale = DEFAULT_LOCALE): HomePageContent {
  const dictionary = getDictionary(locale);
  const services = getServices(locale);
  const serviceLinks: readonly NavigationItem[] = services.map((service) => ({
    label: service.title,
    href: `/services/${service.slug}`,
  }));

  const navigationLinks: readonly NavigationItem[] = [
    { label: dictionary.navigation.home, href: "/#accueil" },
    { label: dictionary.navigation.services, href: "/services" },
    { label: dictionary.navigation.about, href: "/a-propos" },
    { label: dictionary.navigation.quote, href: "/soumission" },
    { label: dictionary.navigation.contact, href: "/#contact" },
  ];

  const headerNavigation: readonly NavigationItem[] = navigationLinks
    .filter((item) => item.href !== "/soumission")
    .map((item) =>
      item.href === "/services" ? { ...item, children: serviceLinks } : item,
    );

  return {
    navigation: headerNavigation,
    contacts: [
      { label: dictionary.topbar.area, icon: "location" },
      { label: dictionary.topbar.schedule, icon: "clock" },
      { label: contactInfo.phoneDisplay, href: getPhoneTelHref(), icon: "phone" },
      {
        label: contactInfo.email,
        href: getEmailHref(),
        icon: "email",
      },
    ],
    trustBenefits: dictionary.benefits.trust,
    aboutBenefits: dictionary.benefits.about,
    footerColumns: [
      {
        title: dictionary.footer.navigationTitle,
        links: navigationLinks,
      },
      {
        title: dictionary.footer.servicesTitle,
        links: serviceLinks,
      },
    ],
  };
}

export const homePageContent = getHomeContent(DEFAULT_LOCALE);
