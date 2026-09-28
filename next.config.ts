import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Build to plain HTML/CSS/JS in `out/`, so the site runs on ordinary PHP
  // webhosting next to public/send.php — no Node server needed.
  output: "export",
  images: { unoptimized: true },
}

export default nextConfig
