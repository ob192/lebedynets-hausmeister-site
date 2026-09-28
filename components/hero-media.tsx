"use client"

import * as React from "react"

type NetworkInformation = { saveData?: boolean; effectiveType?: string }

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(reducedMotionQuery)
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}

function videoAllowed() {
  const conn = (navigator as Navigator & { connection?: NetworkInformation })
    .connection
  const slow = conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")
  return !slow && !window.matchMedia(reducedMotionQuery).matches
}

// True once the window `load` event has fired, i.e. the poster and scripts are in.
function subscribeLoad(onChange: () => void) {
  window.addEventListener("load", onChange)
  return () => window.removeEventListener("load", onChange)
}
const pageLoaded = () => document.readyState === "complete"

// The poster is a plain <img>, so it paints first and is the LCP element. The
// video is attached only once the page has fully loaded, so its bytes never
// compete with the poster, and is skipped entirely for visitors who asked for
// reduced motion or less data, or who are on a very slow connection.
export function HeroMedia() {
  const allowed = React.useSyncExternalStore(subscribe, videoAllowed, () => false)
  const loaded = React.useSyncExternalStore(subscribeLoad, pageLoaded, () => false)
  const showVideo = allowed && loaded
  const [playing, setPlaying] = React.useState(false)

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-20">
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
      <img
        src="/media/hero-poster.jpg"
        alt=""
        width={1280}
        height={720}
        fetchPriority="high"
        decoding="async"
        className="size-full object-cover"
      />
      {showVideo && (
        <video
          className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-700 data-[playing=true]:opacity-100"
          data-playing={playing}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  )
}
