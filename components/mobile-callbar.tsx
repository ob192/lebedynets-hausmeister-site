import { MessageCircle, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { contact, whatsappUrl } from "@/lib/site"

// Fixed call/WhatsApp bar on phones; the page adds bottom padding to match.
export function MobileCallbar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2.5 border-t bg-white/95 px-4 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] backdrop-blur-sm sm:hidden">
      <Button asChild variant="amber" size="cta">
        <a href={contact.phoneHref}>
          <Phone strokeWidth={2.2} aria-hidden="true" />
          Anrufen
        </a>
      </Button>
      <Button asChild variant="whatsapp" size="cta">
        <a href={whatsappUrl()} target="_blank" rel="noopener">
          <MessageCircle strokeWidth={2.2} aria-hidden="true" />
          WhatsApp
        </a>
      </Button>
    </div>
  )
}
