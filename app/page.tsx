import { Benefits } from "@/components/benefits"
import { Contact } from "@/components/contact"
import { Hero } from "@/components/hero"
import { JsonLd } from "@/components/json-ld"
import { MobileCallbar } from "@/components/mobile-callbar"
import { Process } from "@/components/process"
import { RequestProvider } from "@/components/request-context"
import { Services } from "@/components/services"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <RequestProvider>
      <JsonLd />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Services />
        <Benefits />
        <Process />
        <Contact />
      </main>
      <SiteFooter />
      <MobileCallbar />
    </RequestProvider>
  )
}
