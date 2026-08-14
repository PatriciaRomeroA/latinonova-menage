import type { Metadata } from "next";
import { getCurrentLocale } from "@/src/domain/i18n/server-locale";
import { getDictionary } from "@/src/domain/i18n/dictionaries";
import { getServiceBySlug } from "@/src/domain/services/service-resolver";
import { getServices } from "@/src/domain/services/services";
import type { ServiceSlug } from "@/src/domain/services/services";
import { QuotePageSection } from "@/src/presentation/quote/components/QuotePageSection";
import { SiteChrome } from "@/src/presentation/shared/components/SiteChrome";

type SoumissionPageProps = {
  readonly searchParams: Promise<{ readonly service?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.metadata.quoteTitle,
    description: dictionary.metadata.quoteDescription,
  };
}

export default async function SoumissionPage({
  searchParams,
}: SoumissionPageProps) {
  const locale = await getCurrentLocale();
  const dictionary = getDictionary(locale);
  const services = getServices(locale);
  const { service } = await searchParams;
  const matchedService = service ? getServiceBySlug(service, locale) : undefined;

  return (
    <SiteChrome activeNavigationHref="/soumission">
      <QuotePageSection
        confirmationCopy={dictionary.confirmation}
        copy={dictionary.quotePage}
        formCopy={dictionary.quoteForm}
        initialService={matchedService?.slug as ServiceSlug | undefined}
        labels={dictionary.common}
        services={services}
      />
    </SiteChrome>
  );
}
