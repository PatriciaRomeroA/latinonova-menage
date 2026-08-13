import type { ReactNode } from "react";
import { getHomePageContent } from "@/src/application/home/get-home-page-content";
import { MainHeader } from "@/src/presentation/home/components/MainHeader";
import { SiteFooter } from "@/src/presentation/home/components/SiteFooter";
import { TopInfoBar } from "@/src/presentation/home/components/TopInfoBar";

type SiteChromeProps = {
  readonly children: ReactNode;
  readonly activeNavigationHref?: string;
  readonly footerOverlapsBanner?: boolean;
};

export function SiteChrome({
  children,
  activeNavigationHref,
  footerOverlapsBanner = false,
}: SiteChromeProps) {
  const content = getHomePageContent();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Aller au contenu principal
      </a>
      <TopInfoBar contacts={content.contacts} />
      <MainHeader
        activeNavigationHref={activeNavigationHref}
        navigation={content.navigation}
      />
      <main id="main-content">{children}</main>
      <SiteFooter
        columns={content.footerColumns}
        contacts={content.contacts}
        overlapsBanner={footerOverlapsBanner}
      />
    </>
  );
}
