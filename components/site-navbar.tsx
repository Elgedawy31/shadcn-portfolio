"use client"

import * as React from "react"
import {
  FileText,
  FolderOpen,
  GithubLogo,
  HouseLine,
  LinkedinLogo,
  Moon,
  Sun,
  TerminalWindow,
} from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

import { useSplashReady } from "@/components/splash-ready"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#home", label: "home", icon: HouseLine },
  { href: "#work", label: "work", icon: FolderOpen },
  { href: "/mohamed-elgedawy-fullStack.pdf", label: "resume.pdf", icon: FileText },
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
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 border border-border/60 bg-transparent px-3 py-2 shadow-[0_18px_60px_color-mix(in_oklch,var(--foreground)_7%,transparent)] backdrop-blur-xl backdrop-saturate-150 sm:px-4"
      >
        <a
          href="#home"
          className="group flex min-w-0 items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="grid size-7 shrink-0 place-items-center border border-border/70 bg-background/25 text-primary shadow-[inset_0_0_18px_color-mix(in_oklch,var(--primary)_8%,transparent)]">
            <TerminalWindow weight="duotone" className="size-4" />
          </span>
          <span className="hidden items-center gap-1 sm:flex">
            <span className="text-primary">~</span>
            <span>/</span>
            <span>home</span>
            <span>/</span>
            <span>mohamed</span>
            <span>/</span>
            <span className="text-foreground">portfolio</span>
          </span>
          <span className="truncate text-foreground sm:hidden">~/portfolio</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, index) => {
            const Icon = link.icon

            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -6 }}
                animate={isSplashReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.4, delay: 0.28 + index * 0.06 }}
              >
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="border border-transparent bg-transparent px-2.5 font-mono text-xs text-muted-foreground hover:border-border/70 hover:bg-background/20 hover:text-foreground"
                >
                  <a href={link.href}>
                    <Icon weight="duotone" className="size-3.5" />
                    <span>{link.label}</span>
                  </a>
                </Button>
              </motion.div>
            )
          })}
        </div>

        <div className="flex items-center gap-1">
          <Button
            asChild
            variant="ghost"
            size="icon-sm"
            className="border border-border/60 bg-transparent hover:bg-background/20"
            aria-label="GitHub profile"
          >
            <a href="https://github.com/Elgedawy31" target="_blank" rel="noreferrer">
              <GithubLogo weight="duotone" className="size-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon-sm"
            className="border border-border/60 bg-transparent hover:bg-background/20"
            aria-label="LinkedIn profile"
          >
            <a href="https://linkedin.com/in/mohamedelgedawy" target="_blank" rel="noreferrer">
              <LinkedinLogo weight="duotone" className="size-4" />
            </a>
          </Button>

          <button
            type="button"
            aria-label={isMounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle color theme"}
            aria-pressed={isDark}
            onClick={toggleTheme}
            className="relative ml-1 grid h-8 w-16 grid-cols-2 items-center border border-border/60 bg-transparent p-0.5 text-muted-foreground backdrop-blur-xl transition-colors hover:border-border hover:text-foreground"
          >
            <span
              className="absolute left-0.5 top-0.5 h-7 w-7 bg-primary transition-transform duration-300 ease-out data-[state=dark]:translate-x-8"
              data-state={isDark ? "dark" : "light"}
            />
            <span className="relative z-10 grid place-items-center">
              <Sun
                weight={isDark ? "regular" : "fill"}
                className={isDark ? "size-3.5" : "size-3.5 text-primary-foreground"}
              />
            </span>
            <span className="relative z-10 grid place-items-center">
              <Moon
                weight={isDark ? "fill" : "regular"}
                className={isDark ? "size-3.5 text-primary-foreground" : "size-3.5"}
              />
            </span>
          </button>
        </div>
      </motion.nav>
    </motion.header>
  )
}

export { SiteNavbar }
