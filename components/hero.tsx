import { Check } from "lucide-react"

import { HeroMedia } from "@/components/hero-media"
import { Container } from "@/components/section"
import { Button } from "@/components/ui/button"

const checks = [
  "Fester Ansprechpartner",
  "Kalkulierbare Kosten ohne böse Überraschungen",
  "Individuelles Angebot für Ihr Portfolio",
]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_85%_20%,rgba(242,180,65,.18),transparent_45%),linear-gradient(135deg,var(--brand-green)_0%,var(--brand-green-dark)_100%)] pt-12 pb-14 text-white sm:pt-21 sm:pb-24">
      <HeroMedia />
      {/* Dark green veil so the white text stays readable over any footage */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-[rgba(22,56,41,.9)] via-[rgba(22,56,41,.68)] via-55% to-[rgba(22,56,41,.4)]"
      />

      <Container className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        <div>
          <span className="mb-2.5 inline-block text-[0.8rem] font-bold tracking-[0.08em] text-brand-amber uppercase">
            Hausmeisterservice in Chemnitz
          </span>
          <h1 className="mb-2 text-[clamp(1.85rem,4.6vw,3.2rem)] leading-tight font-bold text-balance">
            Zuverlässige Objektpflege für Ihre Immobilien
          </h1>
          <p className="max-w-[560px] text-[1.05rem] text-white/85 sm:text-[1.1rem]">
            Ihr regionaler Partner für Sauberkeit, Werterhalt und reibungslose
            Abläufe – maßgeschneidert für Hausverwaltungen und Eigentümer.
          </p>
          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
            <Button asChild variant="amber" size="cta">
              <a href="#kontakt">Kostenlose Objektbesichtigung</a>
            </Button>
            <Button asChild variant="ghost-light" size="cta">
              <a href="#leistungen">Leistungen ansehen</a>
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-white/18 bg-white/8 p-5 backdrop-blur-[2px] sm:p-7">
          <div className="text-[3.2rem] leading-none font-extrabold text-brand-amber">
            45
          </div>
          <p className="mt-2 mb-5 text-white/90">
            Mehrfamilienhäuser in Chemnitz betreuen wir bereits heute.
          </p>
          <ul className="grid gap-2.5">
            {checks.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check
                  className="mt-1 size-5 shrink-0 text-brand-amber"
                  strokeWidth={3}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
