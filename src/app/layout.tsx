import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

const siteUrl = new URL("https://selimgaston-site-vitrine.pages.dev");
const socialImageUrl = new URL(profile.heroImage, siteUrl).toString();

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-display"
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: `${profile.artistName} | DJ`,
  description: `${profile.artistName} - ${profile.tagline}`,
  openGraph: {
    title: `${profile.artistName} | DJ`,
    description: profile.tagline,
    images: [socialImageUrl]
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.artistName} | DJ`,
    description: profile.tagline,
    images: [socialImageUrl]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
