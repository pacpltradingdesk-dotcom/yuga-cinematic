import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { company, siteUrl, registeredAddress, socials, businessHours } from "@/lib/site";
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
    "Pyrolysis plant consultant India", "Pyrolysis plant PMC", "Plastic to Fuel plant",
    "Tyre to Oil plant", "Waste to energy plant", "Bitumen plant consultant", "PMB", "CRMB",
    "Bio-Bitumen", "CSIR-CRRI KrishiBind", "Capital markets", "IPO advisory",
    "PPS Anantams", "YUGA",
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

/**
 * Verified, public social/profile URLs only — feeds schema `sameAs` so Google can
 * connect the brand to its real profiles. Excludes "#" placeholders and the wa.me
 * contact deep-link (a contact channel, not a profile).
 */
const sameAs: string[] = socials
  .map((s) => s.href)
  .filter((href) => href !== "#" && !href.startsWith("https://wa.me"));

/** Organization + WebSite structured data — helps Google understand the brand. */
const orgLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // ProfessionalService is a LocalBusiness subtype — adds local-SEO signals
      // (address, area served) on top of the base Organization identity.
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteUrl}/#org`,
      name: company.legal,
      alternateName: company.brand,
      url: siteUrl,
      logo: `${siteUrl}/yuga-logo.jpg`,
      image: `${siteUrl}/yuga-logo.jpg`,
      description: company.oneLiner,
      email: company.emails[0],
      telephone: company.phones[0],
      areaServed: "IN",
      priceRange: "₹₹₹",
      // City + region only — per project decision, no exact street address is
      // published anywhere on the site (incl. machine-readable schema).
      address: {
        "@type": "PostalAddress",
        addressLocality: registeredAddress.locality,
        addressRegion: registeredAddress.region,
        addressCountry: registeredAddress.country,
      },
      ...(sameAs.length > 0 && { sameAs }),
      contactPoint: {
        "@type": "ContactPoint",
        telephone: company.phones[0],
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
      openingHoursSpecification: businessHours
        .filter((h) => h.opens && h.closes)
        .map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.dayOfWeek,
          opens: h.opens,
          closes: h.closes,
        })),
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
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
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
