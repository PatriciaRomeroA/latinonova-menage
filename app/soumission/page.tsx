import type { Metadata } from "next";
import { getServiceBySlug } from "@/src/domain/services/service-resolver";
import type { ServiceSlug } from "@/src/domain/services/services";
import { QuotePageSection } from "@/src/presentation/quote/components/QuotePageSection";
import { SiteChrome } from "@/src/presentation/shared/components/SiteChrome";

type SoumissionPageProps = {
  readonly searchParams: Promise<{ readonly service?: string }>;
};

export const metadata: Metadata = {
  title: "Soumission gratuite | Latinova Ménage inc.",
  description:
    "Demandez une soumission personnalisée pour vos besoins de nettoyage commercial, institutionnel, résidentiel ou après rénovation.",
};

export default async function SoumissionPage({
  searchParams,
}: SoumissionPageProps) {
  const { service } = await searchParams;
  const matchedService = service ? getServiceBySlug(service) : undefined;

  return (
    <SiteChrome activeNavigationHref="/soumission">
      <QuotePageSection initialService={matchedService?.slug as ServiceSlug | undefined} />
    </SiteChrome>
  );
}
