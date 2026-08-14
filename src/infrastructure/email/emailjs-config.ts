export const emailJsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
} as const;

export type ResolvedEmailJsConfig = {
  readonly serviceId: string;
  readonly templateId: string;
  readonly publicKey: string;
};

export function resolveEmailJsConfig(): ResolvedEmailJsConfig {
  const { publicKey, serviceId, templateId } = emailJsConfig;
  const missingVariables = [
    ["NEXT_PUBLIC_EMAILJS_SERVICE_ID", serviceId],
    ["NEXT_PUBLIC_EMAILJS_TEMPLATE_ID", templateId],
    ["NEXT_PUBLIC_EMAILJS_PUBLIC_KEY", publicKey],
  ].filter(([, value]) => !value);

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing EmailJS public environment variables: ${missingVariables
        .map(([name]) => name)
        .join(", ")}`,
    );
  }

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("Missing EmailJS public environment variables.");
  }

  return {
    serviceId,
    templateId,
    publicKey,
  };
}
