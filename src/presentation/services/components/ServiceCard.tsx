import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/src/domain/services/models";
import { imageCatalog } from "@/src/infrastructure/assets/image-catalog";
import { AppIcon } from "@/src/shared/icons/AppIcon";

type ServiceCardProps = {
  readonly discoverLabel: string;
  readonly service: Service;
};

export function ServiceCard({ discoverLabel, service }: ServiceCardProps) {
  const image = imageCatalog[service.imageKey];

  return (
    <article className="services-page-card">
      <Link href={`/services/${service.slug}`}>
        <div className="services-page-card__image">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 680px) 100vw, (max-width: 940px) 50vw, 33vw"
          />
        </div>
        <div className="services-page-card__body">
          <h2>{service.title}</h2>
          <p>{service.subtitle}</p>
          <span className="services-page-card__link">
            {discoverLabel}
            <span className="button__icon-slot" aria-hidden="true">
              <AppIcon className="button__icon" name="arrowRight" size={14} />
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
