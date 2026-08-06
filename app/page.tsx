import { getHomePageContent } from "@/src/application/home/get-home-page-content";
import { AboutSection } from "@/src/presentation/home/components/AboutSection";
import { HeroSection } from "@/src/presentation/home/components/HeroSection";
import { MainHeader } from "@/src/presentation/home/components/MainHeader";
import { QuoteBanner } from "@/src/presentation/home/components/QuoteBanner";
import { ServicesSection } from "@/src/presentation/home/components/ServicesSection";
import { SiteFooter } from "@/src/presentation/home/components/SiteFooter";
import { TopInfoBar } from "@/src/presentation/home/components/TopInfoBar";

export default function Home() {
  const content = getHomePageContent();

  return (
    <>
      <a className="skip-link" href="#main-content">Aller au contenu principal</a>
      <TopInfoBar contacts={content.contacts} />
      <MainHeader navigation={content.navigation} />
      <main id="main-content">
        <HeroSection benefits={content.trustBenefits} />
        <ServicesSection services={content.services} />
        <AboutSection benefits={content.aboutBenefits} />
        <QuoteBanner />
      </main>
      <SiteFooter columns={content.footerColumns} contacts={content.contacts} />
    </>
  );
}
