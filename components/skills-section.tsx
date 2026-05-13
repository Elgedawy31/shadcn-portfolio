"use client"

import { ArrowUpRight } from "@phosphor-icons/react"
import { motion, type Variants } from "framer-motion"

import { skillGroups } from "@/lib/skills-data"
import { useSplashReady } from "@/components/splash-ready"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.08, staggerChildren: 0.06 },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const rowVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
}

function SkillsSection() {
  const isSplashReady = useSplashReady()

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="mx-auto w-full max-w-7xl border-t border-border/70 px-4 py-16 sm:py-20"
    >
      <motion.div
        className="space-y-12 sm:space-y-14"
        variants={containerVariants}
        initial="hidden"
        animate={isSplashReady ? "visible" : "hidden"}
      >
        <motion.div className="max-w-2xl space-y-6" variants={headerVariants}>
          <div className="flex items-center gap-4">
            <span className="shrink-0 font-mono text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Stack map
            </span>
            <span className="h-px min-w-8 flex-1 bg-gradient-to-r from-border via-border/80 to-transparent" aria-hidden />
          </div>
          <div className="space-y-3">
            <h2 id="skills-heading" className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Tools I ship with
            </h2>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Grouped the way work actually lands—aligned with the roles and timeline in my{" "}
              <a
                href="/mohamed-elgedawy-fullStack.pdf"
                className="inline-flex items-center gap-1 font-medium text-foreground underline decoration-primary/45 underline-offset-[5px] transition-colors hover:text-primary hover:decoration-primary"
              >
                résumé (PDF)
                <ArrowUpRight weight="bold" className="size-4 shrink-0 text-primary/80" aria-hidden />
              </a>
              .
            </p>
          </div>
        </motion.div>

        <div className="border-t border-border/50">
          {skillGroups.map((group, index) => {
            const Icon = group.Icon
            const indexLabel = String(index + 1).padStart(2, "0")

            return (
              <motion.article
                key={group.title}
                variants={rowVariants}
                transition={{ delay: 0.04 * index }}
                className="grid gap-6 border-b border-border/35 py-9 last:border-b-0 sm:gap-8 sm:py-10 lg:grid-cols-[auto_minmax(0,12rem)_minmax(0,1fr)] lg:items-start lg:gap-x-10 lg:gap-y-2 lg:py-11"
              >
                <span
                  className="font-mono text-xs tabular-nums tracking-widest text-muted-foreground/60 lg:pt-1"
                  aria-hidden
                >
                  {indexLabel}
                </span>
                <div className="flex min-w-0 flex-col gap-3 lg:max-w-none">
                  <div className="flex items-center gap-3">
                    <Icon weight="regular" className="size-5 shrink-0 text-primary sm:size-6" aria-hidden />
                    <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                      {group.title}
                    </h3>
                  </div>
                  <p className="max-w-prose text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                    {group.blurb}
                  </p>
                </div>
                <div className="min-w-0 lg:pt-1">
                  <p className="text-pretty text-sm leading-7 text-foreground/90 sm:text-base sm:leading-8">
                    <span className="sr-only">{group.title} technologies: </span>
                    {group.skills.join(" · ")}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export { SkillsSection }
