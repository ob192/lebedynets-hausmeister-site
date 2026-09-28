import {
  Section,
  SectionHeading,
  accentCard,
  tintedBg,
} from "@/components/section"
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Anfrage",
    text: "Rufen Sie uns an oder schreiben Sie uns kurz, um welches Objekt es geht.",
  },
  {
    title: "Objektbesichtigung",
    text: "Wir kommen vor Ort – kostenlos und unverbindlich – und sehen uns Ihre Liegenschaft an.",
  },
  {
    title: "Individuelles Angebot",
    text: "Sie erhalten ein auf Ihr Portfolio abgestimmtes Angebot mit klaren, kalkulierbaren Kosten.",
  },
]

export function Process() {
  return (
    <Section id="ablauf" className={tintedBg}>
      <SectionHeading
        eyebrow="So einfach geht's"
        title="In drei Schritten zur Zusammenarbeit"
      />

      <ol className="mt-9 grid gap-5 md:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className={cn(accentCard, "p-5.5 sm:p-7")}>
            <span
              aria-hidden="true"
              className="mb-3.5 grid size-10 place-items-center rounded-full bg-brand-green font-extrabold text-brand-amber"
            >
              {i + 1}
            </span>
            <h3 className="mb-2 text-lg leading-tight font-bold">{step.title}</h3>
            <p className="text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
