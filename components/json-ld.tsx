import { contact, services, site, siteUrl } from "@/lib/site"

// Structured data for search engines (schema.org). Only facts that are also
// visible on the page — no invented ratings, opening hours or coordinates.
export function JsonLd() {
  const businessId = `${siteUrl}/#business`
  const websiteId = `${siteUrl}/#website`

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": businessId,
        name: contact.company,
        alternateName: "Hausmeisterservice Chemnitz",
        description: site.description,
        url: `${siteUrl}/`,
        logo: `${siteUrl}/brand/logo-mark.svg`,
        image: `${siteUrl}/opengraph-image.jpg`,
        telephone: contact.phoneIntl,
        email: contact.email,
        founder: { "@type": "Person", name: contact.owner },
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.street,
          postalCode: contact.postalCode,
          addressLocality: contact.locality,
          addressRegion: contact.region,
          addressCountry: "DE",
        },
        areaServed: { "@type": "City", name: contact.locality },
        knowsLanguage: "de",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: contact.phoneIntl,
          email: contact.email,
          areaServed: "DE",
          availableLanguage: "de",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Hausmeister- und Objektpflegeleistungen",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.text,
              areaServed: { "@type": "City", name: contact.locality },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${siteUrl}/`,
        name: contact.company,
        inLanguage: "de-DE",
        publisher: { "@id": businessId },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: site.title,
        description: site.description,
        inLanguage: "de-DE",
        isPartOf: { "@id": websiteId },
        about: { "@id": businessId },
        primaryImageOfPage: `${siteUrl}/opengraph-image.jpg`,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  )
}
