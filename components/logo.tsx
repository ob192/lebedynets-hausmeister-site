import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      aria-hidden="true"
      className={cn("size-[38px] shrink-0", className)}
    >
      <rect width="56" height="56" rx="12" fill="#1f4d3a" />
      <path
        d="M10 26 28 11l18 15"
        fill="none"
        stroke="#f2b441"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 23v20h14"
        fill="none"
        stroke="#fff"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Lucide has no staircase icon; this is the one from the original site.
export function StairsIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 20h4v-4h4v-4h4V8h4" />
      <path d="M4 20V4" />
    </svg>
  )
}
