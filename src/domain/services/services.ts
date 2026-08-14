import { getDictionary, type ServiceCopyKey } from "@/src/domain/i18n/dictionaries";
import { DEFAULT_LOCALE, type Locale } from "@/src/domain/i18n/locales";
import type { Service } from "./models";

export const SERVICE_PLACEHOLDER = "/images/services/service-placeholder.svg";

type ServiceConfig = {
  readonly slug: string;
  readonly copyKey: ServiceCopyKey;
  readonly image: string;
  readonly imageKey: Service["imageKey"];
};

const SERVICE_CONFIG = [
  {
    slug: "nettoyage-commercial",
    copyKey: "commercial",
    image: "/images/services/commercial_cleaning.png",
    imageKey: "commercial",
  },
  {
    slug: "nettoyage-institutionnel",
    copyKey: "institutional",
    image: "/images/services/institutional_cleaning.png",
    imageKey: "institutional",
  },
  {
    slug: "nettoyage-apres-renovation",
    copyKey: "renovation",
    image: "/images/services/renovation_cleaning.png",
    imageKey: "renovation",
  },
  {
    slug: "nettoyage-de-vitres",
    copyKey: "windows",
    image: "/images/services/glass_cleaning.png",
    imageKey: "windows",
  },
  {
    slug: "nettoyage-residentiel",
    copyKey: "residential",
    image: "/images/services/residential_cleaning.png",
    imageKey: "residential",
  },
] as const satisfies readonly ServiceConfig[];

export function getServices(locale: Locale = DEFAULT_LOCALE): readonly Service[] {
  const dictionary = getDictionary(locale);

  return SERVICE_CONFIG.map((config) => ({
    slug: config.slug,
    image: config.image,
    imageKey: config.imageKey,
    ...dictionary.services[config.copyKey],
  }));
}

export const SERVICES = getServices(DEFAULT_LOCALE);

export type ServiceSlug = (typeof SERVICE_CONFIG)[number]["slug"];
