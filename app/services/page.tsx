import type { Metadata } from "next";
import { SERVICES } from "@/src/domain/services/services";
import { ServicesDirectory } from "@/src/presentation/services/components/ServicesDirectory";
import { SiteChrome } from "@/src/presentation/shared/components/SiteChrome";

export const metadata: Metadata = {
  title: "Services de nettoyage | Latinova Ménage inc.",
  description:
    "Découvrez les services de nettoyage commercial, institutionnel, après rénovation, de vitres et résidentiel de Latinova Ménage.",
};

export default function ServicesPage() {
  return (
    <SiteChrome activeNavigationHref="/services">
      <ServicesDirectory services={SERVICES} />
    </SiteChrome>
  );
}
