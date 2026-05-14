import { cn } from "@/lib/utils"

type AmbientGridPatternProps = {
  className?: string
}

/** Same cube / line grid as the splash screen — uses theme `--border`. */
function AmbientGridPattern({ className }: AmbientGridPatternProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] bg-size-[72px_72px] opacity-30",
        className
      )}
    />
  )
}

export { AmbientGridPattern }
