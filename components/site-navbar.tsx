"use client"

import * as React from "react"
import { DownloadSimple, Moon, Sun } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

import { useSplashReady } from "@/components/splash-ready"

const navLinks = [
  { href: "#home", label: "~/About" },
  { href: "#skills", label: "~/Skills" },
  { href: "#work", label: "~/Projects" },
  { href: "#experience", label: "~/Experience" },
  { href: "mailto:mohamedelgedawy40@gmail.com", label: "~/Contact" },
]

function subscribeToHydration() {
  return () => {}
}

function SiteNavbar() {
  const isSplashReady = useSplashReady()
  const { resolvedTheme, setTheme } = useTheme()
  const isMounted = React.useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  )
  const isDark = isMounted && resolvedTheme === "dark"

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <motion.header
      className="sticky top-4 z-40 px-4"
      initial={{ opacity: 0, y: -18, filter: "blur(8px)" }}
      animate={
        isSplashReady
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: -18, filter: "blur(8px)" }
      }
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      <motion.nav
        aria-label="Main navigation"
        className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 border border-border/50 bg-background px-3 py-2 "
      >
        <a
          href="#home"
          className="font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          <span className="text-primary">~/</span>elgedawy
        </a>

        <div className="hidden items-center gap-5 md:flex">
          {navLinks.map((link, index) => {
            return (
              <motion.a
                key={link.href}
                href={link.href}
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                initial={{ opacity: 0, y: -6 }}
                animate={isSplashReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.4, delay: 0.28 + index * 0.06 }}
              >
                {link.label}
              </motion.a>
            )
          })}
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            aria-label={isMounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle color theme"}
            aria-pressed={isDark}
            onClick={toggleTheme}
            className="group relative grid size-8 shrink-0 place-items-center rounded-full border border-border/40 bg-muted/25 text-muted-foreground shadow-sm ring-offset-background transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:border-primary/35 hover:bg-muted/45 hover:text-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.96]"
          >
            {isDark ? (
              <Sun
                weight="duotone"
                className="size-4.5 text-primary transition-transform duration-200 group-hover:rotate-12 group-hover:text-foreground"
              />
            ) : (
              <Moon
                weight="duotone"
                className="size-4.5 text-primary transition-transform duration-200 group-hover:-rotate-6 group-hover:text-foreground"
              />
            )}
          </button>
          <a
            href="/mohamed-elgedawy-fullStack.pdf"
            className="hidden h-8 items-center gap-2 border border-border/60 px-3 font-mono text-xs text-foreground transition-colors hover:border-primary/50 hover:text-primary sm:inline-flex"
          >
            <DownloadSimple weight="bold" className="size-3.5" />
            resume
          </a>
        </div>
      </motion.nav>
    </motion.header>
  )
}

export { SiteNavbar }
