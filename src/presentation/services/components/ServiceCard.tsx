import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/src/domain/services/models";
import { AppIcon } from "@/src/shared/icons/AppIcon";

type ServiceCardProps = {
  readonly service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="services-page-card">
      <Link href={`/services/${service.slug}`}>
        <div className="services-page-card__image">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(max-width: 680px) 100vw, (max-width: 940px) 50vw, 33vw"
          />
        </div>
        <div className="services-page-card__body">
          <h2>{service.title}</h2>
          <p>{service.subtitle}</p>
          <span className="services-page-card__link">
            Découvrir le service
            <span className="button__icon-slot" aria-hidden="true">
              <AppIcon className="button__icon" name="arrowRight" size={14} />
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
