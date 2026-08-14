import type { AppIconName } from "@/src/shared/icons/icon-registry";
import type { Locale } from "./locales";
import { DEFAULT_LOCALE } from "./locales";

type ServiceCopy = {
  readonly title: string;
  readonly subtitle: string;
  readonly description: readonly string[];
  readonly listTitle: string;
  readonly items: readonly string[];
  readonly closingText: string;
  readonly ctaLabel: string;
  readonly imageAlt: string;
};

export type ServiceCopyKey =
  | "commercial"
  | "institutional"
  | "renovation"
  | "windows"
  | "residential";

export type SubjectOptionCopy = {
  readonly value: string;
  readonly label: string;
};

export type AppDictionary = {
  readonly localeName: string;
  readonly navigation: {
    readonly home: string;
    readonly services: string;
    readonly about: string;
    readonly quote: string;
    readonly contact: string;
    readonly allServices: string;
    readonly primary: string;
    readonly mobile: string;
    readonly openMenu: string;
    readonly closeMenu: string;
  };
  readonly common: {
    readonly quoteCta: string;
    readonly requestQuote: string;
    readonly discoverService: string;
    readonly legalInformation: string;
    readonly privacy: string;
    readonly terms: string;
    readonly configuredLater: string;
    readonly notProvided: string;
    readonly yes: string;
    readonly no: string;
  };
  readonly topbar: {
    readonly area: string;
    readonly schedule: string;
    readonly aria: string;
  };
  readonly hero: {
    readonly eyebrow: string;
    readonly title: readonly string[];
    readonly highlight: string;
    readonly lead: string;
    readonly servicesCta: string;
  };
  readonly benefits: {
    readonly trust: readonly { readonly label: string; readonly icon: AppIconName }[];
    readonly about: readonly { readonly label: string; readonly icon: AppIconName }[];
  };
  readonly homeServices: {
    readonly eyebrow: string;
    readonly titlePrefix: string;
    readonly titleHighlight: string;
    readonly viewAll: string;
  };
  readonly aboutSection: {
    readonly eyebrow: string;
    readonly title: string;
    readonly paragraphs: readonly string[];
    readonly cta: string;
  };
  readonly quoteBanner: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly cta: string;
    readonly note: string;
  };
  readonly footer: {
    readonly brandText: string;
    readonly navigationTitle: string;
    readonly servicesTitle: string;
    readonly contactTitle: string;
    readonly socialLabel: string;
    readonly location: string;
    readonly copyright: string;
    readonly accordionLabel: string;
  };
  readonly servicesDirectory: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
  };
  readonly serviceDetail: {
    readonly eyebrow: string;
  };
  readonly services: Record<ServiceCopyKey, ServiceCopy>;
  readonly aboutPage: {
    readonly heroEyebrow: string;
    readonly heroTitle: string;
    readonly storyEyebrow: string;
    readonly storyTitle: string;
    readonly storyLead: string;
    readonly principlesLabel: string;
    readonly principles: readonly string[];
    readonly commitmentEyebrow: string;
    readonly commitmentTitle: string;
    readonly commitmentBody: string;
    readonly statementTitle: string;
    readonly statementBody: string;
    readonly missionEyebrow: string;
    readonly missionBody: string;
    readonly finalEyebrow: string;
    readonly finalTitle: string;
    readonly finalCta: string;
  };
  readonly quotePage: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly bodyPrefix: string;
    readonly bodyStrong: string;
  };
  readonly quoteForm: {
    readonly fields: {
      readonly firstName: string;
      readonly lastName: string;
      readonly company: string;
      readonly email: string;
      readonly phone: string;
      readonly service: string;
      readonly workAtHeights: string;
      readonly subject: string;
      readonly context: string;
      readonly attachments: string;
    };
    readonly placeholders: {
      readonly service: string;
      readonly subject: string;
      readonly context: string;
    };
    readonly errors: {
      readonly firstName: string;
      readonly lastName: string;
      readonly emailRequired: string;
      readonly emailInvalid: string;
      readonly phoneRequired: string;
      readonly phoneInvalid: string;
      readonly subject: string;
      readonly context: string;
      readonly send: string;
    };
    readonly subjects: readonly SubjectOptionCopy[];
    readonly submit: string;
    readonly submitting: string;
    readonly successTitle: string;
    readonly successBody: string;
    readonly errorTitle: string;
    readonly errorBody: string;
  };
  readonly confirmation: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly labels: {
      readonly name: string;
      readonly email: string;
      readonly phone: string;
      readonly company: string;
      readonly service: string;
      readonly subject: string;
      readonly workAtHeights: string;
      readonly context: string;
    };
    readonly cancel: string;
    readonly confirm: string;
    readonly sending: string;
    readonly errorTitle: string;
  };
  readonly metadata: {
    readonly rootTitle: string;
    readonly rootDescription: string;
    readonly aboutTitle: string;
    readonly aboutDescription: string;
    readonly servicesTitle: string;
    readonly servicesDescription: string;
    readonly quoteTitle: string;
    readonly quoteDescription: string;
    readonly serviceNotFoundTitle: string;
  };
};

