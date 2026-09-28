// Single source of truth for contact details and content that appears in more than one place.

// Public address of the live site, used for canonical URLs, Open Graph, the
// sitemap and JSON-LD. Set NEXT_PUBLIC_SITE_URL at build time once the real
// domain is known.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lebedynets-hausmeister.de"
).replace(/\/$/, "")

export const site = {
  name: "Lebedynets Hausmeisterdienst",
  title: "Hausmeisterservice Chemnitz | Lebedynets Hausmeisterdienst",
  description:
    "Zuverlässige Objektpflege und Hausmeisterservice in Chemnitz: Treppenhausreinigung, Garten- und Grünpflege, Winterdienst, Entrümpelung. Kostenlose Objektbesichtigung.",
  themeColor: "#1f4d3a",
} as const

export const contact = {
  phoneDisplay: "0152 03587320",
  phoneHref: "tel:+4915203587320",
  phoneIntl: "+49 152 03587320",
  whatsapp: "4915203587320",
  email: "lebedinets.antonio@gmail.com",
  owner: "Anton Lebedynets",
  company: "Lebedynets Hausmeisterdienst",
  street: "Zeißstr. 22",
  postalCode: "09131",
  locality: "Chemnitz",
  region: "Sachsen",
  city: "09131 Chemnitz",
} as const

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${contact.whatsapp}` +
  (text ? `?text=${encodeURIComponent(text)}` : "")

export const navLinks = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#vorteile", label: "Vorteile" },
  { href: "#ablauf", label: "Ablauf" },
  { href: "#kontakt", label: "Kontakt" },
] as const

// Options of the "Gewünschte Leistung" select in the request form.
export const serviceOptions = [
  "Gebäude- & Treppenhausreinigung",
  "Außen- & Gartenpflege",
  "Winterdienst",
  "Entrümpelung",
  "Wohnungsreinigung vor Vermietung",
  "Malerarbeiten",
  "Mehrere Leistungen / Komplettbetreuung",
  "Sonstiges",
] as const

export type ServiceOption = (typeof serviceOptions)[number]

// Cards in the Leistungen section; also listed as services in the JSON-LD.
export const services: {
  title: string
  text: string
  // Preselected in the form; omitted where the card spans several options.
  option?: ServiceOption
}[] = [
  {
    title: "Gebäude- & Treppenhausreinigung",
    text: "Gründliche Reinigung von Treppen, Podesten, Geländern, Eingangsbereichen und Haustüren sowie professionelle Fenster- und Glasreinigung, Keller und Dachböden.",
    option: "Gebäude- & Treppenhausreinigung",
  },
  {
    title: "Außen- & Gartenpflege",
    text: "Zuverlässiger Rasenschnitt, fachgerechter Hecken- und Strauchschnitt sowie ganzheitliche Grünanlagenpflege und Pflege der Fußwege.",
    option: "Außen- & Gartenpflege",
  },
  {
    title: "Winterdienst",
    text: "Pünktliche Schneeräumung und gewissenhafter Streudienst bei Glätte – gemäß den gesetzlichen Vorgaben.",
    option: "Winterdienst",
  },
  {
    title: "Spezialleistungen",
    text: "Keller- und Dachbodenreinigung, Entrümpelungen inklusive fachgerechter Entsorgung, malermäßiges Überarbeiten von Einheiten sowie Komplettreinigung von Wohnungen vor der Vermietung.",
  },
]
