import type { AppIconName } from "@/src/shared/icons/icon-registry";

export type NavigationItem = {
  readonly label: string;
  readonly href: string;
  readonly children?: readonly NavigationItem[];
};

export type ContactItem = {
  readonly label: string;
  readonly href?: string;
  readonly icon: AppIconName;
};

export type Benefit = {
  readonly label: string;
  readonly icon: AppIconName;
};

export type FooterColumn = {
  readonly title: string;
  readonly links: readonly NavigationItem[];
};

export type HomePageContent = {
  readonly navigation: readonly NavigationItem[];
  readonly contacts: readonly ContactItem[];
  readonly trustBenefits: readonly Benefit[];
  readonly aboutBenefits: readonly Benefit[];
  readonly footerColumns: readonly FooterColumn[];
};
