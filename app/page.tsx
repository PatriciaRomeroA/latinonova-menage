import { getHomePageContent } from "@/src/application/home/get-home-page-content";
import { SERVICES } from "@/src/domain/services/services";
import { AboutSection } from "@/src/presentation/home/components/AboutSection";
import { HeroSection } from "@/src/presentation/home/components/HeroSection";
import { QuoteBanner } from "@/src/presentation/home/components/QuoteBanner";
import { ServicesSection } from "@/src/presentation/home/components/ServicesSection";
import { SiteChrome } from "@/src/presentation/shared/components/SiteChrome";

export default function Home() {
  const content = getHomePageContent();

  return (
    <SiteChrome activeNavigationHref="/#accueil" footerOverlapsBanner>
      <HeroSection benefits={content.trustBenefits} />
      <ServicesSection
        services={SERVICES.filter((service) => service.slug !== "nettoyage-de-vitres")}
      />
      <AboutSection />
      <QuoteBanner />
    </SiteChrome>
  );
}
