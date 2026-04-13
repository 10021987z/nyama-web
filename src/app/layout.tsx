import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NYAMA - Vos plats préférés livrés chez vous",
  description:
    "La première marketplace de cuisine camerounaise. Commandez des plats traditionnels préparés par les meilleures cuisinières du Cameroun.",
  keywords: [
    "cuisine camerounaise",
    "livraison",
    "Douala",
    "Yaoundé",
    "plats traditionnels",
    "NYAMA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${dmSerif.variable} ${dmSans.variable} ${spaceMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
