"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"

import { skillGroups } from "@/lib/skills-data"
import { useSplashReady } from "@/components/splash-ready"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.12, staggerChildren: 0.08 },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut" },
  },
}

function SkillsSection() {
  const isSplashReady = useSplashReady()
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="mx-auto w-full max-w-7xl border-t border-border/70 px-4 py-16 sm:py-20"
    >
      <motion.div
        className="space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate={isSplashReady ? "visible" : "hidden"}
      >
        <motion.div className="max-w-2xl space-y-4" variants={headerVariants}>
          <p className="font-mono text-sm text-primary">~/skills</p>
          <div className="space-y-3">
            <h2 id="skills-heading" className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Tools I ship with
            </h2>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              A concise map of the stack behind production apps—mirroring the full timeline and roles in{" "}
              <a
                href="/mohamed-elgedawy-fullStack.pdf"
                className="font-mono text-foreground underline decoration-primary/50 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
              >
                my résumé (PDF)
              </a>
              .
            </p>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, index) => {
            const Icon = group.Icon

            return (
              <motion.article
                key={group.title}
                variants={cardVariants}
                transition={{ delay: 0.08 * index }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -3, transition: { type: "spring", stiffness: 360, damping: 24 } }
                }
                className="group relative flex flex-col overflow-hidden rounded-lg border border-border/60 bg-muted/15 p-5 shadow-sm backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-primary/40 hover:bg-primary/6 hover:shadow-md motion-reduce:transition-colors"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-primary/12 to-transparent opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:translate-x-full group-hover:opacity-100 motion-reduce:hidden"
                />
                <div className="relative z-10 flex flex-1 flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-md border border-border/60 bg-background/60">
                      <Icon weight="duotone" className="size-5 text-primary" aria-hidden />
                    </span>
                    <div className="min-w-0 space-y-1">
                      <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                        {group.title}
                      </h3>
                      <p className="text-pretty text-xs leading-relaxed text-muted-foreground">{group.blurb}</p>
                    </div>
                  </div>
                  <ul className="flex flex-wrap gap-2" aria-label={`${group.title} technologies`}>
                    {group.skills.map((skill) => (
                      <li key={skill}>
                        <span className="inline-flex border border-border/50 bg-background/40 px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground transition-colors group-hover:border-primary/25 group-hover:text-foreground">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
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
