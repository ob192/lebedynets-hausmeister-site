// Renders the PNG icons and the social-share image from the SVG logo and the
// hero poster. Output is committed; re-run only when the logo or texts change:
//   npm run images
import { mkdir, writeFile } from "node:fs/promises"
import sharp from "sharp"

const GREEN = "#1f4d3a"
const GREEN_DARK = "#163829"
const AMBER = "#f2b441"

// House mark from public/brand/logo-mark.svg, drawn inside a 56×56 box.
const markPaths = (stroke = 1) => `
  <path d="M10 26 28 11l18 15" fill="none" stroke="${AMBER}" stroke-width="${3.5 * stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 23v20h14" fill="none" stroke="#fff" stroke-width="${4.5 * stroke}" stroke-linecap="round" stroke-linejoin="round"/>`

// Rounded tile (apple-icon, regular icons) or full-bleed square with safe
// padding (maskable: Android crops it to a circle/squircle).
const iconSvg = ({ maskable = false } = {}) =>
  maskable
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56">
         <rect width="56" height="56" fill="${GREEN}"/>
         <g transform="translate(11.2 11.2) scale(.6)">${markPaths(1.2)}</g>
       </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56">
         <rect width="56" height="56" rx="12" fill="${GREEN}"/>${markPaths()}
       </svg>`

async function png(svg, size, out, { flatten = false } = {}) {
  let img = sharp(Buffer.from(svg), { density: 72 * (size / 56) * 2 }).resize(size, size)
  // iOS draws transparent corners black, so the apple icon gets a solid square.
  if (flatten) img = img.flatten({ background: GREEN })
  await img.png().toFile(out)
  console.log("wrote", out)
}

await mkdir("public/icons", { recursive: true })
await png(iconSvg({ maskable: true }), 180, "app/apple-icon.png", { flatten: true })
await png(iconSvg(), 192, "public/icons/icon-192.png")
await png(iconSvg(), 512, "public/icons/icon-512.png")
await png(iconSvg({ maskable: true }), 512, "public/icons/icon-maskable-512.png")

// Open Graph / Twitter share image, 1200×630.
const W = 1200
const H = 630
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;")
const overlay = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="veil" x1="0" x2="1">
      <stop offset="0" stop-color="${GREEN_DARK}" stop-opacity=".94"/>
      <stop offset=".6" stop-color="${GREEN_DARK}" stop-opacity=".8"/>
      <stop offset="1" stop-color="${GREEN_DARK}" stop-opacity=".45"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#veil)"/>
  <g transform="translate(80 80) scale(1.5)">
    <rect width="56" height="56" rx="12" fill="${GREEN}"/>${markPaths()}
  </g>
  <text x="190" y="118" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#fff">Lebedynets</text>
  <text x="190" y="152" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#ffffffcc">Hausmeisterdienst Chemnitz</text>
  <text x="80" y="300" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" letter-spacing="3" fill="${AMBER}">HAUSMEISTERSERVICE IN CHEMNITZ</text>
  <text font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="700" fill="#fff">
    <tspan x="80" y="380">${esc("Zuverlässige Objektpflege")}</tspan>
    <tspan x="80" y="452">${esc("für Ihre Immobilien")}</tspan>
  </text>
  <rect x="80" y="506" width="360" height="64" rx="32" fill="${AMBER}"/>
  <text x="260" y="548" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="#1c2421">0152 03587320</text>
</svg>`

await sharp("public/media/hero-poster.jpg")
  .resize(W, H, { fit: "cover" })
  .composite([{ input: Buffer.from(overlay) }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("app/opengraph-image.jpg")
console.log("wrote app/opengraph-image.jpg")

await writeFile(
  "app/opengraph-image.alt.txt",
  "Lebedynets Hausmeisterdienst – Zuverlässige Objektpflege für Ihre Immobilien in Chemnitz"
)
