import Image from "next/image";

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
      <Image
        className="brand__image"
        src="/images/latinova-logo.png"
        alt=""
        fill
        priority={!compact}
        unoptimized
        sizes={compact ? "210px" : "260px"}
      />
    </a>
  );
}
