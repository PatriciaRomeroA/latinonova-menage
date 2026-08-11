import Image from "next/image";
import { imageCatalog } from "@/src/infrastructure/assets/image-catalog";
import { AppIcon } from "@/src/shared/icons/AppIcon";

export function AboutSection() {
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
        <h2 id="about-title">
          Deux jeunes entrepreneurs. Une même vision de l’excellence
        </h2>
        <div className="about__copy">
          <p>
            Latinova Ménage inc. a été fondée par Christopher Salgado et
            Patricia Romero, deux jeunes entrepreneurs latino-canadiens animés
            par la passion du travail bien fait.
          </p>
          <p>
            Nous offrons des services de nettoyage commercial, institutionnel,
            après rénovation, résidentiel et de vitres, avec un engagement
            constant envers la qualité, la fiabilité et le professionnalisme.
          </p>
          <p>
            Notre objectif est simple : offrir des espaces impeccables et bâtir
            des relations de confiance durables avec chacun de nos clients.
          </p>
        </div>
        <a className="button button--primary about__cta" href="#contact">
          En savoir plus sur notre histoire
          <span className="button__icon-slot" aria-hidden="true">
            <AppIcon className="button__icon" name="arrowRight" size={14} />
          </span>
        </a>
      </div>
    </section>
  );
}
