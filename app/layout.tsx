import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Instrument_Serif, Inter } from "next/font/google";
import { business } from "@/lib/business";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-big-shoulders",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: business.seo.title,
  description: business.seo.description,
  // A preview must never compete with, or be mistaken for, the real business in search.
  robots: business.preview.active
    ? { index: false, follow: false }
    : { index: true, follow: true },
  openGraph: {
    title: business.seo.title,
    description: business.seo.description,
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

function LocalBusinessSchema() {
  // Only facts we actually hold. No hours, no rating — the shop has not opened.
  const schema = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: business.fullName,
    slogan: business.motto,
    telephone: business.phone.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US",
    },
    sameAs: [business.social.instagram.url],
    priceRange: "$$",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${instrument.variable} ${inter.variable}`}
    >
      <body>
        {children}
        <LocalBusinessSchema />
      </body>
    </html>
  );
}
