import { SERVICES, type ServiceSlug } from "@/src/domain/services/services";
import { QuoteForm } from "./QuoteForm";

type QuotePageSectionProps = {
  readonly initialService?: ServiceSlug;
};

export function QuotePageSection({ initialService }: QuotePageSectionProps) {
  return (
    <section className="quote-page" aria-labelledby="quote-page-title">
      <div className="container quote-page__layout">
        <div className="quote-page__copy">
          <p className="eyebrow">Soumission gratuite</p>
          <h1 id="quote-page-title">
            Une propreté professionnelle, adaptée à vos besoins
          </h1>
          <p>
            Vous cherchez un service d&apos;entretien fiable pour votre entreprise,
            votre institution ou votre propriété?
          </p>
          <p>
            Remplissez le formulaire et notre équipe vous contactera afin de
            mieux comprendre vos besoins et de vous proposer une{" "}
            <strong>soumission personnalisée, sans engagement</strong>.
          </p>
        </div>

        <div className="quote-page__form-card">
          <QuoteForm initialService={initialService} services={SERVICES} />
        </div>
      </div>
    </section>
  );
}
