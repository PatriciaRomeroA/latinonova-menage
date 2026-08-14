export type WorkAtHeights = "" | "yes" | "no";

export type SoumissionFormValues = {
  readonly firstName: string;
  readonly lastName: string;
  readonly company: string;
  readonly email: string;
  readonly phone: string;
  readonly service: string;
  readonly workAtHeights: WorkAtHeights;
  readonly subject: string;
  readonly context: string;
};
