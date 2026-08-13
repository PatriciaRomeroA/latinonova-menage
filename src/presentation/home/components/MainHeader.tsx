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
          {navigation.map((item) => (
            <a
              className={item.href === activeNavigationHref ? "is-active" : undefined}
              href={item.href}
              key={item.label}
              aria-current={item.href === activeNavigationHref ? "page" : undefined}
            >
              {item.label}
              {item.hasChildren ? <AppIcon name="chevronDown" size={12} /> : null}
            </a>
          ))}
        </nav>
        <a className="button button--primary header-cta" href="#soumission">
          Soumission gratuite
        </a>
        <MobileNavigation navigation={navigation} />
      </div>
    </header>
  );
}