export const dictionaries: Record<Locale, AppDictionary> = {
  fr: {
    localeName: "Français",
    navigation: {
      home: "Accueil",
      services: "Services",
      about: "À propos",
      quote: "Soumission",
      contact: "Contact",
      allServices: "Tous les services",
      primary: "Navigation principale",
      mobile: "Navigation mobile",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
    },
    common: {
      quoteCta: "Soumission gratuite",
      requestQuote: "Demander une soumission",
      discoverService: "Découvrir le service",
      legalInformation: "Informations légales",
      privacy: "Politique de confidentialité",
      terms: "Conditions d’utilisation",
      configuredLater: "Lien à configurer",
      notProvided: "Non renseigné",
      yes: "Oui",
      no: "Non",
    },
    topbar: {
      area: "Montréal & Rive-Nord",
      schedule: "Lundi - Vendredi : 7h00 - 18h00",
      aria: "Informations pratiques",
    },
    hero: {
      eyebrow: "Fiabilité. Qualité. Excellence.",
      title: ["La propreté", "qui inspire"],
      highlight: "confiance",
      lead: "Latinova Ménage inc. offre des services de nettoyage professionnels pour les entreprises, institutions, après rénovation et propriétés résidentielles.",
      servicesCta: "Voir nos services",
    },
    benefits: {
      trust: [
        { label: "Service fiable et professionnel", icon: "shieldCheck" },
        { label: "Réponse rapide 24h", icon: "replyFast" },
        { label: "Satisfaction garantie", icon: "satisfaction" },
      ],
      about: [
        { label: "Équipe professionnelle", icon: "team" },
        { label: "Produits de qualité et écologiques", icon: "eco" },
        { label: "Respect de vos espaces", icon: "respect" },
        { label: "Flexibilité et adaptabilité", icon: "flexibility" },
      ],
    },
    homeServices: {
      eyebrow: "Nos services",
      titlePrefix: "Un nettoyage adapté à",
      titleHighlight: "chaque besoin",
      viewAll: "Voir tous nos services",
    },
    aboutSection: {
      eyebrow: "À propos de nous",
      title: "Deux jeunes entrepreneurs. Une même vision de l’excellence",
      paragraphs: [
        "Latinova Ménage inc. a été fondée par Christopher Salgado et Patricia Romero, deux jeunes entrepreneurs latino-canadiens animés par la passion du travail bien fait.",
        "Nous offrons des services de nettoyage commercial, institutionnel, après rénovation, résidentiel et de vitres, avec un engagement constant envers la qualité, la fiabilité et le professionnalisme.",
        "Notre objectif est simple : offrir des espaces impeccables et bâtir des relations de confiance durables avec chacun de nos clients.",
      ],
      cta: "En savoir plus sur notre histoire",
    },
    quoteBanner: {
      eyebrow: "Une réponse rapide et personnalisée",
      title: "Demandez votre soumission gratuite",
      body: "Parlez-nous de vos besoins et recevez une estimation claire, adaptée à votre espace et à votre horaire.",
      cta: "Demander maintenant",
      note: "Sans engagement · Réponse rapide",
    },
    footer: {
      brandText: "Services de nettoyage commercial, institutionnel, après rénovation et résidentiel à Montréal et sur la Rive-Nord.",
      navigationTitle: "Navigation",
      servicesTitle: "Services",
      contactTitle: "Contact",
      socialLabel: "Réseaux sociaux",
      location: "Montréal, Québec\nRive-Nord et environs",
      copyright: "Tous droits réservés.",
      accordionLabel: "Navigation du pied de page",
    },
    servicesDirectory: {
      eyebrow: "Nos services",
      title: "Des solutions de nettoyage adaptées à chaque espace",
      body: "Découvrez nos services professionnels et choisissez la solution qui correspond à votre environnement, votre horaire et vos besoins.",
    },
    serviceDetail: { eyebrow: "Nos services" },
    services: {
      commercial: {
        title: "Nettoyage commercial",
        subtitle: "Un environnement propre qui reflète le professionnalisme de votre entreprise.",
        description: [
          "Latinova Ménage inc. offre des services d'entretien adaptés aux bureaux, commerces et espaces professionnels. Nous établissons une solution selon vos installations, votre horaire et la fréquence de service recherchée.",
        ],
        listTitle: "Idéal pour :",
        items: ["Bureaux et espaces corporatifs", "Commerces", "Cliniques et cabinets professionnels", "Immeubles commerciaux"],
        closingText: "Service ponctuel ou entretien récurrent selon vos besoins.",
        ctaLabel: "Demander une soumission",
        imageAlt: "Espace de bureaux moderne, lumineux et propre",
      },
      institutional: {
        title: "Nettoyage institutionnel",
        subtitle: "Des espaces propres, accueillants et entretenus avec rigueur.",
        description: [
          "Nous proposons des solutions d'entretien adaptées aux établissements institutionnels et aux espaces à fréquentation régulière. Chaque mandat est évalué afin d'établir une méthode de travail et une fréquence adaptées à l'environnement.",
        ],
        listTitle: "Idéal pour :",
        items: ["Garderies", "Établissements communautaires", "Espaces administratifs", "Établissements et bâtiments institutionnels"],
        closingText: "Un plan d'entretien personnalisé est établi lors de la soumission.",
        ctaLabel: "Demander une soumission",
        imageAlt: "Corridor lumineux d’un établissement de santé",
      },
      renovation: {
        title: "Nettoyage après rénovation",
        subtitle: "Une finition impeccable avant la livraison ou l'occupation de vos espaces.",
        description: ["Après des travaux de rénovation ou de construction, notre équipe intervient pour remettre les lieux en état et préparer l'espace pour son utilisation."],
        listTitle: "Le service peut comprendre :",
        items: ["Élimination de la poussière", "Nettoyage des surfaces", "Nettoyage des planchers", "Nettoyage des vitres et surfaces vitrées", "Nettoyage général après travaux"],
        closingText: "Chaque projet est évalué selon l'état et la superficie des lieux.",
        ctaLabel: "Demander une soumission",
        imageAlt: "Espace intérieur en cours de rénovation",
      },
      windows: {
        title: "Nettoyage de vitres",
        subtitle: "Des vitres propres pour une image claire et professionnelle.",
        description: ["Nous offrons des services de nettoyage de vitres adaptés aux entreprises, commerces, immeubles et résidences."],
        listTitle: "Disponible pour :",
        items: ["Vitres intérieures", "Vitres extérieures accessibles", "Portes vitrées", "Vitrines commerciales", "Entretien ponctuel ou périodique"],
        closingText: "Le service est évalué selon l'accès, la hauteur et la superficie vitrée.",
        ctaLabel: "Demander une soumission",
        imageAlt: "Nettoyage de vitres professionnel",
      },
      residential: {
        title: "Nettoyage résidentiel",
        subtitle: "Un service professionnel pour prendre soin de votre espace de vie.",
        description: ["Latinova Ménage inc. propose également des services de nettoyage résidentiel pour maisons, condos et appartements, selon les besoins du client."],
        listTitle: "Disponible pour :",
        items: ["Entretien régulier", "Grand ménage", "Avant ou après déménagement", "Nettoyage ponctuel"],
        closingText: "Les services sont personnalisés selon la propriété et les besoins demandés.",
        ctaLabel: "Demander une soumission",
        imageAlt: "Salon résidentiel moderne et soigneusement entretenu",
      },
    },
    aboutPage: {
      heroEyebrow: "À propos de nous",
      heroTitle: "Une entreprise fondée sur la confiance, le travail et l'excellence.",
      storyEyebrow: "Notre histoire",
      storyTitle: "Christopher Salgado et Patricia Romero partagent une même passion du travail bien fait.",
      storyLead: "Latinova Ménage inc. est née de la vision de deux jeunes entrepreneurs latino-canadiens, Christopher Salgado et Patricia Romero, qui partagent une même passion : offrir un service de nettoyage professionnel, fiable et d'une qualité irréprochable.",
      principlesLabel: "Principes de Latinova Ménage",
      principles: ["Confiance", "Travail", "Excellence"],
      commitmentEyebrow: "Notre engagement",
      commitmentTitle: "Un service personnalisé, ponctuel et conforme aux plus hauts standards de propreté.",
      commitmentBody: "Notre objectif est de bâtir des relations durables avec nos clients en offrant un service personnalisé, ponctuel et conforme aux plus hauts standards de propreté. Que ce soit pour des bureaux, des commerces, des établissements institutionnels ou des projets après rénovation, nous traitons chaque espace avec le même souci du détail.",
      statementTitle: "la propreté est bien plus qu'un service",
      statementBody: "Chez Latinova Ménage inc., nous croyons que la propreté est bien plus qu'un service : elle reflète le professionnalisme, le bien-être et la confiance. C'est pourquoi nous nous engageons à fournir un travail constant, efficace et adapté aux besoins de chaque client.",
      missionEyebrow: "Notre mission",
      missionBody: "Notre mission est simple : offrir un environnement impeccable où nos clients peuvent se concentrer sur ce qui compte le plus.",
      finalEyebrow: "Prêt à commencer?",
      finalTitle: "Parlons de vos espaces et de vos besoins.",
      finalCta: "Demander une soumission gratuite",
    },
    quotePage: {
      eyebrow: "Soumission gratuite",
      title: "Une propreté professionnelle, adaptée à vos besoins",
      intro: "Vous cherchez un service d'entretien fiable pour votre entreprise, votre institution ou votre propriété?",
      bodyPrefix: "Remplissez le formulaire et notre équipe vous contactera afin de mieux comprendre vos besoins et de vous proposer une",
      bodyStrong: "soumission personnalisée, sans engagement",
    },
    quoteForm: {
      fields: {
        firstName: "First Name",
        lastName: "Last Name",
        company: "Company",
        email: "Email",
        phone: "Phone Number",
        service: "Service",
        workAtHeights: "Will any work at heights be required?",
        subject: "Subject",
        context: "Context",
        attachments: "Attach document(s)",
      },
      placeholders: {
        service: "Sélectionner un service",
        subject: "Choisir",
        context: "Adresse du bâtiment, dimensions approximatives, contexte ou raison de la demande",
      },
      errors: {
        firstName: "Le prénom est requis.",
        lastName: "Le nom est requis.",
        emailRequired: "Le courriel est requis.",
        emailInvalid: "Entrez un courriel valide.",
        phoneRequired: "Le téléphone est requis.",
        phoneInvalid: "Entrez un numéro de téléphone à 10 chiffres.",
        subject: "Le sujet est requis.",
        context: "Le contexte est requis.",
        send: "Une erreur est survenue lors de l’envoi. Veuillez réessayer.",
      },
      subjects: [
        { value: "soumission", label: "Demande de soumission" },
        { value: "information", label: "Demande d'information" },
        { value: "visite", label: "Planifier une visite" },
      ],
      submit: "Send my request",
      submitting: "Envoi en cours...",
      successTitle: "Demande envoyée",
      successBody: "Votre demande a été envoyée avec succès. Nous vous contacterons prochainement.",
      errorTitle: "Envoi impossible",
      errorBody: "Une erreur est survenue lors de l’envoi de votre demande. Veuillez réessayer.",
    },
    confirmation: {
      eyebrow: "Résumé de la demande",
      title: "Vérifiez votre demande",
      description: "Voici le preview des informations qui seront envoyées à notre équipe.",
      labels: {
        name: "Nom",
        email: "Courriel",
        phone: "Téléphone",
        company: "Entreprise",
        service: "Service",
        subject: "Sujet",
        workAtHeights: "Travail en hauteur",
        context: "Contexte",
      },
      cancel: "Cancelar",
      confirm: "Envoyer la demande",
      sending: "Envoi en cours...",
      errorTitle: "Envoi impossible",
    },
    metadata: {
      rootTitle: "Latinova Ménage Inc. | Services de nettoyage à Montréal",
      rootDescription: "Services de nettoyage commercial, institutionnel, après rénovation et résidentiel à Montréal et sur la Rive-Nord.",
      aboutTitle: "À propos de nous | Latinova Ménage inc.",
      aboutDescription: "Découvrez l'histoire, les principes et la mission de Latinova Ménage inc., une entreprise fondée sur la confiance, le travail et l'excellence.",
      servicesTitle: "Services de nettoyage | Latinova Ménage inc.",
      servicesDescription: "Découvrez les services de nettoyage commercial, institutionnel, après rénovation, de vitres et résidentiel de Latinova Ménage.",
      quoteTitle: "Soumission gratuite | Latinova Ménage inc.",
      quoteDescription: "Demandez une soumission personnalisée pour vos besoins de nettoyage commercial, institutionnel, résidentiel ou après rénovation.",
      serviceNotFoundTitle: "Service introuvable | Latinova Ménage inc.",
    },
  },
  es: {} as AppDictionary,
  en: {} as AppDictionary,
};

