import Image from "next/image";
import type { Benefit } from "@/src/domain/home/models";
import { imageCatalog } from "@/src/infrastructure/assets/image-catalog";

type HeroSectionProps = {
  readonly benefits: readonly Benefit[];
};

export function HeroSection({ benefits }: HeroSectionProps) {
  return (
    <section className="hero" id="accueil" aria-labelledby="hero-title">
      <div className="hero__image">
        <Image
          src={imageCatalog.hero.src}
          alt={imageCatalog.hero.alt}
          fill
          priority
          sizes="(max-width: 800px) 100vw, 58vw"
        />
      </div>
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="eyebrow">Fiabilité. Qualité. Excellence.</p>
          <h1 id="hero-title">
            La propreté<br />qui inspire<br /><strong>confiance.</strong>
          </h1>
          <p className="hero__lead">
            Latinova Ménage inc. offre des services de nettoyage professionnels
            pour les entreprises, institutions, après rénovation et propriétés
            résidentielles.
          </p>
          <div className="hero__benefits">
            {benefits.map((benefit) => (
              <div className="trust-benefit" key={benefit.label}>
                <span aria-hidden="true">{benefit.icon}</span>
                <p>{benefit.label}</p>
              </div>
            ))}
          </div>
          <div className="hero__actions">
            <a className="button button--primary" href="#soumission">
              Obtenir une soumission gratuite <span aria-hidden="true">→</span>
            </a>
            <a className="button button--outline" href="#services">
              Voir nos services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
