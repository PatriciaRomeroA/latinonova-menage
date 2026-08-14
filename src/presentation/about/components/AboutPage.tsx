import Image from "next/image";
import type { AppDictionary } from "@/src/domain/i18n/dictionaries";
import { imageCatalog } from "@/src/infrastructure/assets/image-catalog";
import { QuoteTrigger } from "@/src/presentation/quote/components/QuoteTrigger";
import { AppIcon } from "@/src/shared/icons/AppIcon";

type AboutPageProps = {
  readonly copy: AppDictionary["aboutPage"];
};

export function AboutPage({ copy }: AboutPageProps) {
  return (
    <div className="about-page">
      <section className="about-hero" aria-labelledby="about-page-title">
        <div className="container about-hero__grid">
          <div className="about-hero__content">
            <p className="eyebrow">{copy.heroEyebrow}</p>
            <h1 id="about-page-title">{copy.heroTitle}</h1>
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
            <p className="eyebrow">{copy.storyEyebrow}</p>
            <h2 id="about-story-title">{copy.storyTitle}</h2>
          </div>
          <p className="about-story__lead">{copy.storyLead}</p>
        </div>
      </section>

      <section className="about-principles" aria-label={copy.principlesLabel}>
        <div className="container about-principles__grid">
          {copy.principles.map((principle, index) => (
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
            <p className="eyebrow">{copy.commitmentEyebrow}</p>
            <h2 id="about-commitment-title">{copy.commitmentTitle}</h2>
            <p>{copy.commitmentBody}</p>
          </div>
          <aside className="about-commitment__statement">
            <p>{copy.statementTitle}</p>
            <span>{copy.statementBody}</span>
          </aside>
        </div>
      </section>

      <section className="about-mission" aria-labelledby="about-mission-title">
        <div className="container about-mission__inner">
          <p className="about-mission__eyebrow" id="about-mission-title">
            {copy.missionEyebrow}
          </p>
          <p>{copy.missionBody}</p>
        </div>
      </section>

      <section className="about-final-cta" aria-labelledby="about-final-cta-title">
        <div className="container about-final-cta__inner">
          <div>
            <p className="eyebrow">{copy.finalEyebrow}</p>
            <h2 id="about-final-cta-title">{copy.finalTitle}</h2>
          </div>
          <QuoteTrigger className="button button--primary">
            {copy.finalCta}
            <span className="button__icon-slot" aria-hidden="true">
              <AppIcon className="button__icon" name="arrowRight" size={14} />
            </span>
          </QuoteTrigger>
        </div>
      </section>
    </div>
  );
}
