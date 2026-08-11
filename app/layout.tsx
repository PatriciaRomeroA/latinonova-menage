import type { Metadata } from "next";
import { Lato, Montserrat } from "next/font/google";
import { headers } from "next/headers";
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
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;
  const title = "Latinova Ménage Inc. | Services de nettoyage à Montréal";
  const description =
    "Services de nettoyage commercial, institutionnel, après rénovation et résidentiel à Montréal et sur la Rive-Nord.";

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
      locale: "fr_CA",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${montserrat.variable} ${lato.variable}`}>
        {children}
      </body>
    </html>
  );
}
