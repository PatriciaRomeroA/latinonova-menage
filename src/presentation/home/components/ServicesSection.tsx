import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/src/domain/services/models";
import { imageCatalog } from "@/src/infrastructure/assets/image-catalog";

type ServicesSectionProps = {
  readonly services: readonly Service[];
};

function ServiceCard({ service }: { readonly service: Service }) {
  const image = imageCatalog[service.imageKey];

  return (
    <Link
      className="service-card"
      href={`/services/${service.slug}`}
      aria-label={`Découvrir ${service.title}`}
    >
      <div className="service-card__image">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 25vw"
        />
      </div>
      <div className="service-card__body">
        <h3>{service.title}</h3>
      </div>
    </Link>
  );
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="services section" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading section-heading--centered">
          <p className="eyebrow">Nos services</p>
          <h2 id="services-title">Un nettoyage adapté à <strong>chaque besoin</strong></h2>
        </div>
        <div className="services__grid">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <Link className="button button--outline services__cta" href="/services">
          Voir tous nos services
        </Link>
      </div>
    </section>
  );
}
