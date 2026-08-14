import { getHomePageContent } from "@/src/application/home/get-home-page-content";
import { getDictionary } from "@/src/domain/i18n/dictionaries";
import { getCurrentLocale } from "@/src/domain/i18n/server-locale";
import { getServices } from "@/src/domain/services/services";
import { AboutSection } from "@/src/presentation/home/components/AboutSection";
import { HeroSection } from "@/src/presentation/home/components/HeroSection";
import { QuoteBanner } from "@/src/presentation/home/components/QuoteBanner";
import { ServicesSection } from "@/src/presentation/home/components/ServicesSection";
import { SiteChrome } from "@/src/presentation/shared/components/SiteChrome";

export default async function Home() {
  const locale = await getCurrentLocale();
  const dictionary = getDictionary(locale);
  const content = getHomePageContent(locale);
  const services = getServices(locale);

  return (
    <SiteChrome activeNavigationHref="/#accueil" footerOverlapsBanner>
      <HeroSection
        benefits={content.trustBenefits}
        copy={{
          ...dictionary.hero,
          quoteCta: dictionary.common.quoteCta,
        }}
      />
      <ServicesSection
        copy={dictionary.homeServices}
        services={services.filter((service) => service.slug !== "nettoyage-de-vitres")}
      />
      <AboutSection copy={dictionary.aboutSection} />
      <QuoteBanner copy={dictionary.quoteBanner} />
    </SiteChrome>
  );
}
