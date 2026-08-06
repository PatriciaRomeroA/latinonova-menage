"use client";

import { useEffect, useRef, useState } from "react";
import type { NavigationItem } from "@/src/domain/home/models";

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
        <span />
        <span />
        <span />
      </button>
      {isOpen ? (
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
            <p>Navigation</p>
            <nav aria-label="Navigation mobile principale">
              {navigation.map((item) => (
                <a href={item.href} key={item.label} onClick={closeMenu}>
                  {item.label}
                  <span aria-hidden="true">→</span>
                </a>
              ))}
            </nav>
            <a className="button button--primary" href="#soumission" onClick={closeMenu}>
              Soumission gratuite
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
