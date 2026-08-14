import { getServices, SERVICES } from "./services";
import type { Locale } from "@/src/domain/i18n/locales";
import type { Service } from "./models";

export function getServiceBySlug(
  slug: string,
  locale?: Locale,
): Service | undefined {
  return getServices(locale).find((service) => service.slug === slug);
}

export function getServiceSlugs(): readonly string[] {
  return SERVICES.map((service) => service.slug);
}
