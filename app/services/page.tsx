import type { Metadata } from "next";
import { getDictionary } from "@/src/domain/i18n/dictionaries";
import { getCurrentLocale } from "@/src/domain/i18n/server-locale";
import { getServices } from "@/src/domain/services/services";
import { ServicesDirectory } from "@/src/presentation/services/components/ServicesDirectory";
import { SiteChrome } from "@/src/presentation/shared/components/SiteChrome";

export const metadata: Metadata = {
  title: "Services de nettoyage | Latinova Ménage inc.",
  description:
    "Découvrez les services de nettoyage commercial, institutionnel, après rénovation, de vitres et résidentiel de Latinova Ménage.",
};

export default async function ServicesPage() {
  const locale = await getCurrentLocale();
  const dictionary = getDictionary(locale);

  return (
    <SiteChrome activeNavigationHref="/services">
      <ServicesDirectory
        copy={{
          ...dictionary.servicesDirectory,
          discoverService: dictionary.common.discoverService,
        }}
        services={getServices(locale)}
      />
    </SiteChrome>
  );
}
