"use client"

import * as React from "react"
import {
  DownloadSimple,
  List,
  Moon,
  Sun,
  TerminalWindow,
  X,
} from "@phosphor-icons/react"
import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "next-themes"

import { useSplashReady } from "@/components/splash-ready"

const navLinks = [
  { href: "#about", label: "~/About" },
  { href: "#skills", label: "~/Skills" },
  { href: "#projects", label: "~/Projects" },
  { href: "#experience", label: "~/Experience" },
  { href: "#contact", label: "~/Contact" },
]

function subscribeToHydration() {
  return () => {}
}

function SiteNavbar() {
  const isSplashReady = useSplashReady()
  const { resolvedTheme, setTheme } = useTheme()
  const [activeHref, setActiveHref] = React.useState("#home")
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const isMounted = React.useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  )
  const isDark = isMounted && resolvedTheme === "dark"
  const activeLabel =
    navLinks.find((link) => link.href === activeHref)?.label ?? "~/Home"

  React.useEffect(() => {
    const sectionIds = ["home", ...navLinks.map((link) => link.href.slice(1))]
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) {
      return
    }

    let animationFrame = 0

    function updateActiveSection() {
      const scrollPosition = window.scrollY + 120
      const pageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8

      const activeSection = pageBottom
        ? sections.at(-1)
        : sections.findLast((section) => section.offsetTop <= scrollPosition)

      if (activeSection?.id) {
        setActiveHref((currentHref) => {
          const nextHref = `#${activeSection.id}`

          return currentHref === nextHref ? currentHref : nextHref
        })
      }
    }

    function handleScroll() {
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  React.useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  function handleNavClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const href = event.currentTarget.getAttribute("href")

    if (!href?.startsWith("#")) {
      return
    }

    const target =
      href === "#home"
        ? document.getElementById("home")
        : document.querySelector(href)

    if (!target) {
      return
    }

    event.preventDefault()
    setActiveHref(href)
    setIsMenuOpen(false)

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const navOffset = 88
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - navOffset

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
    window.history.pushState(null, "", href)
  }

  return (
    <motion.header
      className="sticky top-2 z-40 px-3 sm:top-4 sm:px-4"
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
        className="relative mx-auto max-w-7xl border border-border/50 bg-background/92 shadow-[0_18px_70px_color-mix(in_oklch,var(--foreground)_7%,transparent)] backdrop-blur-xl"
      >
        <div className="grid min-h-12 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <a
            href="#home"
            onClick={handleNavClick}
            className="group flex min-w-0 items-center gap-2 font-mono text-sm font-semibold tracking-tight text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-current={activeHref === "#home" ? "page" : undefined}
          >
            <span className="grid size-7 shrink-0 place-items-center bg-primary/10 text-primary transition-colors group-hover:bg-primary/16 dark:bg-primary/18">
              <TerminalWindow weight="duotone" className="size-4" />
            </span>
            <span className="min-w-0 truncate">
              <span className="text-primary">~/</span>elgedawy
            </span>
          </a>

          <div className="hidden items-center gap-5 lg:flex">
            {navLinks.map((link, index) => {
              const isActive = activeHref === link.href

              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  aria-current={isActive ? "page" : undefined}
                  className="group relative isolate font-mono text-xs text-muted-foreground outline-none transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[active=true]:text-foreground"
                  data-active={isActive}
                  initial={{ opacity: 0, y: -6 }}
                  animate={
                    isSplashReady
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: -6 }
                  }
                  whileHover={{ y: -2, transition: { duration: 0.18 } }}
                  whileTap={{ scale: 0.97, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.4, delay: 0.28 + index * 0.06 }}
                >
                  <span
                    aria-hidden
                    className="absolute -inset-x-1.5 -inset-y-1 -z-10 rounded-full bg-primary/8 opacity-0 shadow-[0_10px_30px_color-mix(in_oklch,var(--primary)_14%,transparent)] transition-[opacity,background-color] duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[active=true]:opacity-100 dark:bg-primary/16 dark:shadow-[0_10px_30px_color-mix(in_oklch,var(--primary)_22%,transparent)]"
                  />
                  <span className="relative z-10">{link.label}</span>
                  <span
                    aria-hidden
                    className="absolute right-0 -bottom-0.5 left-0 h-px origin-left scale-x-0 bg-linear-to-r from-primary via-foreground/70 to-transparent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 group-data-[active=true]:scale-x-100"
                  />
                </motion.a>
              )
            })}
          </div>

          <div className="flex min-w-0 items-center justify-end gap-2">
            <div className="hidden min-w-0 items-center gap-1 border-l border-border/45 pl-3 font-mono text-[0.68rem] text-muted-foreground md:flex lg:hidden">
              <span className="text-primary">$</span>
              <span className="truncate">cd {activeLabel}</span>
            </div>
            <button
              type="button"
              aria-label={
                isMounted
                  ? `Switch to ${isDark ? "light" : "dark"} theme`
                  : "Toggle color theme"
              }
              aria-pressed={isDark}
              onClick={toggleTheme}
              className="group relative grid size-8 shrink-0 place-items-center rounded-full border border-border/40 bg-muted/25 text-muted-foreground shadow-sm ring-offset-background transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:border-primary/35 hover:bg-muted/45 hover:text-foreground hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.96]"
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
              download="mohamed-elgedawy-fullStack.pdf"
              className="group hidden h-8 items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:inline-flex"
            >
              <span className="text-primary transition-colors duration-200 group-hover:text-foreground">
                $
              </span>
              <span className="hidden xl:inline">cat</span>
              <span className="text-primary">~/resume.pdf</span>
              <DownloadSimple
                weight="bold"
                className="ml-1 size-3.5 text-primary transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </a>
            <button
              type="button"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              className="grid size-8 shrink-0 place-items-center border border-border/45 bg-muted/20 text-muted-foreground transition-[color,background-color,border-color,transform] duration-200 hover:border-primary/35 hover:bg-primary/8 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:scale-95 lg:hidden"
            >
              {isMenuOpen ? (
                <X weight="bold" className="size-4 text-primary" />
              ) : (
                <List weight="bold" className="size-4 text-primary" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[calc(100%+0.5rem)] right-0 left-0 overflow-hidden border border-border/50 bg-background/96 shadow-[0_24px_80px_color-mix(in_oklch,var(--foreground)_12%,transparent)] backdrop-blur-xl lg:hidden"
            >
              <div className="space-y-3 px-3 pt-3 pb-4">
                <div className="flex min-w-0 items-center gap-2 border border-border/45 bg-muted/10 px-3 py-2 font-mono text-xs text-muted-foreground">
                  <span className="text-primary">mohamed@portfolio</span>
                  <span className="text-muted-foreground/45">:</span>
                  <span className="min-w-0 truncate">{activeLabel}</span>
                  <span className="text-primary">$</span>
                </div>

                <div className="grid gap-1.5 sm:grid-cols-2">
                  {navLinks.map((link, index) => {
                    const isActive = activeHref === link.href

                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={handleNavClick}
                        aria-current={isActive ? "page" : undefined}
                        data-active={isActive}
                        className="group flex min-h-10 items-center justify-between gap-3 border border-transparent px-3 py-2 font-mono text-xs text-muted-foreground transition-[color,background-color,border-color] duration-200 hover:bg-primary/8 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none data-[active=true]:border-primary/20 data-[active=true]:bg-primary/10 data-[active=true]:text-foreground dark:data-[active=true]:bg-primary/16"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.24,
                          delay: 0.04 + index * 0.035,
                        }}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="text-primary">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 truncate">
                            cd {link.label}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className="h-px w-7 origin-left scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100 group-data-[active=true]:scale-x-100"
                        />
                      </motion.a>
                    )
                  })}
                </div>

                <a
                  href="/mohamed-elgedawy-fullStack.pdf"
                  download="mohamed-elgedawy-fullStack.pdf"
                  className="group flex min-h-10 items-center justify-between gap-3 border-t border-border/45 pt-3 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  <span className="min-w-0 truncate">
                    <span className="text-primary">$</span> cat{" "}
                    <span className="text-primary">~/resume.pdf</span>
                  </span>
                  <DownloadSimple
                    weight="bold"
                    className="size-3.5 shrink-0 text-primary transition-transform duration-200 group-hover:translate-y-0.5"
                  />
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  )
}

export { SiteNavbar }
