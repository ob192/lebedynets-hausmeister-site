import type { Metadata, Viewport } from "next"
import "./globals.css"

import { site, siteUrl } from "@/lib/site"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Hausmeisterservice Chemnitz",
    "Hausmeisterdienst Chemnitz",
    "Objektpflege Chemnitz",
    "Treppenhausreinigung Chemnitz",
    "Gartenpflege Chemnitz",
    "Winterdienst Chemnitz",
    "Entrümpelung Chemnitz",
    "Hausverwaltung",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false, email: false },
  appleWebApp: { title: "Lebedynets", statusBarStyle: "default" },
  other: {
    "geo.region": "DE-SN",
    "geo.placename": "Chemnitz",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lets the header and call bar use env(safe-area-inset-*) on notched phones.
  viewportFit: "cover",
  themeColor: site.themeColor,
  colorScheme: "light",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className="antialiased">
      {/* Bottom padding keeps the footer clear of the fixed mobile call bar */}
      <body className="pb-[calc(76px+env(safe-area-inset-bottom))] sm:pb-0">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-white px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Zum Inhalt springen
        </a>
        {children}
      </body>
    </html>
  )
}
