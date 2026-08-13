import type { NavigationItem } from "@/src/domain/home/models";
import { AppIcon } from "@/src/shared/icons/AppIcon";
import { Brand } from "./Brand";
import { MobileNavigation } from "./MobileNavigation";

type MainHeaderProps = {
  readonly navigation: readonly NavigationItem[];
  readonly activeNavigationHref?: string;
};

export function MainHeader({
  navigation,
  activeNavigationHref = "/#accueil",
}: MainHeaderProps) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navigation principale">
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
                  <a href="/services" role="menuitem">
                    Tous les services
                  </a>
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
        <a className="button button--primary header-cta" href="#soumission">
          Soumission gratuite
        </a>
        <MobileNavigation navigation={navigation} />
      </div>
    </header>
  );
}
