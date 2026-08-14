import type { Metadata } from "next";
import { AboutPage } from "@/src/presentation/about/components/AboutPage";
import { SiteChrome } from "@/src/presentation/shared/components/SiteChrome";

export const metadata: Metadata = {
  title: "À propos de nous | Latinova Ménage inc.",
  description:
    "Découvrez l'histoire, les principes et la mission de Latinova Ménage inc., une entreprise fondée sur la confiance, le travail et l'excellence.",
};

export default function AboutRoute() {
  return (
    <SiteChrome activeNavigationHref="/a-propos">
      <AboutPage />
    </SiteChrome>
  );
}
