import type { Service } from "@/src/domain/services/models";
import { ServiceCard } from "./ServiceCard";

type ServicesDirectoryProps = {
  readonly copy: {
    readonly body: string;
    readonly discoverService: string;
    readonly eyebrow: string;
    readonly title: string;
  };
  readonly services: readonly Service[];
};

export function ServicesDirectory({ copy, services }: ServicesDirectoryProps) {
  return (
    <section className="services-directory section" aria-labelledby="services-page-title">
      <div className="container">
        <header className="services-directory__header">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 id="services-page-title">{copy.title}</h1>
          <p>{copy.body}</p>
        </header>
        <div className="services-directory__grid">
          {services.map((service) => (
            <ServiceCard
              discoverLabel={copy.discoverService}
              key={service.slug}
              service={service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
