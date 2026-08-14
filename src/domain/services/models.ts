export type ServiceImageKey =
  | "commercial"
  | "institutional"
  | "renovation"
  | "windows"
  | "residential";

export interface Service {
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: readonly string[];
  readonly listTitle: string;
  readonly items: readonly string[];
  readonly closingText: string;
  readonly ctaLabel: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly imageKey: ServiceImageKey;
}
