import Image from "next/image";
import type { Benefit } from "@/src/domain/home/models";
import { imageCatalog } from "@/src/infrastructure/assets/image-catalog";
import { QuoteTrigger } from "@/src/presentation/quote/components/QuoteTrigger";
import { AppIcon } from "@/src/shared/icons/AppIcon";

type HeroSectionProps = {
  readonly benefits: readonly Benefit[];
  readonly copy: {
    readonly eyebrow: string;
    readonly title: readonly string[];
    readonly highlight: string;
    readonly lead: string;
    readonly quoteCta: string;
    readonly servicesCta: string;
  };
};

export function HeroSection({ benefits, copy }: HeroSectionProps) {
  return (
    <section className="hero" id="accueil" aria-labelledby="hero-title">
      <div className="hero__image">
        <Image
          src={imageCatalog.hero.src}
          alt={imageCatalog.hero.alt}
          fill
          priority
          unoptimized
          sizes="(max-width: 800px) 100vw, 58vw"
        />
      </div>
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 id="hero-title">
            {copy.title.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
            <strong>{copy.highlight}</strong>
          </h1>
          <p className="hero__lead">{copy.lead}</p>
          <div className="hero__benefits">
            {benefits.map((benefit) => (
              <div className="trust-benefit" key={benefit.label}>
                <span className="trust-benefit__icon-slot">
                  <AppIcon name={benefit.icon} size={16} />
                </span>
                <p>{benefit.label}</p>
              </div>
            ))}
          </div>
          <div className="hero__actions">
            <QuoteTrigger className="button button--primary">
              {copy.quoteCta}
              <span className="button__icon-slot" aria-hidden="true">
                <AppIcon className="button__icon" name="arrowRight" size={14} />
              </span>
            </QuoteTrigger>
            <a className="button button--outline" href="#services">
              {copy.servicesCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
