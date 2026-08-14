import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service introuvable | Latinova Ménage inc." };
  }

  return {
    title: `${service.title} | Latinova Ménage inc.`,
    description: service.subtitle,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <SiteChrome activeNavigationHref="/services">
      <ServiceDetail service={service} />
    </SiteChrome>
  );
}
