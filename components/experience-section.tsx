"use client"

import { Buildings } from "@phosphor-icons/react"
import { motion, type Variants } from "framer-motion"

import { useSplashReady } from "@/components/splash-ready"
import {
  experienceEntries,
  formatMonthYear,
  yearMonthToDateAttr,
} from "@/lib/experience-data"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.08, staggerChildren: 0.07 },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, x: -18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: "easeOut" },
  },
}

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: "easeOut" },
  },
}

function ExperienceSection() {
  const isSplashReady = useSplashReady()

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
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
              Career log
            </span>
            <span
              className="h-px min-w-8 flex-1 bg-linear-to-r from-border via-border/70 to-transparent"
              aria-hidden
            />
          </div>
          <div className="space-y-4 sm:space-y-5">
            <h2
              id="experience-heading"
              className="bg-linear-to-br from-foreground via-primary to-foreground/55 bg-clip-text font-heading text-3xl font-semibold tracking-tight text-transparent sm:text-4xl"
            >
              Where I have shipped
            </h2>
            <div className="border-l-2 border-primary/35 pl-3 sm:pl-4">
              <p className="font-mono text-xs leading-relaxed tracking-wide text-pretty text-muted-foreground sm:text-[0.8125rem] sm:leading-relaxed">
                Production roles across product companies and independent
                delivery—frontend through platform.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="relative w-full border-t border-border/50">
          <div
            className="pointer-events-none absolute top-0 left-[0.55rem] hidden h-full w-px bg-border/60 sm:left-[0.65rem] lg:left-[5.35rem]"
            aria-hidden
          />

          <ol className="relative list-none space-y-0">
            {experienceEntries.map((entry, index) => {
              const indexLabel = String(index + 1).padStart(2, "0")

              return (
                <motion.li
                  key={`${entry.company}-${entry.startLabel}`}
                  variants={rowVariants}
                  transition={{ delay: 0.04 * index }}
                  className="border-b border-border/35 py-9 last:border-b-0 sm:py-10 lg:py-11"
                >
                  <article className="grid gap-6 lg:grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] lg:gap-x-10 xl:grid-cols-[minmax(0,9rem)_minmax(0,1fr)]">
                    <div className="flex items-start gap-3 lg:flex-col lg:gap-3">
                      <span
                        className="mt-0.5 hidden font-mono text-xs tracking-widest text-muted-foreground/55 tabular-nums lg:block"
                        aria-hidden
                      >
                        {indexLabel}
                      </span>
                      <div className="relative flex min-w-0 flex-1 items-start gap-3 lg:block lg:space-y-2">
                        <span
                          className="relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full border border-primary/50 bg-background shadow-[0_0_0_4px] shadow-background sm:mt-2 lg:mt-0"
                          aria-hidden
                        />
                        <p className="font-mono text-[0.7rem] leading-snug tracking-wide text-muted-foreground sm:text-xs lg:pt-0.5">
                          <time
                            dateTime={yearMonthToDateAttr(entry.startLabel)}
                          >
                            {formatMonthYear(entry.startLabel)}
                          </time>
                          <span className="text-muted-foreground/45">
                            {" — "}
                          </span>
                          {entry.current || !entry.endLabel ? (
                            "Present"
                          ) : (
                            <time
                              dateTime={yearMonthToDateAttr(entry.endLabel)}
                            >
                              {formatMonthYear(entry.endLabel)}
                            </time>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="min-w-0 space-y-4 border-l border-border/40 pl-5 sm:pl-6 lg:border-l-0 lg:pl-0">
                      <div className="flex flex-wrap items-start gap-3">
                        <Buildings
                          weight="regular"
                          className="mt-0.5 size-5 shrink-0 text-primary sm:size-6"
                          aria-hidden
                        />
                        <div className="min-w-0 space-y-1">
                          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                            {entry.title}
                          </h3>
                          <p className="font-mono text-[0.7rem] leading-relaxed text-pretty text-muted-foreground sm:text-xs">
                            <span className="text-foreground/90">
                              {entry.company}
                            </span>
                            <span
                              aria-hidden
                              className="text-muted-foreground/50"
                            >
                              {" · "}
                            </span>
                            {entry.location}
                            <span
                              aria-hidden
                              className="text-muted-foreground/50"
                            >
                              {" · "}
                            </span>
                            {entry.arrangement}
                          </p>
                        </div>
                      </div>

                      <ul className="space-y-2.5 border-t border-border/35 pt-4 text-pretty sm:space-y-3 sm:pt-5">
                        {entry.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem] sm:leading-relaxed"
                          >
                            <span
                              className="mt-2 size-1 shrink-0 rounded-full bg-primary/70"
                              aria-hidden
                            />
                            <span className="min-w-0 text-foreground/85">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </motion.div>
    </section>
  )
}

export { ExperienceSection }
