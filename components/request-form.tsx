"use client"

import * as React from "react"
import { MessageCircle } from "lucide-react"

import { useRequest } from "@/components/request-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import { contact, serviceOptions, whatsappUrl, type ServiceOption } from "@/lib/site"

const fieldClass = "h-12 bg-white px-3.5 text-base md:text-base"

export function RequestForm() {
  const { service, setService, highlight } = useRequest()

  const formRef = React.useRef<HTMLFormElement>(null)
  const nameRef = React.useRef<HTMLInputElement>(null)
  const serviceRef = React.useRef<HTMLSelectElement>(null)

  // A service card was clicked: flash the form, then focus the next field to fill.
  React.useEffect(() => {
    if (highlight.count === 0) return
    const form = formRef.current
    if (!form) return
    form.classList.remove("animate-form-flash")
    void form.offsetWidth // restart the animation
    form.classList.add("animate-form-flash")
    const t = setTimeout(() => {
      const target = highlight.preselected ? nameRef.current : serviceRef.current
      target?.focus({ preventScroll: true })
    }, 500)
    return () => clearTimeout(t)
  }, [highlight])

  // Nothing is sent to the website: the form only opens WhatsApp with the text prefilled.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (k: string) => String(data.get(k) ?? "").trim()

    const text = [
      "Anfrage über die Website",
      `Name: ${get("name")}`,
      get("phone") && `Telefon: ${get("phone")}`,
      get("email") && `E-Mail: ${get("email")}`,
      `Leistung: ${service}`,
      get("address") && `Objekt: ${get("address")}`,
      "",
      get("message"),
    ]
      .filter((line, i, all) => line !== "" || i === all.length - 2)
      .join("\n")

    window.open(whatsappUrl(text), "_blank", "noopener")
  }

  return (
    <form
      ref={formRef}
      id="request-form"
      onSubmit={onSubmit}
      className="grid gap-4 rounded-xl border bg-card p-4 sm:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name *" htmlFor="name">
          <Input
            ref={nameRef}
            id="name"
            name="name"
            required
            autoComplete="name"
            enterKeyHint="next"
            className={fieldClass}
          />
        </Field>
        <Field label="Telefon" htmlFor="phone">
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            className={fieldClass}
          />
        </Field>
      </div>

      <Field label="E-Mail" htmlFor="email">
        <Input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="next"
          className={fieldClass}
        />
      </Field>

      <Field label="Gewünschte Leistung" htmlFor="service">
        {/* Native select: phones show their own picker, which beats any custom dropdown */}
        <NativeSelect
          ref={serviceRef}
          id="service"
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value as ServiceOption)}
          className="w-full [&_select]:h-12 [&_select]:bg-white [&_select]:pl-3.5 [&_select]:text-base"
        >
          {serviceOptions.map((option) => (
            <NativeSelectOption key={option} value={option}>
              {option}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Field>

      <Field label="Objekt-Adresse (optional)" htmlFor="address">
        <Input
          id="address"
          name="address"
          autoComplete="street-address"
          enterKeyHint="next"
          className={fieldClass}
        />
      </Field>

      <Field label="Ihre Nachricht *" htmlFor="message">
        <Textarea
          id="message"
          name="message"
          required
          placeholder="z. B. Anzahl der Häuser / Wohneinheiten, gewünschter Starttermin"
          className="min-h-[120px] bg-white px-3.5 text-base md:text-base"
        />
      </Field>

      <Button type="submit" variant="whatsapp" size="cta" className="w-full">
        <MessageCircle strokeWidth={2.2} aria-hidden="true" />
        Per WhatsApp senden
      </Button>

      <p className="text-sm text-muted-foreground">
        Es öffnet sich WhatsApp mit Ihrer vorausgefüllten Anfrage – Sie müssen
        sie dort nur noch absenden. Lieber telefonisch?{" "}
        <a href={contact.phoneHref} className="font-semibold text-brand-green">
          {contact.phoneDisplay}
        </a>
        . Hinweise zum{" "}
        <a href="#datenschutz" className="font-semibold text-brand-green">
          Datenschutz
        </a>{" "}
        finden Sie unten.
      </p>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor} className="text-[0.92rem] font-semibold">
        {label}
      </Label>
      {children}
    </div>
  )
}
