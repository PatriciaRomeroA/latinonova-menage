import type { Metadata } from "next";
import { getDictionary } from "@/src/domain/i18n/dictionaries";
import { getCurrentLocale } from "@/src/domain/i18n/server-locale";
import { AboutPage } from "@/src/presentation/about/components/AboutPage";
import { SiteChrome } from "@/src/presentation/shared/components/SiteChrome";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.metadata.aboutTitle,
    description: dictionary.metadata.aboutDescription,
  };
}

export default async function AboutRoute() {
  const locale = await getCurrentLocale();
  const dictionary = getDictionary(locale);

  return (
    <SiteChrome activeNavigationHref="/a-propos">
      <AboutPage copy={dictionary.aboutPage} />
    </SiteChrome>
  );
}
