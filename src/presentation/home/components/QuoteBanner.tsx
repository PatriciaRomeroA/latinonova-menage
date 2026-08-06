export function QuoteBanner() {
  return (
    <section className="quote-banner" id="soumission" aria-labelledby="quote-title">
      <div className="container quote-banner__inner">
        <div className="quote-banner__icon" aria-hidden="true">▣</div>
        <div>
          <h2 id="quote-title">Demandez votre soumission gratuite</h2>
          <p>Remplissez le formulaire et recevez une réponse rapide.</p>
        </div>
        <a
          className="button button--light"
          href="mailto:info@latinovamenage.com?subject=Demande%20de%20soumission"
        >
          Demander maintenant <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
