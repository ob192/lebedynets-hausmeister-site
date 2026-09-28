import { cn } from "@/lib/utils"

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1120px] px-4 sm:px-5", className)}
      {...props}
    />
  )
}

export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("scroll-mt-16 py-14 sm:scroll-mt-[68px] sm:py-21", className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: string
  lead?: string
}) {
  return (
    <>
      <span className="mb-2.5 inline-block text-[0.8rem] font-bold tracking-[0.08em] text-brand-green uppercase">
        {eyebrow}
      </span>
      <h2 className="mb-2 text-[clamp(1.5rem,3.2vw,2.2rem)] leading-tight font-bold text-balance">
        {title}
      </h2>
      {lead && <p className="max-w-[640px] text-muted-foreground">{lead}</p>}
    </>
  )
}

// Soft green gradient used behind the Leistungen and Ablauf sections.
export const tintedBg =
  "bg-linear-to-b from-brand-green-soft to-[#f3f7f5]"

// Card treatment shared by the service cards and the process steps.
export const accentCard =
  "rounded-xl border-2 border-t-[5px] border-brand-green/18 border-t-brand-green bg-card shadow-[0_6px_18px_rgba(22,56,41,.06)]"
