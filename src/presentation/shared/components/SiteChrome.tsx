import type { ReactNode } from "react";
import { getHomePageContent } from "@/src/application/home/get-home-page-content";
import { getDictionary } from "@/src/domain/i18n/dictionaries";
import { getCurrentLocale } from "@/src/domain/i18n/server-locale";
import { MainHeader } from "@/src/presentation/home/components/MainHeader";
import { SiteFooter } from "@/src/presentation/home/components/SiteFooter";
import { TopInfoBar } from "@/src/presentation/home/components/TopInfoBar";

type SiteChromeProps = {
  readonly children: ReactNode;
  readonly activeNavigationHref?: string;
  readonly footerOverlapsBanner?: boolean;
};

export async function SiteChrome({
  children,
  activeNavigationHref,
  footerOverlapsBanner = false,
}: SiteChromeProps) {
  const locale = await getCurrentLocale();
  const dictionary = getDictionary(locale);
  const content = getHomePageContent(locale);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {locale === "fr" ? "Aller au contenu principal" : locale === "es" ? "Ir al contenido principal" : "Skip to main content"}
      </a>
      <TopInfoBar ariaLabel={dictionary.topbar.aria} contacts={content.contacts} />
      <MainHeader
        activeNavigationHref={activeNavigationHref}
        labels={{
          allServices: dictionary.navigation.allServices,
          closeMenu: dictionary.navigation.closeMenu,
          mobileNavigation: dictionary.navigation.mobile,
          openMenu: dictionary.navigation.openMenu,
          primaryNavigation: dictionary.navigation.primary,
          quoteCta: dictionary.common.quoteCta,
        }}
        navigation={content.navigation}
      />
      <main id="main-content">{children}</main>
      <SiteFooter
        columns={content.footerColumns}
        contacts={content.contacts}
        labels={{
          accordion: dictionary.footer.accordionLabel,
          configuredLater: dictionary.common.configuredLater,
          contactTitle: dictionary.footer.contactTitle,
          copyright: dictionary.footer.copyright,
          legal: dictionary.common.legalInformation,
          location: dictionary.footer.location,
          privacy: dictionary.common.privacy,
          social: dictionary.footer.socialLabel,
          terms: dictionary.common.terms,
        }}
        brandText={dictionary.footer.brandText}
        overlapsBanner={footerOverlapsBanner}
      />
    </>
  );
}