dictionaries.es = {
  ...dictionaries.fr,
  localeName: "Español",
  navigation: {
    home: "Inicio",
    services: "Servicios",
    about: "Nosotros",
    quote: "Cotización",
    contact: "Contacto",
    allServices: "Todos los servicios",
    primary: "Navegación principal",
    mobile: "Navegación móvil",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  common: {
    quoteCta: "Cotización gratuita",
    requestQuote: "Solicitar una cotización",
    discoverService: "Descubrir el servicio",
    legalInformation: "Información legal",
    privacy: "Política de privacidad",
    terms: "Términos de uso",
    configuredLater: "Enlace por configurar",
    notProvided: "No informado",
    yes: "Sí",
    no: "No",
  },
  topbar: {
    area: "Montreal y Rive-Nord",
    schedule: "Lunes - Viernes: 7:00 - 18:00",
    aria: "Información práctica",
  },
  hero: {
    eyebrow: "Confiabilidad. Calidad. Excelencia.",
    title: ["La limpieza", "que inspira"],
    highlight: "confianza",
    lead: "Latinova Ménage inc. ofrece servicios profesionales de limpieza para empresas, instituciones, propiedades residenciales y espacios después de renovación.",
    servicesCta: "Ver nuestros servicios",
  },
  benefits: {
    trust: [
      { label: "Servicio confiable y profesional", icon: "shieldCheck" },
      { label: "Respuesta rápida 24h", icon: "replyFast" },
      { label: "Satisfacción garantizada", icon: "satisfaction" },
    ],
    about: dictionaries.fr.benefits.about,
  },
  homeServices: {
    eyebrow: "Nuestros servicios",
    titlePrefix: "Una limpieza adaptada a",
    titleHighlight: "cada necesidad",
    viewAll: "Ver todos los servicios",
  },
  aboutSection: {
    eyebrow: "Sobre nosotros",
    title: "Dos jóvenes emprendedores. Una misma visión de excelencia",
    paragraphs: [
      "Latinova Ménage inc. fue fundada por Christopher Salgado y Patricia Romero, dos jóvenes emprendedores latino-canadienses motivados por la pasión por el trabajo bien hecho.",
      "Ofrecemos servicios de limpieza comercial, institucional, después de renovación, residencial y de vidrios, con un compromiso constante con la calidad, la confiabilidad y el profesionalismo.",
      "Nuestro objetivo es simple: ofrecer espacios impecables y construir relaciones de confianza duraderas con cada cliente.",
    ],
    cta: "Conocer más sobre nuestra historia",
  },
  quoteBanner: {
    eyebrow: "Una respuesta rápida y personalizada",
    title: "Solicita tu cotización gratuita",
    body: "Cuéntanos tus necesidades y recibe una estimación clara, adaptada a tu espacio y horario.",
    cta: "Solicitar ahora",
    note: "Sin compromiso · Respuesta rápida",
  },
  footer: {
    ...dictionaries.fr.footer,
    brandText: "Servicios de limpieza comercial, institucional, después de renovación y residencial en Montreal y Rive-Nord.",
    navigationTitle: "Navegación",
    servicesTitle: "Servicios",
    contactTitle: "Contacto",
    socialLabel: "Redes sociales",
    location: "Montreal, Quebec\nRive-Nord y alrededores",
    copyright: "Todos los derechos reservados.",
    accordionLabel: "Navegación del pie de página",
  },
  servicesDirectory: {
    eyebrow: "Nuestros servicios",
    title: "Soluciones de limpieza adaptadas a cada espacio",
    body: "Explora nuestros servicios profesionales y elige la solución que mejor se adapte a tu entorno, horario y necesidades.",
  },
  serviceDetail: { eyebrow: "Nuestros servicios" },
  services: {
    commercial: { ...dictionaries.fr.services.commercial, title: "Limpieza comercial", ctaLabel: "Solicitar una cotización" },
    institutional: { ...dictionaries.fr.services.institutional, title: "Limpieza institucional", ctaLabel: "Solicitar una cotización" },
    renovation: { ...dictionaries.fr.services.renovation, title: "Limpieza después de renovación", ctaLabel: "Solicitar una cotización" },
    windows: { ...dictionaries.fr.services.windows, title: "Limpieza de vidrios", ctaLabel: "Solicitar una cotización" },
    residential: { ...dictionaries.fr.services.residential, title: "Limpieza residencial", ctaLabel: "Solicitar una cotización" },
  },
  quotePage: {
    eyebrow: "Cotización gratuita",
    title: "Una limpieza profesional, adaptada a tus necesidades",
    intro: "¿Buscas un servicio de mantenimiento confiable para tu empresa, institución o propiedad?",
    bodyPrefix: "Completa el formulario y nuestro equipo te contactará para entender mejor tus necesidades y proponerte una",
    bodyStrong: "cotización personalizada, sin compromiso",
  },
  quoteForm: {
    ...dictionaries.fr.quoteForm,
    fields: {
      firstName: "Nombre",
      lastName: "Apellido",
      company: "Empresa",
      email: "Correo",
      phone: "Teléfono",
      service: "Servicio",
      workAtHeights: "¿Se requiere trabajo en altura?",
      subject: "Asunto",
      context: "Contexto",
      attachments: "Adjuntar documento(s)",
    },
    placeholders: {
      service: "Seleccionar un servicio",
      subject: "Elegir",
      context: "Dirección del edificio, dimensiones aproximadas, contexto o razón de la solicitud",
    },
    subjects: [
      { value: "soumission", label: "Solicitud de cotización" },
      { value: "information", label: "Solicitud de información" },
      { value: "visite", label: "Programar una visita" },
    ],
    submit: "Enviar mi solicitud",
  },
  confirmation: {
    ...dictionaries.fr.confirmation,
    eyebrow: "Resumen de la solicitud",
    title: "Verifica tu solicitud",
    description: "Este es el preview de la información que enviaremos a nuestro equipo.",
    labels: { ...dictionaries.fr.confirmation.labels, name: "Nombre", email: "Correo", phone: "Teléfono", company: "Empresa", subject: "Asunto", workAtHeights: "Trabajo en altura" },
    confirm: "Enviar la solicitud",
  },
  metadata: {
    ...dictionaries.fr.metadata,
    rootTitle: "Latinova Ménage Inc. | Servicios de limpieza en Montreal",
    rootDescription: "Servicios de limpieza comercial, institucional, después de renovación y residencial en Montreal y Rive-Nord.",
  },
};

dictionaries.en = {
  ...dictionaries.es,
  localeName: "English",
  navigation: {
    home: "Home",
    services: "Services",
    about: "About",
    quote: "Quote",
    contact: "Contact",
    allServices: "All services",
    primary: "Primary navigation",
    mobile: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  common: {
    quoteCta: "Free quote",
    requestQuote: "Request a quote",
    discoverService: "Discover the service",
    legalInformation: "Legal information",
    privacy: "Privacy policy",
    terms: "Terms of use",
    configuredLater: "Link to configure",
    notProvided: "Not provided",
    yes: "Yes",
    no: "No",
  },
  topbar: {
    area: "Montreal & North Shore",
    schedule: "Monday - Friday: 7:00 AM - 6:00 PM",
    aria: "Practical information",
  },
  hero: {
    eyebrow: "Reliability. Quality. Excellence.",
    title: ["Cleanliness", "that inspires"],
    highlight: "confidence",
    lead: "Latinova Ménage inc. offers professional cleaning services for businesses, institutions, post-renovation spaces and residential properties.",
    servicesCta: "View our services",
  },
  homeServices: {
    eyebrow: "Our services",
    titlePrefix: "Cleaning adapted to",
    titleHighlight: "every need",
    viewAll: "View all services",
  },
  quoteForm: {
    ...dictionaries.es.quoteForm,
    fields: {
      firstName: "First Name",
      lastName: "Last Name",
      company: "Company",
      email: "Email",
      phone: "Phone Number",
      service: "Service",
      workAtHeights: "Will any work at heights be required?",
      subject: "Subject",
      context: "Context",
      attachments: "Attach document(s)",
    },
    placeholders: {
      service: "Select a service",
      subject: "Choose",
      context: "Building address, approximate dimensions, context or reason for the request",
    },
    subjects: [
      { value: "soumission", label: "Quote request" },
      { value: "information", label: "Information request" },
      { value: "visite", label: "Schedule a visit" },
    ],
    submit: "Send my request",
  },
  confirmation: {
    ...dictionaries.es.confirmation,
    eyebrow: "Request summary",
    title: "Review your request",
    description: "Here is the preview of the information that will be sent to our team.",
    labels: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      service: "Service",
      subject: "Subject",
      workAtHeights: "Work at heights",
      context: "Context",
    },
    cancel: "Cancel",
    confirm: "Send request",
    sending: "Sending...",
    errorTitle: "Unable to send",
  },
};

export function getDictionary(locale: Locale = DEFAULT_LOCALE): AppDictionary {
  return dictionaries[locale];
}
