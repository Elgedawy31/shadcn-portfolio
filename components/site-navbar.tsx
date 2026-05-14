"use client"

import * as React from "react"
import { DownloadSimple, Moon, Sun } from "@phosphor-icons/react"
import { motion } from "framer-motion"
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
  const isMounted = React.useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  )
  const isDark = isMounted && resolvedTheme === "dark"

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
        className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 border border-border/50 bg-background px-3 py-2"
      >
        <a
          href="#home"
          onClick={handleNavClick}
          className="font-mono text-sm font-semibold tracking-tight text-foreground"
          aria-current={activeHref === "#home" ? "page" : undefined}
        >
          <span className="text-primary">~/</span>elgedawy
        </a>

        <div className="hidden items-center gap-5 md:flex">
          {navLinks.map((link, index) => {
            const isActive = activeHref === link.href

            return (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                aria-current={isActive ? "page" : undefined}
                className="group relative isolate rounded-full px-2.5 py-1.5 font-mono text-xs text-muted-foreground outline-none transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[active=true]:text-foreground"
                data-active={isActive}
                initial={{ opacity: 0, y: -6 }}
                animate={
                  isSplashReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }
                }
                whileHover={{ y: -2, transition: { duration: 0.18 } }}
                whileTap={{ scale: 0.97, transition: { duration: 0.12 } }}
                transition={{ duration: 0.4, delay: 0.28 + index * 0.06 }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-full bg-primary/8 opacity-0 shadow-[0_10px_30px_color-mix(in_oklch,var(--primary)_14%,transparent)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[active=true]:opacity-100"
                />
                <span className="relative z-10">{link.label}</span>
                <span
                  aria-hidden
                  className="absolute right-2.5 bottom-1 left-2.5 h-px origin-left scale-x-0 bg-linear-to-r from-primary via-foreground/70 to-transparent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 group-data-[active=true]:scale-x-100"
                />
              </motion.a>
            )
          })}
        </div>

        <div className="flex items-center justify-end gap-2">
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
