import { imageCatalog } from "@/src/infrastructure/assets/image-catalog";
import { AppIcon } from "@/src/shared/icons/AppIcon";
import { SplitContentSection } from "@/src/presentation/shared/components/SplitContentSection";

type AboutSectionProps = {
  readonly copy: {
    readonly cta: string;
    readonly eyebrow: string;
    readonly paragraphs: readonly string[];
    readonly title: string;
  };
};

export function AboutSection({ copy }: AboutSectionProps) {
  return (
    <SplitContentSection
      ariaLabelledBy="about-title"
      className="about"
      id="a-propos"
      image={{
        src: imageCatalog.about.src,
        alt: imageCatalog.about.alt,
        sizes: "(max-width: 800px) 100vw, 43vw",
      }}
    >
      <p className="eyebrow">{copy.eyebrow}</p>
      <h2 id="about-title">{copy.title}</h2>
      <div className="about__copy">
        {copy.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <a className="button button--primary about__cta" href="#contact">
        {copy.cta}
        <span className="button__icon-slot" aria-hidden="true">
          <AppIcon className="button__icon" name="arrowRight" size={14} />
        </span>
      </a>
    </SplitContentSection>
  );
}
