"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { NavigationItem } from "@/src/domain/home/models";
import { LanguageToggle } from "@/src/presentation/common/language/LanguageToggle";
import { QuoteTrigger } from "@/src/presentation/quote/components/QuoteTrigger";
import { AppIcon } from "@/src/shared/icons/AppIcon";

type MobileNavigationProps = {
  readonly labels: {
    readonly allServices: string;
    readonly closeMenu?: string;
    readonly mobileNavigation?: string;
    readonly openMenu?: string;
    readonly quoteCta: string;
  };
  readonly navigation: readonly NavigationItem[];
};

export function MobileNavigation({ labels, navigation }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>("a, button"),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
    setOpenGroup(null);
  }

  const menuOverlay =
    isOpen
      ? createPortal(
          <div className="mobile-nav__backdrop" onClick={closeMenu}>
            <div
              ref={menuRef}
              className="mobile-nav__panel"
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label={labels.mobileNavigation ?? "Navigation mobile"}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="menu-button menu-button--close"
                type="button"
                aria-label={labels.closeMenu ?? "Fermer le menu"}
                onClick={closeMenu}
              >
                <AppIcon
                  ariaLabel={labels.closeMenu ?? "Fermer le menu"}
                  decorative={false}
                  inline={false}
                  name="close"
                  size={20}
                />
              </button>
              <p>{labels.mobileNavigation ?? "Navigation"}</p>
              <nav aria-label={labels.mobileNavigation ?? "Navigation mobile principale"}>
                {navigation.map((item) => {
                  if (!item.children?.length) {
                    return (
                      <a href={item.href} key={item.label} onClick={closeMenu}>
                        {item.label}
                        <span className="mobile-nav__arrow-slot" aria-hidden="true">
                          <AppIcon className="mobile-nav__arrow-icon" name="arrowRight" size={12} />
                        </span>
                      </a>
                    );
                  }

                  const isExpanded = openGroup === item.label;

                  return (
                    <div className="mobile-nav__group" key={item.label}>
                      <button
                        type="button"
                        className={`mobile-nav__parent${isExpanded ? " is-open" : ""}`}
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setOpenGroup((current) => (current === item.label ? null : item.label))
                        }
                      >
                        {item.label}
                        <span className="mobile-nav__arrow-slot" aria-hidden="true">
                          <AppIcon className="mobile-nav__chevron" name="chevronDown" size={14} />
                        </span>
                      </button>
                      {isExpanded ? (
                        <div className="mobile-nav__submenu">
                          <Link href="/services" onClick={closeMenu}>
                            {labels.allServices}
                          </Link>
                          {item.children.map((child) => (
                            <a href={child.href} key={child.href} onClick={closeMenu}>
                              {child.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </nav>
              <QuoteTrigger className="button button--primary" onClick={closeMenu}>
                {labels.quoteCta}
              </QuoteTrigger>
              <LanguageToggle className="language-toggle--mobile" />
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="mobile-nav">
      <button
        ref={buttonRef}
        className={`menu-button${isOpen ? " is-open" : ""}`}
        type="button"
        aria-label={
          isOpen
            ? labels.closeMenu ?? "Fermer le menu"
            : labels.openMenu ?? "Ouvrir le menu"
        }
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <AppIcon
          ariaLabel={
            isOpen
              ? labels.closeMenu ?? "Fermer le menu"
              : labels.openMenu ?? "Ouvrir le menu"
          }
          decorative={false}
          inline={false}
          name={isOpen ? "close" : "menu"}
          size={20}
        />
      </button>
      {menuOverlay}
    </div>
  );
}
