"use client"

import * as React from "react"
import {
  ArrowUpRight,
  Briefcase,
  DownloadSimple,
  Gauge,
  HandWaving,
  Package,
  PlugsConnected,
} from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

import { LinuxWorkstation } from "@/components/linux-workstation"
import { useSplashReady } from "@/components/splash-ready"
import { Button } from "@/components/ui/button"

const stackItems = ["React", "Next.js", "TypeScript", "Node.js", "NestJS", "Docker"]
const roleTitles = ["Frontend Engineer", "Backend Engineer", "Full Stack Engineer", "DevOps Engineer"]

const metrics: readonly {
  value: string
  label: string
  hint: string
  Icon: Icon
  featured?: boolean
  /** Tailwind grid placement (bento on lg, readable stack on sm). */
  gridClass: string
}[] = [
  {
    value: "3+",
    label: "Years in production",
    hint: "Shipping full-stack & cloud-backed apps end to end.",
    Icon: Briefcase,
    featured: true,
    gridClass: "sm:col-span-2 lg:col-span-5 lg:row-span-2",
  },
  {
    value: "98+",
    label: "Lighthouse performance",
    hint: "Performance-first builds; strong scores on real audit runs.",
    Icon: Gauge,
    gridClass: "lg:col-span-4 lg:col-start-6 lg:row-start-1",
  },
  {
    value: "20+",
    label: "Products delivered",
    hint: "MVPs, internal tools, and customer-facing releases.",
    Icon: Package,
    gridClass: "lg:col-span-3 lg:col-start-10 lg:row-start-1",
  },
  {
    value: "15+",
    label: "APIs & integrations",
    hint: "REST, GraphQL, webhooks, and third-party platform work.",
    Icon: PlugsConnected,
    gridClass: "sm:col-span-2 lg:col-span-7 lg:col-start-6 lg:row-start-2",
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.09,
    },
  },
}

const leftPanelVariants: Variants = {
  hidden: { opacity: 0, x: -46, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.18,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: "easeOut" },
  },
}

const topCardVariants: Variants = {
  hidden: { opacity: 0, y: -28, scale: 0.98, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: "easeOut" },
  },
}

function TypewriterTitle({ isActive }: { isActive: boolean }) {
  const [roleIndex, setRoleIndex] = React.useState(0)
  const [visibleLetters, setVisibleLetters] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const currentRole = roleTitles[roleIndex]

  React.useEffect(() => {
    if (!isActive) {
      return
    }

    const isComplete = visibleLetters === currentRole.length
    const isEmpty = visibleLetters === 0
    const delay = isComplete && !isDeleting ? 1200 : isEmpty && isDeleting ? 240 : isDeleting ? 34 : 58

    const timer = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true)
        return
      }

      if (isEmpty && isDeleting) {
        setIsDeleting(false)
        setRoleIndex((currentIndex) => (currentIndex + 1) % roleTitles.length)
        return
      }

      setVisibleLetters((currentLetters) => currentLetters + (isDeleting ? -1 : 1))
    }, delay)

    return () => {
      window.clearTimeout(timer)
    }
  }, [currentRole.length, isActive, isDeleting, visibleLetters])

  return (
    <span className="inline-flex min-h-8 items-center font-mono text-lg text-muted-foreground sm:text-xl">
      <span className="text-primary">const</span>
      <span className="mx-2 text-foreground">role</span>
      <span className="text-muted-foreground">=</span>
      <span className="ml-2 text-foreground">&quot;{currentRole.slice(0, visibleLetters)}&quot;</span>
      <span className="ml-1 h-6 w-2 animate-pulse bg-primary" />
    </span>
  )
}

