import { Menu, MessageCircle, Phone } from "lucide-react"

import { LogoMark } from "@/components/logo"
import { Container } from "@/components/section"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { contact, navLinks, whatsappUrl } from "@/lib/site"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/95 pt-[env(safe-area-inset-top)] backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-3 sm:h-[68px]">
        <a
          href="#top"
          className="flex min-h-11 min-w-0 items-center gap-2.5 leading-tight font-extrabold no-underline"
        >
          <LogoMark />
          <span className="truncate">
            Lebedynets
            <small className="block truncate text-[0.78rem] font-medium text-muted-foreground">
              Hausmeisterdienst Chemnitz
            </small>
          </span>
        </a>

        <nav
          aria-label="Hauptnavigation"
          className="hidden gap-5.5 text-[0.95rem] font-semibold lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground no-underline hover:text-brand-green"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            asChild
            variant="amber"
            size="pill"
            className="size-11 px-0 sm:h-10 sm:w-auto sm:px-4"
          >
            <a href={contact.phoneHref} aria-label={`Anrufen: ${contact.phoneDisplay}`}>
              <Phone className="size-[1.1em]" strokeWidth={2.2} />
              <span className="hidden sm:inline">{contact.phoneDisplay}</span>
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-lg"
                className="size-11 rounded-full lg:hidden"
                aria-label="Menü öffnen"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,85vw)] gap-0">
              <SheetHeader className="border-b">
                <SheetTitle>Menü</SheetTitle>
                <SheetDescription>Hausmeisterdienst Chemnitz</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile Navigation" className="grid p-2">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      className="flex min-h-12 items-center rounded-lg px-3 text-lg font-semibold no-underline hover:bg-muted"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto grid gap-2.5 border-t p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <Button asChild variant="amber" size="cta">
                  <a href={contact.phoneHref}>
                    <Phone strokeWidth={2.2} aria-hidden="true" />
                    {contact.phoneDisplay}
                  </a>
                </Button>
                <Button asChild variant="whatsapp" size="cta">
                  <a href={whatsappUrl()} target="_blank" rel="noopener">
                    <MessageCircle strokeWidth={2.2} aria-hidden="true" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
