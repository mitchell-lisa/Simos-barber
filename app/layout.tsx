import type { Metadata, Viewport } from "next";
import {
  Archivo,
  Bodoni_Moda,
  Berkshire_Swash,
  Patrick_Hand,
} from "next/font/google";
import { business } from "@/lib/business";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-bodoni",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
  display: "swap",
});

// The two faces of the painted door menu, picked against a photograph of
// the door. Berkshire Swash has the brush-painted caps with curled terminals
// and flourished feet he lettered the service names in; Patrick Hand is the neat
// printed caps of the lines under them. Used in the Menu section only.
const berkshire = Berkshire_Swash({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sign",
  display: "swap",
});

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: business.seo.title,
  description: business.seo.description,
  alternates: { canonical: "/" },
  // A preview must never compete with, or be mistaken for, the real business.
  robots: business.preview.active
    ? { index: false, follow: false }
    : { index: true, follow: true },
  openGraph: {
    title: business.seo.title,
    description: business.seo.description,
    url: business.url,
    siteName: business.fullName,
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
};

function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: business.fullName,
    url: business.url,
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
    sameAs: [business.social.instagram.url, business.booking.url],
    // The service menu is no longer printed on the page — the Vagaro widget
    // shows it, and text inside an iframe is invisible to a crawler. Keeping it
    // here means Google still gets the full menu, in his own wording, at zero
    // cost to the page. Prices only where he has actually set one.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: business.serviceGroups.map((group) => ({
        "@type": "OfferCatalog",
        name: group.name,
        itemListElement: group.items.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.blurb,
          },
          ...(s.price !== null
            ? { price: s.price, priceCurrency: "USD" }
            : {}),
        })),
      })),
    },
    // Tells Google where appointments are actually taken, which is what a
    // "Book" button in a local result hangs off.
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: business.booking.url,
        inLanguage: "en-US",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Book an appointment" },
    },
    // No priceRange until John gives us his menu — a guessed "$$" is a claim
    // about his pricing that we cannot support.
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
      className={`${bodoni.variable} ${archivo.variable} ${berkshire.variable} ${patrick.variable}`}
    >
      <body>
        {children}
        <LocalBusinessSchema />
      </body>
    </html>
  );
}
