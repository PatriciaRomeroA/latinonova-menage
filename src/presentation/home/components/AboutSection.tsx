import Image from "next/image";
import type { Benefit } from "@/src/domain/home/models";
import { imageCatalog } from "@/src/infrastructure/assets/image-catalog";

type AboutSectionProps = {
  readonly benefits: readonly Benefit[];
};

export function AboutSection({ benefits }: AboutSectionProps) {
  return (
    <section className="about" id="a-propos" aria-labelledby="about-title">
      <div className="about__image">
        <Image
          src={imageCatalog.about.src}
          alt={imageCatalog.about.alt}
          fill
          sizes="(max-width: 800px) 100vw, 43vw"
        />
        <div className="about__image-overlay" />
      </div>
      <div className="about__content">
        <p className="eyebrow">À propos de nous</p>
        <h2 id="about-title">Votre partenaire en propreté.</h2>
        <p className="about__lead">
          Latinova Ménage inc. est une entreprise québécoise engagée à offrir
          des services de nettoyage fiables, humains et professionnels, tout en
          bâtissant des relations de confiance durables.
        </p>
        <div className="about__benefits">
          {benefits.map((benefit) => (
            <div key={benefit.label}>
              <span aria-hidden="true">{benefit.icon}</span>
              <p>{benefit.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
