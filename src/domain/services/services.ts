import type { Service } from "./models";

export const SERVICE_PLACEHOLDER = "/images/services/service-placeholder.svg";

export const SERVICES = [
  {
    slug: "nettoyage-commercial",
    title: "Nettoyage commercial",
    subtitle:
      "Un environnement propre qui reflète le professionnalisme de votre entreprise.",
    description: [
      "Latinova Ménage inc. offre des services d'entretien adaptés aux bureaux, commerces et espaces professionnels. Nous établissons une solution selon vos installations, votre horaire et la fréquence de service recherchée.",
    ],
    listTitle: "Idéal pour :",
    items: [
      "Bureaux et espaces corporatifs",
      "Commerces",
      "Cliniques et cabinets professionnels",
      "Immeubles commerciaux",
    ],
    closingText: "Service ponctuel ou entretien récurrent selon vos besoins.",
    ctaLabel: "Demander une soumission",
    image: "/images/services/commercial_cleaning.png",
    imageAlt: "Espace de bureaux moderne, lumineux et propre",
    imageKey: "commercial",
  },
  {
    slug: "nettoyage-institutionnel",
    title: "Nettoyage institutionnel",
    subtitle: "Des espaces propres, accueillants et entretenus avec rigueur.",
    description: [
      "Nous proposons des solutions d'entretien adaptées aux établissements institutionnels et aux espaces à fréquentation régulière. Chaque mandat est évalué afin d'établir une méthode de travail et une fréquence adaptées à l'environnement.",
    ],
    listTitle: "Idéal pour :",
    items: [
      "Garderies",
      "Établissements communautaires",
      "Espaces administratifs",
      "Établissements et bâtiments institutionnels",
    ],
    closingText:
      "Un plan d'entretien personnalisé est établi lors de la soumission.",
    ctaLabel: "Demander une soumission",
    image: "/images/services/institutional_cleaning.png",
    imageAlt: "Corridor lumineux d’un établissement de santé",
    imageKey: "institutional",
  },
  {
    slug: "nettoyage-apres-renovation",
    title: "Nettoyage après rénovation",
    subtitle:
      "Une finition impeccable avant la livraison ou l'occupation de vos espaces.",
    description: [
      "Après des travaux de rénovation ou de construction, notre équipe intervient pour remettre les lieux en état et préparer l'espace pour son utilisation.",
    ],
    listTitle: "Le service peut comprendre :",
    items: [
      "Élimination de la poussière",
      "Nettoyage des surfaces",
      "Nettoyage des planchers",
      "Nettoyage des vitres et surfaces vitrées",
      "Nettoyage général après travaux",
    ],
    closingText:
      "Chaque projet est évalué selon l'état et la superficie des lieux.",
    ctaLabel: "Demander une soumission",
    image: "/images/services/renovation_cleaning.png",
    imageAlt: "Espace intérieur en cours de rénovation",
    imageKey: "renovation",
  },
  {
    slug: "nettoyage-de-vitres",
    title: "Nettoyage de vitres",
    subtitle: "Des vitres propres pour une image claire et professionnelle.",
    description: [
      "Nous offrons des services de nettoyage de vitres adaptés aux entreprises, commerces, immeubles et résidences.",
    ],
    listTitle: "Disponible pour :",
    items: [
      "Vitres intérieures",
      "Vitres extérieures accessibles",
      "Portes vitrées",
      "Vitrines commerciales",
      "Entretien ponctuel ou périodique",
    ],
    closingText:
      "Le service est évalué selon l'accès, la hauteur et la superficie vitrée.",
    ctaLabel: "Demander une soumission",
    image: "/images/services/glass_cleaning.png",
    imageAlt: "Nettoyage de vitres professionnel",
    imageKey: "windows",
  },
  {
    slug: "nettoyage-residentiel",
    title: "Nettoyage résidentiel",
    subtitle:
      "Un service professionnel pour prendre soin de votre espace de vie.",
    description: [
      "Latinova Ménage inc. propose également des services de nettoyage résidentiel pour maisons, condos et appartements, selon les besoins du client.",
    ],
    listTitle: "Disponible pour :",
    items: [
      "Entretien régulier",
      "Grand ménage",
      "Avant ou après déménagement",
      "Nettoyage ponctuel",
    ],
    closingText:
      "Les services sont personnalisés selon la propriété et les besoins demandés.",
    ctaLabel: "Demander une soumission",
    image: "/images/services/residential_cleaning.png",
    imageAlt: "Salon résidentiel moderne et soigneusement entretenu",
    imageKey: "residential",
  },
] as const satisfies readonly Service[];

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
