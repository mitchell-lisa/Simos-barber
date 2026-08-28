import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Source_Serif_4 } from "next/font/google";
import { business } from "@/lib/business";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-serif",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: business.seo.title,
  description: business.seo.description,
  // A preview must never compete with, or be mistaken for, the real business.
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
  themeColor: "#f7f5f0",
};

function LocalBusinessSchema() {
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
    openingHoursSpecification: business.hours
      .map((h, i) =>
        h
          ? {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Sunday", "Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday",
              ][i],
              opens: h.open,
              closes: h.close,
            }
          : null,
      )
      .filter(Boolean),
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
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        <LocalBusinessSchema />
      </body>
    </html>
  );
}
