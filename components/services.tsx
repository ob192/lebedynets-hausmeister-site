"use client"

import { Paintbrush, Snowflake, Sprout } from "lucide-react"

import { StairsIcon } from "@/components/logo"
import { useRequest } from "@/components/request-context"
import {
  Section,
  SectionHeading,
  accentCard,
  tintedBg,
} from "@/components/section"
import { services } from "@/lib/site"
import { cn } from "@/lib/utils"

// Same order as `services` in lib/site.ts.
const icons = [StairsIcon, Sprout, Snowflake, Paintbrush]

export function Services() {
  const { requestForm } = useRequest()

  return (
    <Section id="leistungen" className={tintedBg}>
      <SectionHeading
        eyebrow="Unsere Leistungen"
        title="Leistungsspektrum für Ihre Liegenschaften"
        lead="Vom Treppenhaus bis zum Dachboden, vom Rasen bis zum Gehweg im Winter – alles aus einer Hand."
      />

      <div className="mt-8 grid gap-4 sm:mt-9 sm:gap-5 md:grid-cols-2">
        {services.map(({ title, text, option }, i) => {
          const Icon = icons[i]
          return (
            <a
              key={title}
              href="#kontakt"
              onClick={() => requestForm(option)}
              className={cn(
                accentCard,
                "group flex flex-col gap-4 p-5 no-underline transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-[3px] hover:border-brand-green hover:border-t-brand-amber hover:shadow-[0_12px_28px_rgba(22,56,41,.14)] active:translate-y-0 min-[420px]:flex-row min-[420px]:gap-4.5 sm:p-7"
              )}
            >
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-green text-brand-amber sm:size-13">
                <Icon className="size-6 sm:size-6.5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="mb-1.5 text-lg leading-tight font-bold sm:text-xl">
                  {title}
                </h3>
                <p className="text-muted-foreground">{text}</p>
                <span className="mt-3 inline-flex min-h-6 items-center font-bold text-brand-green group-hover:text-brand-amber-dark">
                  Angebot anfragen →
                </span>
              </div>
            </a>
          )
        })}
      </div>
    </Section>
  )
}
