"use client"

import * as React from "react"

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

function CustomCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null)
  const ringRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)")
    const hoverQuery = window.matchMedia("(hover: hover)")

    if (!pointerQuery.matches || !hoverQuery.matches) {
      return
    }

    const dotElement = dotRef.current
    const ringElement = ringRef.current

    if (!dotElement || !ringElement) {
      return
    }

    const dot = dotElement
    const ring = ringElement

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let rafId = 0
    let isVisible = false

    function showCursor() {
      if (isVisible) {
        return
      }

      isVisible = true
      dot.style.opacity = "1"
      ring.style.opacity = "1"
    }

    function hideCursor() {
      isVisible = false
      dot.style.opacity = "0"
      ring.style.opacity = "0"
    }

    function setHoverState(target: EventTarget | null) {
      if (target instanceof Element && target.closest(interactiveSelector)) {
        ring.classList.add("cursor-ring--hover")
        return
      }

      ring.classList.remove("cursor-ring--hover")
    }

    function onMouseMove(event: MouseEvent) {
      mouseX = event.clientX
      mouseY = event.clientY

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      setHoverState(event.target)
      showCursor()
    }

    function onMouseDown() {
      ring.classList.add("cursor-ring--pressed")
    }

    function onMouseUp() {
      ring.classList.remove("cursor-ring--pressed")
    }

    function animateRing() {
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      rafId = window.requestAnimationFrame(animateRing)
    }

    document.documentElement.classList.add("custom-cursor-enabled")
    rafId = window.requestAnimationFrame(animateRing)

    document.addEventListener("mousemove", onMouseMove, { passive: true })
    document.addEventListener("mouseleave", hideCursor)
    document.addEventListener("mouseenter", showCursor)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    window.addEventListener("blur", hideCursor)

    return () => {
      window.cancelAnimationFrame(rafId)
      document.documentElement.classList.remove("custom-cursor-enabled")
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", hideCursor)
      document.removeEventListener("mouseenter", showCursor)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      window.removeEventListener("blur", hideCursor)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}

export { CustomCursor }
