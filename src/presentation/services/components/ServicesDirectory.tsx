import type { Service } from "@/src/domain/services/models";
import { ServiceCard } from "./ServiceCard";

type ServicesDirectoryProps = {
  readonly services: readonly Service[];
};

export function ServicesDirectory({ services }: ServicesDirectoryProps) {
  return (
    <section className="services-directory section" aria-labelledby="services-page-title">
      <div className="container">
        <header className="services-directory__header">
          <p className="eyebrow">Nos services</p>
          <h1 id="services-page-title">
            Des solutions de nettoyage adaptées à chaque espace
          </h1>
          <p>
            Découvrez nos services professionnels et choisissez la solution qui
            correspond à votre environnement, votre horaire et vos besoins.
          </p>
        </header>
        <div className="services-directory__grid">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
