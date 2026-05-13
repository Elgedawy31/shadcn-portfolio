"use client"

import * as React from "react"

let isSplashReady = false
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return isSplashReady
}

function getServerSnapshot() {
  return false
}

function markSplashReady() {
  if (isSplashReady) {
    return
  }

  isSplashReady = true
  listeners.forEach((listener) => listener())
}

function useSplashReady() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * Locks document scrolling (hides scrollbar, blocks wheel/touch scroll) while the splash overlay
 * is up or finishing its exit animation. Restores previous inline styles on cleanup.
 */
function useSplashDocumentScrollLock(locked: boolean) {
  React.useEffect(() => {
    if (!locked) {
      return
    }

    const root = document.documentElement
    const body = document.body
    const previous = {
      rootOverflow: root.style.overflow,
      rootOverscroll: root.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
    }

    root.style.overflow = "hidden"
    root.style.overscrollBehavior = "none"
    body.style.overflow = "hidden"
    body.style.overscrollBehavior = "none"

    return () => {
      root.style.overflow = previous.rootOverflow
      root.style.overscrollBehavior = previous.rootOverscroll
      body.style.overflow = previous.bodyOverflow
      body.style.overscrollBehavior = previous.bodyOverscroll
    }
  }, [locked])
}

export { markSplashReady, useSplashDocumentScrollLock, useSplashReady }
