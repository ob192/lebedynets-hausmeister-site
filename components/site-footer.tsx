"use client"

import * as React from "react"

import { Container } from "@/components/section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { contact } from "@/lib/site"

const legalIds = ["impressum", "datenschutz"]

export function SiteFooter() {
  const [open, setOpen] = React.useState<string[]>([])

  // Links to #impressum / #datenschutz (and arriving with that hash) open the section.
  React.useEffect(() => {
    const openItem = (id: string) =>
      setOpen((o) => (o.includes(id) ? o : [...o, id]))

    const fromHash = window.location.hash.slice(1)
    if (legalIds.includes(fromHash)) openItem(fromHash)

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest?.("a[href^='#']")
      const id = link?.getAttribute("href")?.slice(1)
      if (id && legalIds.includes(id)) openItem(id)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return (
    <footer className="bg-brand-green-dark pt-12 pb-8 text-[0.95rem] text-white/80">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h2 className="mb-2 text-base font-bold text-white">{contact.company}</h2>
            <p>Zuverlässige Objektpflege &amp; Hausmeisterservice in Chemnitz.</p>
          </div>
          <div>
            <h2 className="mb-2 text-base font-bold text-white">Kontakt</h2>
            <p>
              {contact.street}
              <br />
              {contact.city}
              <br />
              <a href={contact.phoneHref} className="text-white underline">
                {contact.phoneDisplay}
              </a>
              <br />
              <a href={`mailto:${contact.email}`} className="text-white underline">
                {contact.email}
              </a>
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-base font-bold text-white">Leistungen</h2>
            <p>
              Treppenhausreinigung
              <br />
              Garten- &amp; Grünpflege
              <br />
              Winterdienst
              <br />
              Entrümpelung
            </p>
          </div>
        </div>

        <div className="mt-9 border-t border-white/15 pt-5">
          <Accordion
            type="multiple"
            value={open}
            onValueChange={setOpen}
            className="max-w-[760px]"
          >
            <AccordionItem id="impressum" value="impressum" className="scroll-mt-20 border-white/15">
              <LegalTrigger>Impressum</LegalTrigger>
              <LegalContent>
                <h5>Angaben gemäß § 5 DDG</h5>
                <p>
                  {contact.owner}
                  <br />
                  {contact.company}
                  <br />
                  {contact.street}
                  <br />
                  {contact.city}
                </p>
                <h5>Kontakt</h5>
                <p>
                  Telefon: {contact.phoneDisplay}
                  <br />
                  E-Mail: <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              </LegalContent>
            </AccordionItem>

            <AccordionItem id="datenschutz" value="datenschutz" className="scroll-mt-20 border-white/15">
              <LegalTrigger>Datenschutzerklärung</LegalTrigger>
              <LegalContent>
                <h5>Verantwortlicher</h5>
                <p>
                  {contact.owner}, {contact.street}, {contact.city}, Telefon{" "}
                  {contact.phoneDisplay}, E-Mail {contact.email}.
                </p>
                <h5>Hosting und Server-Logfiles</h5>
                <p>
                  Beim Aufruf dieser Website verarbeitet unser Hosting-Anbieter
                  technisch notwendige Daten (z. B. IP-Adresse, Datum und
                  Uhrzeit, aufgerufene Seite, Browsertyp) in Server-Logfiles.
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (sicherer und
                  stabiler Betrieb der Website).
                </p>
                <h5>Keine Cookies, kein Tracking</h5>
                <p>
                  Diese Website setzt keine Cookies, verwendet keine Analyse-
                  oder Tracking-Werkzeuge und lädt keine externen Schriftarten
                  oder Inhalte.
                </p>
                <h5>Anfrageformular, Telefon und WhatsApp</h5>
                <p>
                  Wenn Sie uns anrufen, uns eine E-Mail schreiben oder das
                  Anfrageformular nutzen, verarbeiten wir Ihre Angaben (Name,
                  Kontaktdaten, Objekt und Nachricht) ausschließlich zur
                  Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Wir
                  löschen Ihre Daten, sobald sie für die Bearbeitung nicht mehr
                  erforderlich sind und keine gesetzlichen
                  Aufbewahrungspflichten entgegenstehen.
                </p>
                <p>
                  Das Anfrageformular überträgt keine Daten an diese Website
                  und speichert nichts. „Per WhatsApp senden“ öffnet lediglich
                  WhatsApp mit Ihrem vorausgefüllten Text; erst wenn Sie die
                  Nachricht dort absenden, werden Daten an die WhatsApp Ireland
                  Ltd. (Meta) übermittelt, es gelten deren
                  Datenschutzbestimmungen. Alternativ erreichen Sie uns
                  jederzeit telefonisch oder per E-Mail.
                </p>
                <h5>Ihre Rechte</h5>
                <p>
                  Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
                  Einschränkung der Verarbeitung, Datenübertragbarkeit und
                  Widerspruch sowie das Recht, sich bei einer Aufsichtsbehörde
                  zu beschweren (in Sachsen: Sächsische Datenschutz- und
                  Transparenzbeauftragte).
                </p>
              </LegalContent>
            </AccordionItem>
          </Accordion>

          <p className="mt-5 text-sm text-white/55">
            © <CurrentYear /> {contact.company} · Chemnitz
          </p>
        </div>
      </Container>
    </footer>
  )
}

function LegalTrigger({ children }: { children: React.ReactNode }) {
  return (
    <AccordionTrigger className="min-h-12 items-center py-3 text-base font-semibold text-white **:data-[slot=accordion-trigger-icon]:text-white/70">
      {children}
    </AccordionTrigger>
  )
}

function LegalContent({ children }: { children: React.ReactNode }) {
  return (
    <AccordionContent className="pb-4 text-[0.95rem] text-white/80 [&_a]:text-white [&_h5]:mt-4 [&_h5]:mb-1 [&_h5]:font-bold [&_h5]:text-white [&_p:not(:last-child)]:mb-3">
      {children}
    </AccordionContent>
  )
}

// The HTML carries the build year; the browser re-renders it with the current one.
function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>
}
