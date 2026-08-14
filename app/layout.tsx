import type { Metadata } from "next";
import { Lato, Montserrat } from "next/font/google";
import { headers } from "next/headers";
import { getDictionary } from "@/src/domain/i18n/dictionaries";
import { getCurrentLocale } from "@/src/domain/i18n/server-locale";
import { LanguageProvider } from "@/src/presentation/common/language/LanguageProvider";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: "600",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const dictionary = getDictionary(locale);
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;
  const title = dictionary.metadata.rootTitle;
  const description = dictionary.metadata.rootDescription;
  const openGraphLocale = locale === "fr" ? "fr_CA" : locale === "es" ? "es_CA" : "en_CA";

  return {
    title,
    description,
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: openGraphLocale,
      images: [{ url: `${baseUrl}/og.png`, width: 1536, height: 910, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og.png`],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getCurrentLocale();

  return (
    <html lang={locale}>
      <body className={`${montserrat.variable} ${lato.variable}`}>
        <LanguageProvider initialLocale={locale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
