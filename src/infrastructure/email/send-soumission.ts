import emailjs from "@emailjs/browser";
import type { SoumissionFormValues } from "@/src/domain/quote/soumission";
import { resolveEmailJsConfig } from "./emailjs-config";

export async function sendSoumission(data: SoumissionFormValues) {
  const { publicKey, serviceId, templateId } = resolveEmailJsConfig();

  await emailjs.send(
    serviceId,
    templateId,
    {
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      email: data.email,
      phone: data.phone,
      service: data.service,
      subject: data.subject,
      workAtHeights: data.workAtHeights,
      context: data.context,
    },
    {
      publicKey,
    },
  );
}
