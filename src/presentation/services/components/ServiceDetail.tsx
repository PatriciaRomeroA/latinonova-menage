import Link from "next/link";
import type { Service } from "@/src/domain/services/models";
import { SplitContentSection } from "@/src/presentation/shared/components/SplitContentSection";
import { AppIcon } from "@/src/shared/icons/AppIcon";

type ServiceDetailProps = {
  readonly service: Service;
};

export function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <SplitContentSection
      ariaLabelledBy="service-detail-title"
      className="service-detail"
      image={{
        src: service.image,
        alt: service.imageAlt,
        priority: true,
        sizes: "(max-width: 800px) 100vw, 48vw",
      }}
    >
      <div data-service-slug={service.slug}>
        <p className="eyebrow">Nos services</p>
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
        <Link className="button button--primary service-detail__cta" href="/#soumission">
          {service.ctaLabel}
          <span className="button__icon-slot" aria-hidden="true">
            <AppIcon className="button__icon" name="arrowRight" size={14} />
          </span>
        </Link>
      </div>
    </SplitContentSection>
  );
}
