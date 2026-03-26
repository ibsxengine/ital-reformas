import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ital Reformas Cavallo | Reformas Integrales en Madrid",
  description: "Especialistas en reformas integrales y mantenimiento de comunidades de vecinos en Madrid. Más de 12 años de experiencia, 150+ proyectos completados. Presupuesto gratuito.",
  keywords: "reformas integrales madrid, mantenimiento comunidades vecinos, fachadas madrid, rehabilitación edificios, reformas leganés",
  authors: [{ name: "Ital Reformas Cavallo" }],
  creator: "Ital Reformas Cavallo",
  publisher: "Ital Reformas Cavallo",
  formatDetection: { telephone: true, email: true, address: true },
  metadataBase: new URL("https://www.italreformas.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ital Reformas Cavallo | Reformas Integrales en Madrid",
    description: "Especialistas en reformas integrales y mantenimiento de comunidades de vecinos en Madrid. Presupuesto gratuito.",
    url: "https://www.italreformas.com",
    siteName: "Ital Reformas Cavallo",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Ital Reformas Cavallo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ital Reformas Cavallo | Reformas Integrales en Madrid",
    description: "Especialistas en reformas integrales y mantenimiento de comunidades de vecinos en Madrid.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { google: "pending" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ital Reformas Cavallo, S.L.",
  description: "Especialistas en reformas integrales y mantenimiento de comunidades de vecinos en Madrid",
  url: "https://www.italreformas.com",
  telephone: "+34653046233",
  email: "gestion@italreformas.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle de la Encina 2",
    addressLocality: "Leganés",
    addressRegion: "Madrid",
    addressCountry: "ES",
  },
  geo: { "@type": "GeoCoordinates", latitude: 40.3281, longitude: -3.7638 },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  }],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "47" },
  sameAs: [
    "https://www.instagram.com/italreformas/",
    "http://linkedin.com/company/italreformas",
    "http://www.facebook.com/italreformascavallosl",
  ],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1C3D2E" />
        <meta name="geo.region" content="ES-MD" />
        <meta name="geo.placename" content="Leganés, Madrid" />
        <meta name="geo.position" content="40.3281;-3.7638" />
        <meta name="ICBM" content="40.3281, -3.7638" />
      </head>
      <body>{children}</body>
    </html>
  );
}