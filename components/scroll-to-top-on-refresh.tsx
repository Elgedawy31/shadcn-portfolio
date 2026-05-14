"use client"

import * as React from "react"

function ScrollToTopOnRefresh() {
  React.useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [])

  return null
}

export { ScrollToTopOnRefresh }
