import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react"

import { RequestForm } from "@/components/request-form"
import { Section, SectionHeading } from "@/components/section"
import { contact, whatsappUrl } from "@/lib/site"

// Each row is one big tap target on phones: icon, label and value together.
const rows: {
  icon: LucideIcon
  label: string
  value: React.ReactNode
  href?: string
  external?: boolean
}[] = [
  { icon: Phone, label: "Telefon", value: contact.phoneDisplay, href: contact.phoneHref },
  { icon: MessageCircle, label: "WhatsApp", value: "Nachricht schreiben", href: whatsappUrl(), external: true },
  { icon: Mail, label: "E-Mail", value: contact.email, href: `mailto:${contact.email}` },
  {
    icon: MapPin,
    label: "Adresse",
    value: (
      <>
        {contact.street}
        <br />
        {contact.city}
      </>
    ),
  },
]

export function Contact() {
  return (
    <Section id="kontakt" className="bg-muted">
      <SectionHeading
        eyebrow="Kontakt"
        title="Kostenlose Objektbesichtigung vereinbaren"
        lead="Überzeugen Sie sich vor Ort von unserer Leistungsfähigkeit. Wir freuen uns auf eine erfolgreiche Zusammenarbeit mit Ihnen!"
      />

      <div className="mt-9 grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid gap-2.5">
          {rows.map(({ icon: Icon, label, value, href, external }) => {
            const body = (
              <>
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-green-soft text-brand-green">
                  <Icon className="size-5.5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <strong className="block">{label}</strong>
                  <span className={href ? "font-bold break-words text-brand-green" : undefined}>
                    {value}
                  </span>
                </div>
              </>
            )
            return href ? (
              <a
                key={label}
                href={href}
                {...(external && { target: "_blank", rel: "noopener" })}
                className="-mx-2 flex items-start gap-3.5 rounded-xl p-2 no-underline transition-colors hover:bg-white active:bg-white"
              >
                {body}
              </a>
            ) : (
              <div key={label} className="flex items-start gap-3.5 py-2">
                {body}
              </div>
            )
          })}
        </div>

        <RequestForm />
      </div>
    </Section>
  )
}
