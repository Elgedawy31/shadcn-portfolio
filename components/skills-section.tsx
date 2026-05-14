"use client"

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
  hidden: { opacity: 0, y: -24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: "easeOut" },
  },
}

const rowVariants: Variants = {
  hidden: { opacity: 0, x: 26, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: "easeOut" },
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
        whileInView={isSplashReady ? "visible" : "hidden"}
        viewport={{ once: true, amount: 0.18 }}
      >
        <motion.div className="max-w-3xl space-y-6" variants={headerVariants}>
          <div className="flex items-center gap-4">
            <span className="shrink-0 font-mono text-[0.65rem] font-medium tracking-[0.22em] text-muted-foreground uppercase">
              Stack map
            </span>
            <span
              className="h-px min-w-8 flex-1 bg-linear-to-r from-border via-border/70 to-transparent"
              aria-hidden
            />
          </div>
          <div className="space-y-4 sm:space-y-5">
            <h2
              id="skills-heading"
              className="bg-linear-to-br from-foreground via-primary to-foreground/55 bg-clip-text font-heading text-3xl font-semibold tracking-tight text-transparent sm:text-4xl"
            >
              Tools I ship with
            </h2>
            <div className="border-l-2 border-primary/35 pl-3 sm:pl-4">
              <p className="font-mono text-xs leading-relaxed tracking-wide text-pretty text-muted-foreground sm:text-[0.8125rem] sm:leading-relaxed">
                Production stack and tooling, grouped by domain—frontend through
                data and platform.
              </p>
            </div>
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
                className="grid gap-5 border-b border-border/35 py-9 last:border-b-0 sm:gap-6 sm:py-10 lg:grid-cols-[2.25rem_minmax(0,16rem)_minmax(0,1fr)] lg:items-start lg:gap-x-10 lg:gap-y-0 lg:py-11"
              >
                <span
                  className="hidden font-mono text-xs tracking-widest text-muted-foreground/55 tabular-nums lg:block lg:pt-1"
                  aria-hidden
                >
                  {indexLabel}
                </span>
                <div className="flex min-w-0 flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Icon
                      weight="regular"
                      className="size-5 shrink-0 text-primary sm:size-6"
                      aria-hidden
                    />
                    <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                      {group.title}
                    </h3>
                  </div>
                  <p className="max-w-prose text-sm leading-relaxed text-pretty text-muted-foreground sm:text-[0.9375rem]">
                    {group.blurb}
                  </p>
                </div>
                <ul
                  className="grid min-w-0 list-none grid-cols-1 gap-x-6 gap-y-2.5 md:grid-cols-3 md:gap-x-8 lg:pt-1"
                  aria-label={`${group.title} technologies`}
                >
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex min-w-0 items-baseline gap-1 font-mono text-[0.8125rem] leading-snug sm:text-sm"
                    >
                      <span
                        aria-hidden
                        className="shrink-0 text-primary/75 select-none"
                      >
                        {"</ "}
                      </span>
                      <span className="min-w-0 font-sans text-[0.9375rem] text-foreground/90 sm:text-base">
                        {skill}
                      </span>
                      <span
                        aria-hidden
                        className="shrink-0 text-primary/75 select-none"
                      >
                        {" >"}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export { SkillsSection }
