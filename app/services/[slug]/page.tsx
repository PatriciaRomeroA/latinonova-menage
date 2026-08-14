import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/src/domain/i18n/dictionaries";
import { getCurrentLocale } from "@/src/domain/i18n/server-locale";
import {
  getServiceBySlug,
  getServiceSlugs,
} from "@/src/domain/services/service-resolver";
import { ServiceDetail } from "@/src/presentation/services/components/ServiceDetail";
import { SiteChrome } from "@/src/presentation/shared/components/SiteChrome";

type ServicePageProps = {
  readonly params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const service = getServiceBySlug(slug, locale);

  if (!service) {
    return { title: getDictionary(locale).metadata.serviceNotFoundTitle };
  }

  return {
    title: `${service.title} | Latinova Ménage inc.`,
    description: service.subtitle,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const dictionary = getDictionary(locale);
  const service = getServiceBySlug(slug, locale);

  if (!service) {
    notFound();
  }

  return (
    <SiteChrome activeNavigationHref="/services">
      <ServiceDetail eyebrow={dictionary.serviceDetail.eyebrow} service={service} />
    </SiteChrome>
  );
}
