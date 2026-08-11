import type { NavigationItem } from "@/src/domain/home/models";
import { AppIcon } from "@/src/shared/icons/AppIcon";
import { Brand } from "./Brand";
import { MobileNavigation } from "./MobileNavigation";

type MainHeaderProps = {
  readonly navigation: readonly NavigationItem[];
};

export function MainHeader({ navigation }: MainHeaderProps) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navigation.map((item, index) => (
            <a
              className={index === 0 ? "is-active" : undefined}
              href={item.href}
              key={item.label}
              aria-current={index === 0 ? "page" : undefined}
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
