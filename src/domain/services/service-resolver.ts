import { SERVICES } from "./services";
import type { Service } from "./models";

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getServiceSlugs(): readonly string[] {
  return SERVICES.map((service) => service.slug);
}
