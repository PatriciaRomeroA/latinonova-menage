"use client";

import { type Locale } from "@/src/domain/i18n/locales";
import { getDictionary } from "@/src/domain/i18n/dictionaries";
import { useLanguage } from "./LanguageProvider";

const toggleLocales = {
  fr: "en",
  en: "fr",
} as const satisfies Record<"fr" | "en", Locale>;

export function LanguageToggle({
  className,
}: {
  readonly className?: string;
}) {
  const { locale, setLocale } = useLanguage();
  const visibleLocale = locale === "en" ? "en" : "fr";
  const nextLocale = toggleLocales[visibleLocale];
  const currentLanguage = getDictionary(visibleLocale).localeName;
  const nextLanguage = getDictionary(nextLocale).localeName;
  const flag = visibleLocale === "fr" ? "🇫🇷" : "🇬🇧";

  return (
    <div className={`language-toggle language-toggle--${visibleLocale}${className ? ` ${className}` : ""}`}>
      <button
        aria-label={`Changer la langue. Langue actuelle: ${currentLanguage}. Passer à ${nextLanguage}.`}
        className="language-toggle__button"
        type="button"
        onClick={() => setLocale(nextLocale)}
      >
        <span className="language-toggle__code">{visibleLocale.toUpperCase()}</span>
        <span
          aria-hidden="true"
          className={`language-toggle__flag language-toggle__flag--${visibleLocale}`}
        >
          {flag}
        </span>
      </button>
    </div>
  );
}
