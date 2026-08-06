type BrandProps = {
  readonly compact?: boolean;
  readonly inverted?: boolean;
};

export function Brand({ compact = false, inverted = false }: BrandProps) {
  return (
    <a
      className={`brand${compact ? " brand--compact" : ""}${inverted ? " brand--inverted" : ""}`}
      href="#accueil"
      aria-label="Latinova Ménage Inc., retour à l’accueil"
    >
      <span className="brand__spark" aria-hidden="true">✦</span>
      <span className="brand__roof" aria-hidden="true">⌂</span>
      <span className="brand__name">Latinova</span>
      <span className="brand__tag">Ménage Inc.</span>
    </a>
  );
}
