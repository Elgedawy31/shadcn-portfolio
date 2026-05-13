"use client"

import * as React from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"

const interactiveSelector = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "summary",
  "label",
  "[role='button']",
  "[tabindex]:not([tabindex='-1'])",
  "[data-cursor='interactive']",
].join(",")

const textSelector = [
  "p",
  "span",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "li",
  "blockquote",
  "[data-cursor='text']",
].join(",")

type CursorMode = "default" | "interactive" | "text"

function getCursorMode(target: EventTarget | null): CursorMode {
  if (!(target instanceof Element)) {
    return "default"
  }

  if (target.closest(interactiveSelector)) {
    return "interactive"
  }

  if (target.closest(textSelector)) {
    return "text"
  }

  return "default"
}

function CustomCursor() {
  const prefersReducedMotion = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 520, damping: 38, mass: 0.35 })
  const y = useSpring(rawY, { stiffness: 520, damping: 38, mass: 0.35 })
  const [isEnabled, setIsEnabled] = React.useState(false)
  const [hasMoved, setHasMoved] = React.useState(false)
  const [isPressed, setIsPressed] = React.useState(false)
  const [mode, setMode] = React.useState<CursorMode>("default")

  React.useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const pointerQuery = window.matchMedia("(pointer: fine)")
    const hoverQuery = window.matchMedia("(hover: hover)")

    function updateSupport() {
      setIsEnabled(pointerQuery.matches && hoverQuery.matches)
    }

    updateSupport()

    pointerQuery.addEventListener("change", updateSupport)
    hoverQuery.addEventListener("change", updateSupport)

    return () => {
      pointerQuery.removeEventListener("change", updateSupport)
      hoverQuery.removeEventListener("change", updateSupport)
    }
  }, [prefersReducedMotion])

  React.useEffect(() => {
    if (!isEnabled) {
      document.documentElement.classList.remove("custom-cursor-enabled")
      return
    }

    document.documentElement.classList.add("custom-cursor-enabled")

    function onPointerMove(event: PointerEvent) {
      rawX.set(event.clientX)
      rawY.set(event.clientY)
      setHasMoved(true)
      setMode(getCursorMode(event.target))
    }

    function onPointerOver(event: PointerEvent) {
      setMode(getCursorMode(event.target))
    }

    function onPointerDown() {
      setIsPressed(true)
    }

    function onPointerUp() {
      setIsPressed(false)
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerover", onPointerOver)
    window.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointerup", onPointerUp)
    window.addEventListener("pointercancel", onPointerUp)
    window.addEventListener("blur", onPointerUp)

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled")
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerover", onPointerOver)
      window.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointerup", onPointerUp)
      window.removeEventListener("pointercancel", onPointerUp)
      window.removeEventListener("blur", onPointerUp)
    }
  }, [isEnabled, rawX, rawY])

  if (!isEnabled || !hasMoved) {
    return null
  }

  const isInteractive = mode === "interactive"
  const isText = mode === "text"

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <motion.div
        className="fixed left-0 top-0"
        style={{ x, y }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute left-0 top-0 rounded-full border border-primary/70 bg-background/10 shadow-[0_0_34px_color-mix(in_oklch,var(--primary)_34%,transparent)] backdrop-blur-[2px]"
          animate={{
            width: isInteractive ? 52 : isText ? 12 : 34,
            height: isInteractive ? 52 : isText ? 42 : 34,
            x: isInteractive ? -26 : isText ? -6 : -17,
            y: isInteractive ? -26 : isText ? -21 : -17,
            scale: isPressed ? 0.82 : 1,
            borderRadius: isText ? 8 : 999,
            borderColor: isInteractive
              ? "color-mix(in oklch, var(--primary) 86%, var(--foreground))"
              : "color-mix(in oklch, var(--primary) 70%, transparent)",
          }}
          transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.45 }}
        >
          <motion.div
            className="absolute inset-1 rounded-full bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklch,var(--primary)_55%,white),transparent_42%),linear-gradient(135deg,color-mix(in_oklch,var(--primary)_30%,transparent),transparent)] opacity-70"
            animate={{
              borderRadius: isText ? 6 : 999,
              opacity: isInteractive ? 0.85 : 0.55,
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        <motion.div
          className="absolute left-0 top-0 size-2 rounded-full bg-primary shadow-[0_0_18px_var(--primary)]"
          animate={{
            x: -4,
            y: -4,
            scale: isInteractive ? 0.45 : isPressed ? 1.35 : 1,
            opacity: isText ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 520, damping: 26 }}
        />

        <AnimatePresence>
          {isPressed ? (
            <motion.div
              className="absolute left-0 top-0 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50"
              initial={{ opacity: 0.75, scale: 0.45 }}
              animate={{ opacity: 0, scale: 1.75 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
            />
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export { CustomCursor }