function HeroSection() {
  const isSplashReady = useSplashReady()
  const reduceMotion = useReducedMotion()

  return (
    <section className="mx-auto flex  w-full max-w-7xl flex-col justify-center px-4 py-16 sm:py-20">
      <motion.div
        className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_34rem] lg:items-center xl:grid-cols-[minmax(0,1fr)_38rem]"
        variants={containerVariants}
        initial="hidden"
        animate={isSplashReady ? "visible" : "hidden"}
      >
        <motion.div className="min-w-0 space-y-8" variants={leftPanelVariants}>
          <motion.div
            className="inline-flex items-center gap-2 border border-border/70 bg-transparent px-3 py-2 font-mono text-xs text-muted-foreground backdrop-blur-xl"
            variants={itemVariants}
          >
            <span className="size-2 bg-primary" />
            <span>~/home/mohamed/portfolio</span>
          </motion.div>

          <motion.div className="max-w-4xl space-y-5" variants={containerVariants}>
            <motion.p
              className="flex items-center gap-2.5 font-mono text-xl text-primary"
              variants={itemVariants}
            >
              <motion.span
                aria-hidden
                className="inline-flex shrink-0 origin-[70%_85%]"
                animate={
                  reduceMotion
                    ? undefined
                    : { rotate: [0, 16, -12, 14, -10, 8, 0] }
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut",
                }}
              >
                <HandWaving weight="regular" className="size-5 text-primary sm:size-8" />
              </motion.span>
              <span>Hey, I&apos;m</span>
            </motion.p>
            <div className="space-y-3">
              <motion.h1
                className="max-w-3xl text-balance font-heading text-4xl font-semibold leading-none sm:text-5xl lg:text-6xl"
                variants={itemVariants}
              >
                Mohamed Elgedawy
              </motion.h1>
              <motion.p
                className="max-w-3xl text-balance text-lg font-medium leading-8 text-muted-foreground sm:text-xl"
                variants={itemVariants}
              >
                <TypewriterTitle isActive={isSplashReady} />
              </motion.p>
            </div>
            <motion.p
              className="max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg"
              variants={itemVariants}
            >
              I design and ship production-ready applications across frontend, backend, full-stack, and
              DevOps workflows with a focus on performance, SEO, and scalable architecture.
            </motion.p>
          </motion.div>

          <motion.div className="flex flex-wrap items-center gap-3" variants={itemVariants}>
            <motion.div>
              <Button asChild size="lg" className="h-10 px-4">
                <a href="/mohamed-elgedawy-fullStack.pdf">
                  <DownloadSimple weight="bold" className="size-4" />
                  Download resume
                </a>
              </Button>
            </motion.div>
            <motion.div>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-10 border-border/70 bg-transparent px-4 backdrop-blur-xl"
              >
                <a href="https://github.com/Elgedawy31" target="_blank" rel="noreferrer">
                  View GitHub
                  <ArrowUpRight weight="bold" className="size-4" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div className="flex flex-wrap gap-2" variants={containerVariants}>
            {stackItems.map((item) => (
              <motion.span
                key={item}
                variants={itemVariants}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -2, scale: 1.03, transition: { type: "spring", stiffness: 420, damping: 24 } }
                }
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="group relative inline-flex cursor-default select-none overflow-hidden hover:translate-1 duration-300 ease-out border border-border/60 bg-muted/15 px-3.5 py-2 font-mono text-xs text-muted-foreground shadow-sm backdrop-blur-sm transition-[border-color,background-color,color,box-shadow] hover:border-primary/45 hover:bg-primary/8 hover:text-foreground hover:shadow-md motion-reduce:transition-colors"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-primary/20 to-transparent transition-transform duration-900 ease-out group-hover:translate-x-full motion-reduce:hidden"
                />
                <span className="relative z-10">{item}</span>
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <LinuxWorkstation />
      </motion.div>

      <motion.div
        id="work"
        className="mt-14 space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate={isSplashReady ? "visible" : "hidden"}
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-1 border-t border-border/60 pt-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="space-y-1">
            <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Snapshot
            </p>
            <p className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              What working with me tends to look like
            </p>
          </div>
          <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:text-right">
            Numbers are directional—every engagement is scoped to your stack, users, and constraints.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-2xl border border-border/50 bg-linear-to-br from-muted/40 via-background/80 to-background p-px shadow-[0_1px_0_0_oklch(1_0_0/6%)_inset] backdrop-blur-xl dark:shadow-[0_1px_0_0_oklch(1_0_0/8%)_inset]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-0 size-72 rounded-full bg-primary/12 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 bottom-0 size-56 rounded-full bg-primary/8 blur-3xl"
          />
          <div className="relative grid auto-rows-fr gap-px rounded-[calc(var(--radius-2xl)-1px)] bg-border/55 p-px sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2">
            {metrics.map(({ value, label, hint, Icon, featured, gridClass }, index) => (
              <motion.div
                key={label}
                variants={topCardVariants}
                transition={{ delay: 0.68 + index * 0.08 }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -2, transition: { type: "spring", stiffness: 420, damping: 28 } }
                }
                whileTap={reduceMotion ? undefined : { scale: 0.995 }}
                className={`group relative flex min-h-[9.5rem] cursor-default flex-col justify-between overflow-hidden bg-background/90 p-5 sm:min-h-0 sm:p-6 lg:min-h-[10.5rem] ${gridClass} ${
                  featured ? "sm:flex-row sm:items-stretch sm:gap-8" : ""
                }`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-radial-[circle_at_50%_0%] from-primary/16 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:opacity-0"
                />
                <div
                  className={
                    featured
                      ? "relative z-10 flex flex-1 flex-col justify-between gap-6"
                      : "relative z-10 flex flex-1 flex-col justify-between gap-5"
                  }
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/25 px-2.5 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-primary ring-[3px] ring-primary/25" />
                      {featured ? "Tenure" : "Signal"}
                    </span>
                    <Icon
                      weight="duotone"
                      className={
                        featured
                          ? "size-8 shrink-0 text-primary/90 sm:size-9"
                          : "size-7 shrink-0 text-primary/85"
                      }
                      aria-hidden
                    />
                  </div>
                  <div className="space-y-2">
                    <p
                      className={
                        featured
                          ? "font-heading text-4xl font-semibold tabular-nums tracking-tighter text-foreground sm:text-5xl"
                          : "font-heading text-3xl font-semibold tabular-nums tracking-tight text-foreground sm:text-[2.1rem] sm:leading-none"
                      }
                    >
                      {value}
                    </p>
                    <p className="font-heading text-sm font-medium text-foreground sm:text-base">{label}</p>
                    <p className="max-w-prose text-pretty text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {hint}
                    </p>
                  </div>
                </div>
                {featured ? (
                  <div className="relative z-10 mt-6 hidden h-full min-w-[40%] flex-col justify-end border-t border-dashed border-border/60 pt-6 font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground sm:mt-0 sm:flex sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                    <p className="text-balance">
                      Production ownership across UI, APIs, infra, and release hygiene—not slide-deck
                      estimates.
                    </p>
                  </div>
                ) : null}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export { HeroSection }
