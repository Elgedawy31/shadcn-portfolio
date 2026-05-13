"use client"

import * as React from "react"
import {
  Desktop,
  FileText,
  FolderOpen,
  GithubLogo,
  HouseLine,
  LinkedinLogo,
  Moon,
  Sun,
  TerminalWindow,
} from "@phosphor-icons/react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#home", label: "home", icon: HouseLine },
  { href: "#work", label: "work", icon: FolderOpen },
  { href: "/mohamed-elgedawy-fullStack.pdf", label: "resume.pdf", icon: FileText },
]

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Desktop },
]

function SiteNavbar() {
  const { theme, setTheme } = useTheme()
  const activeTheme = theme ?? "system"

  return (
    <header className="sticky top-4 z-40 px-4">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 border border-border/60 bg-transparent px-3 py-2 shadow-[0_18px_60px_color-mix(in_oklch,var(--foreground)_7%,transparent)] backdrop-blur-xl backdrop-saturate-150 sm:px-4"
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
          {navLinks.map((link) => {
            const Icon = link.icon

            return (
              <Button
                key={link.href}
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

          <div className="ml-1 flex items-center border border-border/60 bg-transparent p-0.5 backdrop-blur-xl">
            {themeOptions.map((option) => {
              const Icon = option.icon
              const isActive = activeTheme === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-label={`Use ${option.label.toLowerCase()} theme`}
                  aria-pressed={isActive}
                  onClick={() => setTheme(option.value)}
                  className={cn(
                    "grid size-7 place-items-center text-muted-foreground transition-colors hover:bg-background/20 hover:text-foreground",
                    isActive && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  )}
                >
                  <Icon weight={isActive ? "fill" : "duotone"} className="size-3.5" />
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}

export { SiteNavbar }
