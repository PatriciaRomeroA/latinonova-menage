"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { NavigationItem } from "@/src/domain/home/models";
import { AppIcon } from "@/src/shared/icons/AppIcon";

type MobileNavigationProps = {
  readonly navigation: readonly NavigationItem[];
};

export function MobileNavigation({ navigation }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
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
              aria-label="Navigation mobile"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="menu-button menu-button--close"
                type="button"
                aria-label="Fermer le menu"
                onClick={closeMenu}
              >
                <AppIcon
                  ariaLabel="Fermer le menu"
                  decorative={false}
                  inline={false}
                  name="close"
                  size={20}
                />
              </button>
              <p>Navigation</p>
              <nav aria-label="Navigation mobile principale">
                {navigation.map((item) => (
                  <a href={item.href} key={item.label} onClick={closeMenu}>
                    {item.label}
                    <span className="mobile-nav__arrow-slot" aria-hidden="true">
                      <AppIcon className="mobile-nav__arrow-icon" name="arrowRight" size={12} />
                    </span>
                  </a>
                ))}
              </nav>
              <a className="button button--primary" href="#soumission" onClick={closeMenu}>
                Soumission gratuite
              </a>
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
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <AppIcon
          ariaLabel={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
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
