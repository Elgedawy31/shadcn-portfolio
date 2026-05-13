import { AmbientGridPattern } from "@/components/ambient-grid"

/** Grid backdrop only (no center primary wash). */
function HomeAmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <AmbientGridPattern />
    </div>
  )
}

export { HomeAmbientBackground }
