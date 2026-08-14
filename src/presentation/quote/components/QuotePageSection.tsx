import type { AppDictionary } from "@/src/domain/i18n/dictionaries";
import type { Service } from "@/src/domain/services/models";
import type { ServiceSlug } from "@/src/domain/services/services";
import { QuoteForm } from "./QuoteForm";

type QuotePageSectionProps = {
  readonly copy: AppDictionary["quotePage"];
  readonly formCopy: AppDictionary["quoteForm"];
  readonly confirmationCopy: AppDictionary["confirmation"];
  readonly initialService?: ServiceSlug;
  readonly labels: AppDictionary["common"];
  readonly services: readonly Service[];
};

export function QuotePageSection({
  confirmationCopy,
  copy,
  formCopy,
  initialService,
  labels,
  services,
}: QuotePageSectionProps) {
  return (
    <section className="quote-page" aria-labelledby="quote-page-title">
      <div className="container quote-page__layout">
        <div className="quote-page__copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 id="quote-page-title">{copy.title}</h1>
          <p>{copy.intro}</p>
          <p>
            {copy.bodyPrefix} <strong>{copy.bodyStrong}</strong>.
          </p>
        </div>

        <div className="quote-page__form-card">
          <QuoteForm
            confirmationCopy={confirmationCopy}
            copy={formCopy}
            initialService={initialService}
            labels={labels}
            services={services}
          />
        </div>
      </div>
    </section>
  );
}
