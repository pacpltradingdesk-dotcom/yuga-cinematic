import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { company, siteUrl } from "@/lib/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/chrome/Preloader";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { Navbar } from "@/components/chrome/Navbar";
import { Footer } from "@/components/chrome/Footer";
import { ConsentBanner } from "@/components/chrome/ConsentBanner";
import { AiAssistant } from "@/components/chrome/AiAssistant";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.brand} - ${company.tagline}`,
    template: `%s · ${company.brand}`,
  },
  description: company.oneLiner,
  keywords: [
    "Bio-Bitumen", "Bitumen PMC", "CSIR-CRRI KrishiBind", "PMB", "CRMB",
    "Plastic to Fuel", "Pyrolysis", "Bitumen plant consultant India",
    "Capital markets", "IPO advisory", "PPS Anantams", "YUGA",
  ],
  authors: [{ name: company.founder }],
  openGraph: {
    title: `${company.brand} - ${company.tagline}`,
    description: company.oneLiner,
    type: "website",
    siteName: company.brand,
    images: [`${siteUrl}/yuga-logo.jpg`],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

/** Organization + WebSite structured data — helps Google understand the brand. */
const orgLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#org`,
      name: company.legal,
      alternateName: company.brand,
      url: siteUrl,
      logo: `${siteUrl}/yuga-logo.jpg`,
      description: company.oneLiner,
      email: company.emails[0],
      telephone: company.phones[0],
      areaServed: "IN",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: company.phones[0],
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: company.brand,
      description: `${company.brand} — ${company.tagline}`,
      publisher: { "@id": `${siteUrl}/#org` },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd).replace(/</g, "\\u003c") }}
        />
        <Preloader />
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <ConsentBanner />
        <AiAssistant />
      </body>
    </html>
  );
}
