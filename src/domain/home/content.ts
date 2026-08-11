import type { HomePageContent } from "./models";

export const homePageContent: HomePageContent = {
  navigation: [
    { label: "Accueil", href: "#accueil" },
    { label: "Services", href: "#services", hasChildren: true },
    { label: "Secteurs", href: "#services" },
    { label: "À propos", href: "#a-propos" },
    { label: "Soumission", href: "#soumission" },
    { label: "Contact", href: "#contact" },
  ],
  contacts: [
    { label: "Montréal & Rive-Nord", icon: "location" },
    { label: "Lundi - Vendredi : 7h00 - 18h00", icon: "clock" },
    { label: "514 123-4567", href: "tel:+15141234567", icon: "phone" },
    {
      label: "info@latinovamenage.com",
      href: "mailto:info@latinovamenage.com",
      icon: "email",
    },
  ],
  trustBenefits: [
    { label: "Service fiable et professionnel", icon: "shieldCheck" },
    { label: "Réponse rapide 24h", icon: "replyFast" },
    { label: "Satisfaction garantie", icon: "satisfaction" },
  ],
  services: [
    {
      title: "Nettoyage commercial",
      description:
        "Entretien régulier pour bureaux, commerces et espaces professionnels.",
      benefits: [
        "Bureaux et espaces de travail",
        "Commerces et magasins",
        "Immeubles à bureaux",
        "Entretien régulier et ponctuel",
      ],
      imageKey: "commercial",
      icon: "commercial",
    },
    {
      title: "Nettoyage institutionnel",
      description:
        "Services spécialisés pour les institutions et établissements à exigences élevées.",
      benefits: [
        "Écoles et garderies",
        "Centres de santé",
        "Immeubles gouvernementaux",
        "Organismes et OSBL",
      ],
      imageKey: "institutional",
      icon: "institutional",
    },
    {
      title: "Nettoyage après rénovation",
      description:
        "Nettoyage complet après travaux de construction ou de rénovation.",
      benefits: [
        "Enlèvement de poussière fine",
        "Nettoyage en profondeur",
        "Prêt pour l’occupation",
      ],
      imageKey: "renovation",
      icon: "renovation",
    },
    {
      title: "Nettoyage résidentiel",
      description: "Entretien ménager sur mesure pour un intérieur toujours propre.",
      benefits: [
        "Nettoyages réguliers",
        "Nettoyage en profondeur",
        "Grand ménage",
      ],
      imageKey: "residential",
      icon: "residential",
    },
  ],
  aboutBenefits: [
    { label: "Équipe professionnelle", icon: "team" },
    { label: "Produits de qualité et écologiques", icon: "eco" },
    { label: "Respect de vos espaces", icon: "respect" },
    { label: "Flexibilité et adaptabilité", icon: "flexibility" },
  ],
  footerColumns: [
    {
      title: "Navigation",
      links: [
        { label: "Accueil", href: "#accueil" },
        { label: "Services", href: "#services" },
        { label: "Secteurs", href: "#services" },
        { label: "À propos", href: "#a-propos" },
        { label: "Soumission", href: "#soumission" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Nettoyage commercial", href: "#services" },
        { label: "Nettoyage institutionnel", href: "#services" },
        { label: "Nettoyage après rénovation", href: "#services" },
        { label: "Nettoyage résidentiel", href: "#services" },
        { label: "Lavage de vitres", href: "#services" },
        { label: "Grand ménage", href: "#services" },
      ],
    },
  ],
};
