"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { AmbientGridPattern } from "@/components/ambient-grid"
import { markSplashReady, useSplashDocumentScrollLock } from "@/components/splash-ready"

function SplashScreen({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = React.useState(true)
  const [scrollLocked, setScrollLocked] = React.useState(true)
  const [progress, setProgress] = React.useState(0)

  useSplashDocumentScrollLock(scrollLocked)

  React.useEffect(() => {
    const duration = prefersReducedMotion ? 450 : 2200
    const startedAt = performance.now()

    const progressTimer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100))

      setProgress(nextProgress)
    }, 32)

    const closeTimer = window.setTimeout(() => {
      setProgress(100)
      setIsVisible(false)
      markSplashReady()
    }, duration)

    return () => {
      window.clearInterval(progressTimer)
      window.clearTimeout(closeTimer)
    }
  }, [prefersReducedMotion])

  return (
    <>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          setScrollLocked(false)
        }}
      >
        {isVisible ? (
          <motion.div
            aria-live="polite"
            aria-label="Loading Mohamed Elgedawy portfolio"
            className="fixed inset-0 z-50 grid min-h-svh place-items-center overflow-hidden bg-background px-6 text-foreground"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: prefersReducedMotion ? 1 : 1.015,
              filter: prefersReducedMotion ? "none" : "blur(10px)",
            }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.55, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_52%)]" />
            <AmbientGridPattern />

            <motion.div
              className="relative flex w-full max-w-xl flex-col items-center gap-8 text-center"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="grid size-20 place-items-center rounded-full border border-border/70 bg-background/70 shadow-[0_24px_80px_color-mix(in_oklch,var(--foreground)_12%,transparent)] backdrop-blur-xl"
                initial={{ scale: prefersReducedMotion ? 1 : 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.55, delay: 0.1 }}
              >
                <motion.div
                  className="size-11 rounded-full border-2 border-primary/20 border-t-primary"
                  animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              <div className="space-y-3">
                <motion.p
                  className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.2 : 0.45, delay: 0.18 }}
                >
                  Full Stack Engineer
                </motion.p>
                <motion.h1
                  className="bg-[linear-gradient(115deg,var(--foreground),var(--primary),color-mix(in_oklch,var(--primary)_50%,var(--foreground)))] bg-clip-text font-heading text-4xl font-semibold leading-tight text-transparent sm:text-6xl"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, delay: 0.28 }}
                >
                  Mohamed Elgedawy
                </motion.h1>
                <motion.p
                  className="mx-auto max-w-md text-sm leading-6 text-muted-foreground sm:text-base"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, delay: 0.42 }}
                >
                  Preparing a fast, polished portfolio experience.
                </motion.p>
              </div>

              <motion.div
                className="w-full max-w-sm space-y-3"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, delay: 0.55 }}
              >
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--primary),color-mix(in_oklch,var(--primary)_45%,var(--foreground)))]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  />
                </div>
                <div className="flex items-center justify-between text-[0.68rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  <span>Loading</span>
                  <span>{progress}%</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: isVisible ? 0 : 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.35, delay: isVisible ? 0 : 0.1 }}
      >
        {children}
      </motion.div>
    </>
  )
}

export { SplashScreen }
