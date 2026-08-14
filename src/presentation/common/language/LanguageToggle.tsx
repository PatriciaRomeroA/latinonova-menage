"use client";

import { useEffect, useRef, useState } from "react";
import { SUPPORTED_LOCALES, type Locale } from "@/src/domain/i18n/locales";
import { getDictionary } from "@/src/domain/i18n/dictionaries";
import { useLanguage } from "./LanguageProvider";

export function LanguageToggle({
  className,
}: {
  readonly className?: string;
}) {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = "language-toggle-menu";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function handleLocaleSelection(nextLocale: Locale) {
    setIsOpen(false);

    if (nextLocale !== locale) {
      setLocale(nextLocale);
    }
  }

  return (
    <div className={`language-toggle${className ? ` ${className}` : ""}`} ref={containerRef}>
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Changer la langue"
        className="language-toggle__button"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
      >
        {locale.toUpperCase()}
      </button>

      {isOpen ? (
        <div className="language-toggle__menu" id={menuId} role="menu">
          {SUPPORTED_LOCALES.map((option) => (
            <button
              aria-current={option === locale ? "true" : undefined}
              className={option === locale ? "is-active" : undefined}
              key={option}
              role="menuitem"
              title={getDictionary(option).localeName}
              type="button"
              onClick={() => handleLocaleSelection(option)}
            >
              {option.toUpperCase()}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
