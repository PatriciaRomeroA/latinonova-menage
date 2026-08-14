import type { Service } from "@/src/domain/services/models";
import type { ServiceSlug } from "@/src/domain/services/services";
import { imageCatalog } from "@/src/infrastructure/assets/image-catalog";
import { QuoteTrigger } from "@/src/presentation/quote/components/QuoteTrigger";
import { SplitContentSection } from "@/src/presentation/shared/components/SplitContentSection";
import { AppIcon } from "@/src/shared/icons/AppIcon";

type ServiceDetailProps = {
  readonly eyebrow: string;
  readonly service: Service;
};

export function ServiceDetail({ eyebrow, service }: ServiceDetailProps) {
  const image = imageCatalog[service.imageKey];

  return (
    <SplitContentSection
      ariaLabelledBy="service-detail-title"
      className="service-detail"
      image={{
        src: image.src,
        alt: image.alt,
        priority: true,
        sizes: "(max-width: 800px) 100vw, 48vw",
      }}
    >
      <div data-service-slug={service.slug}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="service-detail-title">{service.title}</h1>
        <p className="service-detail__subtitle">{service.subtitle}</p>
        <div className="service-detail__copy">
          {service.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="service-detail__list-block">
          <h2>{service.listTitle}</h2>
          <ul>
            {service.items.map((item) => (
              <li key={item}>
                <span className="service-detail__check" aria-hidden="true">
                  <AppIcon name="check" size={14} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="service-detail__closing">{service.closingText}</p>
        <QuoteTrigger
          className="button button--primary service-detail__cta"
          initialService={service.slug as ServiceSlug}
        >
          {service.ctaLabel}
          <span className="button__icon-slot" aria-hidden="true">
            <AppIcon className="button__icon" name="arrowRight" size={14} />
          </span>
        </QuoteTrigger>
      </div>
    </SplitContentSection>
  );
}
