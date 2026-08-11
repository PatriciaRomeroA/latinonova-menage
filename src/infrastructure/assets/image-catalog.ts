export const imageCatalog = {
  hero: {
    src: "/images/latinova-equipe-nettoyage.png",
    alt: "Équipe Latinova Ménage réalisant l’entretien professionnel de bureaux",
  },
  commercial: {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
    alt: "Espace de bureaux moderne, lumineux et propre",
  },
  institutional: {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=85",
    alt: "Corridor lumineux d’un établissement de santé",
  },
  renovation: {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85",
    alt: "Espace intérieur en cours de rénovation",
  },
  residential: {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
    alt: "Salon résidentiel moderne et soigneusement entretenu",
  },
  about: {
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    alt: "Équipe professionnelle réunie dans un bureau lumineux",
  },
} as const;

export type ImageKey = keyof typeof imageCatalog;
