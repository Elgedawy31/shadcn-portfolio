"use client"

import { useReducedMotion } from "framer-motion"
import { ReactLenis } from "lenis/react"
import type { LenisOptions } from "lenis"

import { useSplashReady } from "@/components/splash-ready"

const lenisRootOptions = {
  autoRaf: true,
  anchors: true,
  smoothWheel: true,
  allowNestedScroll: true,
  lerp: 0.09,
} satisfies LenisOptions

type SmoothScrollProps = {
  children: React.ReactNode
}

function SmoothScroll({ children }: SmoothScrollProps) {
  const isSplashReady = useSplashReady()
  const reduceMotion = useReducedMotion()

  if (!isSplashReady || reduceMotion) {
    return children
  }

  return (
    <ReactLenis root options={lenisRootOptions}>
      {children}
    </ReactLenis>
  )
}

export { SmoothScroll }
