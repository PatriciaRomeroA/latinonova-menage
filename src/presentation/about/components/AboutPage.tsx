import Image from "next/image";
import { imageCatalog } from "@/src/infrastructure/assets/image-catalog";
import { QuoteTrigger } from "@/src/presentation/quote/components/QuoteTrigger";
import { AppIcon } from "@/src/shared/icons/AppIcon";

const principles = ["Confiance", "Travail", "Excellence"] as const;

export function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero" aria-labelledby="about-page-title">
        <div className="container about-hero__grid">
          <div className="about-hero__content">
            <p className="eyebrow">À propos de nous</p>
            <h1 id="about-page-title">
              Une entreprise fondée sur la confiance, le travail et
              l&apos;excellence.
            </h1>
          </div>
          <div className="about-hero__visual">
            <Image
              src={imageCatalog.about.src}
              alt={imageCatalog.about.alt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 44vw"
            />
          </div>
        </div>
      </section>

      <section className="about-story section" aria-labelledby="about-story-title">
        <div className="container about-story__grid">
          <div>
            <p className="eyebrow">Notre histoire</p>
            <h2 id="about-story-title">
              Christopher Salgado et Patricia Romero partagent une même passion
              du travail bien fait.
            </h2>
          </div>
          <p className="about-story__lead">
            Latinova Ménage inc. est née de la vision de deux jeunes
            entrepreneurs latino-canadiens, Christopher Salgado et Patricia
            Romero, qui partagent une même passion : offrir un service de
            nettoyage professionnel, fiable et d&apos;une qualité irréprochable.
          </p>
        </div>
      </section>

      <section className="about-principles" aria-label="Principes de Latinova Ménage">
        <div className="container about-principles__grid">
          {principles.map((principle, index) => (
            <div className="about-principles__item" key={principle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{principle}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="about-commitment section" aria-labelledby="about-commitment-title">
        <div className="container about-commitment__grid">
          <div className="about-commitment__main">
            <p className="eyebrow">Notre engagement</p>
            <h2 id="about-commitment-title">
              Un service personnalisé, ponctuel et conforme aux plus hauts
              standards de propreté.
            </h2>
            <p>
              Notre objectif est de bâtir des relations durables avec nos
              clients en offrant un service personnalisé, ponctuel et conforme
              aux plus hauts standards de propreté. Que ce soit pour des
              bureaux, des commerces, des établissements institutionnels ou des
              projets après rénovation, nous traitons chaque espace avec le même
              souci du détail.
            </p>
          </div>
          <aside className="about-commitment__statement">
            <p>la propreté est bien plus qu&apos;un service</p>
            <span>
              Chez Latinova Ménage inc., nous croyons que la propreté est bien
              plus qu&apos;un service : elle reflète le professionnalisme, le
              bien-être et la confiance. C&apos;est pourquoi nous nous engageons
              à fournir un travail constant, efficace et adapté aux besoins de
              chaque client.
            </span>
          </aside>
        </div>
      </section>

      <section className="about-mission" aria-labelledby="about-mission-title">
        <div className="container about-mission__inner">
          <p className="about-mission__eyebrow" id="about-mission-title">
            Notre mission
          </p>
          <p>
            Notre mission est simple : offrir un environnement impeccable où nos
            clients peuvent se concentrer sur ce qui compte le plus.
          </p>
        </div>
      </section>

      <section className="about-final-cta" aria-labelledby="about-final-cta-title">
        <div className="container about-final-cta__inner">
          <div>
            <p className="eyebrow">Prêt à commencer?</p>
            <h2 id="about-final-cta-title">
              Parlons de vos espaces et de vos besoins.
            </h2>
          </div>
          <QuoteTrigger className="button button--primary">
            Demander une soumission gratuite
            <span className="button__icon-slot" aria-hidden="true">
              <AppIcon className="button__icon" name="arrowRight" size={14} />
            </span>
          </QuoteTrigger>
        </div>
      </section>
    </div>
  );
}
