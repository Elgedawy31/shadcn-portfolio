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

export { markSplashReady, useSplashReady }
