import { AppIcon } from "@/src/shared/icons/AppIcon";
import { QuoteTrigger } from "@/src/presentation/quote/components/QuoteTrigger";

export function QuoteBanner() {
  return (
    <section className="quote-banner" id="soumission" aria-labelledby="quote-title">
      <div className="container quote-banner__inner">
        <div className="quote-banner__content">
          <p className="quote-banner__eyebrow">Une réponse rapide et personnalisée</p>
          <h2 id="quote-title">Demandez votre soumission gratuite</h2>
          <p>
            Parlez-nous de vos besoins et recevez une estimation claire,
            adaptée à votre espace et à votre horaire.
          </p>
          <QuoteTrigger
            className="button button--light"
          >
            Demander maintenant
            <span className="button__icon-slot" aria-hidden="true">
              <AppIcon className="button__icon" name="arrowRight" size={14} />
            </span>
          </QuoteTrigger>
          <small>Sans engagement · Réponse rapide</small>
        </div>
      </div>
    </section>
  );
}
