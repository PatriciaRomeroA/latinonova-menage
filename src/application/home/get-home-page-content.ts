import { getHomeContent } from "@/src/domain/home/content";
import { DEFAULT_LOCALE, type Locale } from "@/src/domain/i18n/locales";
import type { HomePageContent } from "@/src/domain/home/models";

export function getHomePageContent(
  locale: Locale = DEFAULT_LOCALE,
): HomePageContent {
  return getHomeContent(locale);
}
