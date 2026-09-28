import { Section, SectionHeading } from "@/components/section"

const benefits = [
  {
    title: "Erfahrung & Praxis",
    text: "Im Einsatz für unsere Kunden – wir wissen, worauf es ankommt.",
  },
  {
    title: "Fester Ansprechpartner",
    text: "Kurze Kommunikationswege und schnelle Reaktionszeiten.",
  },
  {
    title: "Faire & transparente Preise",
    text: "Kalkulierbare Kosten ohne böse Überraschungen.",
  },
  {
    title: "Qualität & Pünktlichkeit",
    text: "Flexibel, termingerecht und mit hohem Qualitätsanspruch.",
  },
]

export function Benefits() {
  return (
    <Section id="vorteile" className="bg-muted">
      <SectionHeading
        eyebrow="Ihre Vorteile"
        title="Warum Hausverwaltungen uns vertrauen"
      />

      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b) => (
          <div key={b.title} className="border-t-[3px] border-brand-amber pt-4.5">
            <h3 className="mb-2 text-lg leading-tight font-bold">{b.title}</h3>
            <p className="text-muted-foreground">{b.text}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 rounded-xl sm:mt-12 bg-brand-green-soft px-5 py-6 text-base sm:px-8 sm:py-7 sm:text-lg font-semibold text-brand-green-dark">
        Unser Ziel: Bewohner und Eigentümer fühlen sich in einem rundum
        gepflegten Umfeld wohl – und Sie als Hausverwaltung werden spürbar
        entlastet.
      </p>
    </Section>
  )
}
