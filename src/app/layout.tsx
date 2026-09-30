import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

const siteUrl = new URL("https://selimgaston.com");
const socialImageUrl = new URL(profile.heroImage, siteUrl).toString();

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-display"
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  },
  alternates: {
    canonical: "/"
  },
  title: `${profile.artistName} | DJ`,
  description: `${profile.artistName} - ${profile.tagline}`,
  keywords: [
    profile.artistName,
    "DJ",
    "Progressive House",
    "Afro House",
    "Melodic House",
    "Indie Dance",
    profile.location
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${profile.artistName} | DJ`,
    title: `${profile.artistName} | DJ`,
    description: profile.tagline,
    locale: "en_US",
    images: [socialImageUrl]
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.artistName} | DJ`,
    description: profile.tagline,
    images: [socialImageUrl]
  }
};

// Barre du navigateur mobile aux couleurs du site.
export const viewport: Viewport = {
  themeColor: "#030303"
};

// Données structurées (schema.org) pour aider Google à comprendre qui est
// l'artiste et à afficher ses liens (Spotify, Instagram, etc.) en rich result.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: profile.artistName,
  url: siteUrl.toString(),
  image: socialImageUrl,
  description: profile.tagline,
  genre: profile.services,
  email: profile.email,
  sameAs: [
    profile.spotifyUrl,
    profile.instagramUrl,
    profile.soundcloudUrl,
    profile.youtubeUrl,
    profile.beatportUrl,
    profile.facebookUrl
  ]
};

// Échappe "<" pour empêcher toute évasion de la balise <script> si une valeur
// de profil venait un jour à contenir "</script>" ou similaire.
const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
        {children}
      </body>
    </html>
  );
}
