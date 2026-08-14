import Link from "next/link";
import type { NavigationItem } from "@/src/domain/home/models";
import { LanguageToggle } from "@/src/presentation/common/language/LanguageToggle";
import { AppIcon } from "@/src/shared/icons/AppIcon";
import { Brand } from "./Brand";
import { MobileNavigation } from "./MobileNavigation";
import { QuoteTrigger } from "@/src/presentation/quote/components/QuoteTrigger";

type MainHeaderProps = {
  readonly navigation: readonly NavigationItem[];
  readonly activeNavigationHref?: string;
  readonly labels: {
    readonly allServices: string;
    readonly closeMenu: string;
    readonly mobileNavigation: string;
    readonly openMenu: string;
    readonly primaryNavigation: string;
    readonly quoteCta: string;
  };
};

export function MainHeader({
  labels,
  navigation,
  activeNavigationHref = "/#accueil",
}: MainHeaderProps) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Brand />
        <nav className="desktop-nav" aria-label={labels.primaryNavigation}>
          {navigation.map((item) => {
            const isActive =
              item.href === activeNavigationHref ||
              item.children?.some((child) => child.href === activeNavigationHref);

            if (!item.children?.length) {
              return (
                <a
                  className={`desktop-nav__link${isActive ? " is-active" : ""}`}
                  href={item.href}
                  key={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <div
                className={`desktop-nav__item${isActive ? " is-active" : ""}`}
                key={item.label}
              >
                <button
                  className={`desktop-nav__link${isActive ? " is-active" : ""}`}
                  type="button"
                  aria-haspopup="menu"
                  aria-controls="desktop-services-menu"
                >
                  {item.label}
                  <AppIcon className="desktop-nav__chevron" name="chevronDown" size={12} />
                </button>
                <div
                  className="desktop-nav__menu"
                  id="desktop-services-menu"
                  role="menu"
                >
                  <Link href="/services" role="menuitem">
                    {labels.allServices}
                  </Link>
                  {item.children.map((child) => (
                    <a href={child.href} key={child.href} role="menuitem">
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
        <div className="site-header__actions">
          <QuoteTrigger className="button button--primary header-cta">
            {labels.quoteCta}
          </QuoteTrigger>
          <LanguageToggle className="language-toggle--desktop" />
        </div>
        <MobileNavigation
          labels={{
            allServices: labels.allServices,
            closeMenu: labels.closeMenu,
            mobileNavigation: labels.mobileNavigation,
            openMenu: labels.openMenu,
            quoteCta: labels.quoteCta,
          }}
          navigation={navigation}
        />
      </div>
    </header>
  );
}
