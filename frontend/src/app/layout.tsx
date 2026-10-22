import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import "./icons.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Fontaine Verte SARL - Gestion & Traitement des Déchets | Agréé CIAPOL",
  description:
    "Fontaine Verte SARL : collecte maîtrisée, incinération thermique pyrolytique (900-1200°C), gestion DASRI et dépollution industrielle à Abidjan et en Côte d'Ivoire. Agréé par le CIAPOL.",
  keywords: [
    "Fontaine Verte",
    "gestion des déchets Abidjan",
    "incinérateur Côte d'Ivoire",
    "traitement DASRI",
    "CIAPOL",
    "dépollution industrielle",
    "assainissement Côte d'Ivoire",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${manrope.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#faf8ff] text-[#131b2e] selection:bg-[#00652c] selection:text-white font-sans">
        <Header />
        <main className="flex-1 pt-16 lg:pt-17.5">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
