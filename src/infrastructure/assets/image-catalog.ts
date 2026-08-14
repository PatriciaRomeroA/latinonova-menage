export const imageCatalog = {
  hero: {
    src: "/images/latinova-equipe-nettoyage.png",
    alt: "Équipe Latinova Ménage réalisant l’entretien professionnel de bureaux",
  },
  commercial: {
    src: "/images/services/commercial_cleaning.png",
    alt: "Espace de bureaux moderne, lumineux et propre",
  },
  institutional: {
    src: "/images/services/institutional_cleaning.png",
    alt: "Corridor lumineux d’un établissement de santé",
  },
  renovation: {
    src: "/images/services/renovation_cleaning.png",
    alt: "Espace intérieur en cours de rénovation",
  },
  residential: {
    src: "/images/services/residential_cleaning.png",
    alt: "Salon résidentiel moderne et soigneusement entretenu",
  },
  windows: {
    src: "/images/services/glass_cleaning.png",
    alt: "Nettoyage de vitres professionnel",
  },
  about: {
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    alt: "Équipe professionnelle réunie dans un bureau lumineux",
  },
} as const;

export type ImageKey = keyof typeof imageCatalog;
