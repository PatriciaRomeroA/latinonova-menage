export const contactInfo = {
  phoneDisplay: "(438) 354-5653",
  phoneE164: "+14383545653",
  phoneWhatsApp: "14383545653",
  whatsappMessage:
    "Bonjour! Je souhaite obtenir une soumission pour vos services de nettoyage. Pourriez-vous m’aider avec ma demande?",
  email: "info@latinovamenage.com",
} as const;

export function getPhoneTelHref() {
  return `tel:${contactInfo.phoneE164}`;
}

export function getPhoneWhatsAppHref() {
  const encodedMessage = encodeURIComponent(contactInfo.whatsappMessage);

  return `https://wa.me/${contactInfo.phoneWhatsApp}?text=${encodedMessage}`;
}

export function getEmailHref() {
  return `mailto:${contactInfo.email}`;
}
