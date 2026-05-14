"use client"

import { ArrowUpRight } from "@phosphor-icons/react"
import { motion, type Variants } from "framer-motion"
import Image from "next/image"

import { useSplashReady } from "@/components/splash-ready"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { projectEntries } from "@/lib/projects-data"

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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
}

function ProjectPreview({ index, title }: { index: number; title: string }) {
  if (title === "Auto Power") {
    return <AutoPowerPreview />
  }

  const rows = ["w-4/5", "w-2/3", "w-3/5"]
  const tiles = index === 0 ? 5 : index === 1 ? 4 : 6

  return (
    <div className="relative h-full min-h-[19rem] overflow-hidden bg-muted/20 sm:min-h-[22rem]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--border)_50%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_50%,transparent)_1px,transparent_1px)] bg-size-[52px_52px] opacity-30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,color-mix(in_oklch,var(--primary)_24%,transparent),transparent_32%),linear-gradient(180deg,transparent_0%,color-mix(in_oklch,var(--background)_82%,transparent)_100%)]"
      />

      <div className="absolute inset-x-5 top-5 flex items-center justify-between rounded-t-xl border border-b-0 border-border/55 bg-background/80 px-4 py-3 shadow-sm backdrop-blur-xl">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-primary/80" />
          <span className="size-2 rounded-full bg-muted-foreground/35" />
          <span className="size-2 rounded-full bg-muted-foreground/20" />
        </div>
        <span className="font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase">
          {title}
        </span>
      </div>

      <div className="absolute inset-x-5 top-[4.25rem] bottom-5 rounded-b-xl border border-border/55 bg-background/82 p-4 shadow-[0_24px_90px_color-mix(in_oklch,var(--foreground)_10%,transparent)] backdrop-blur-xl transition-transform duration-500 group-hover:scale-[1.04]">
        <div className="grid h-full gap-3 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.78fr)]">
          <div className="min-h-0 overflow-hidden rounded-lg border border-border/45 bg-muted/20 p-3">
            <div className="mb-4 h-7 w-1/2 rounded-sm bg-foreground/12" />
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: tiles }).map((_, tileIndex) => (
                <div
                  key={tileIndex}
                  className="min-h-20 rounded-md border border-border/40 bg-background/75 p-2"
                >
                  <div className="mb-2 aspect-[16/9] rounded-sm bg-linear-to-br from-primary/20 via-muted/50 to-foreground/10" />
                  <div className="h-2 w-4/5 rounded-full bg-foreground/14" />
                  <div className="mt-1.5 h-2 w-1/2 rounded-full bg-muted-foreground/16" />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden min-h-0 flex-col justify-between rounded-lg border border-border/45 bg-background/70 p-4 md:flex">
            <div className="space-y-3">
              <div className="h-8 w-8 rounded-md border border-primary/35 bg-primary/12" />
              {rows.map((width) => (
                <div
                  key={width}
                  className={`${width} h-2.5 rounded-full bg-muted-foreground/18`}
                />
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-9 rounded-md bg-primary/85" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-7 rounded-md border border-border/45 bg-muted/20" />
                <div className="h-7 rounded-md border border-border/45 bg-muted/20" />
                <div className="h-7 rounded-md border border-border/45 bg-muted/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AutoPowerPreview() {
  return (
    <div className="relative h-full min-h-[19rem] overflow-hidden bg-[#ececec] sm:min-h-[22rem]">
      <Image
        src="/projects/auto-power-showcase.png"
        alt="Auto Power car dealership platform screenshot"
        fill
        sizes="(min-width: 1280px) 50vw, 100vw"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.07]"
        priority={false}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/45 to-transparent"
      />
    </div>
  )
}

function ProjectsSection() {
  const isSplashReady = useSplashReady()

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto w-full max-w-7xl border-t border-border/70 px-4 py-16 sm:py-20"
    >
      <motion.div
        className="space-y-12 sm:space-y-14"
        variants={containerVariants}
        initial="hidden"
        animate={isSplashReady ? "visible" : "hidden"}
      >
        <motion.div className="max-w-3xl space-y-6" variants={headerVariants}>
          <div className="flex items-center gap-4">
            <span className="shrink-0 font-mono text-[0.65rem] font-medium tracking-[0.22em] text-muted-foreground uppercase">
              Selected builds
            </span>
            <span
              className="h-px min-w-8 flex-1 bg-linear-to-r from-border via-border/70 to-transparent"
              aria-hidden
            />
          </div>
          <div className="space-y-4 sm:space-y-5">
            <h2
              id="projects-heading"
              className="bg-linear-to-br from-foreground via-primary to-foreground/55 bg-clip-text font-heading text-3xl font-semibold tracking-tight text-transparent sm:text-4xl"
            >
              Projects with real product weight
            </h2>
            <div className="border-l-2 border-primary/35 pl-3 sm:pl-4">
              <p className="font-mono text-xs leading-relaxed tracking-wide text-pretty text-muted-foreground sm:text-[0.8125rem] sm:leading-relaxed">
                Marketplace, CRM, and enterprise systems from the résumé,
                presented as case-study ready work.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-5 xl:grid-cols-2">
          {projectEntries.map((project, index) => {
            const projectNumber = String(index + 1).padStart(2, "0")

            return (
              <Dialog key={project.title}>
                <DialogTrigger asChild>
                  <motion.button
                    type="button"
                    variants={cardVariants}
                    transition={{ delay: 0.04 * index }}
                    className="group relative flex min-h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/55 bg-background/88 text-left shadow-sm ring-1 ring-border/20 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <div className="relative border-b border-border/45">
                      <ProjectPreview index={index} title={project.title} />
                    </div>

                    <div className="flex flex-col gap-5 p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-5">
                        <div className="min-w-0 space-y-2">
                          <p className="font-mono text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
                            {project.category}
                          </p>
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="font-mono text-sm tracking-widest text-muted-foreground/70 tabular-nums">
                              {projectNumber}
                            </span>
                            <h3 className="min-w-0 font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground">
                              {project.title}
                            </h3>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <span className="hidden font-mono text-[0.68rem] tracking-[0.14em] text-primary uppercase sm:inline-flex">
                            Details
                          </span>
                          <div className="grid size-11 place-items-center rounded-full border border-border/55 bg-muted/20">
                            <ArrowUpRight
                              weight="bold"
                              className="size-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 border-t border-border/35 pt-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-border/55 bg-muted/15 px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.button>
                </DialogTrigger>

                <DialogContent className="overflow-y-auto p-0">
                  <div className="grid lg:grid-cols-[minmax(0,1.12fr)_minmax(23rem,0.88fr)]">
                    <div className="relative min-h-[18rem] border-b border-border/55 bg-muted/20 lg:min-h-[34rem] lg:border-r lg:border-b-0">
                      {project.title === "Auto Power" ? (
                        <Image
                          src="/projects/auto-power-showcase.png"
                          alt="Auto Power car dealership platform screenshot"
                          fill
                          sizes="(min-width: 1024px) 58vw, 100vw"
                          className="object-contain"
                          priority={false}
                        />
                      ) : (
                        <ProjectPreview index={index} title={project.title} />
                      )}
                    </div>

                    <div className="space-y-7 p-6 sm:p-8">
                      <DialogHeader>
                        <p className="font-mono text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
                          {project.category}
                        </p>
                        <DialogTitle>{project.title}</DialogTitle>
                        <DialogDescription>{project.summary}</DialogDescription>
                      </DialogHeader>

                      <p className="border-l border-primary/35 pl-3 font-mono text-xs leading-relaxed text-pretty text-foreground/80">
                        {project.impact}
                      </p>

                      <div className="space-y-3">
                        <p className="font-mono text-[0.65rem] tracking-[0.16em] text-muted-foreground uppercase">
                          Delivery notes
                        </p>
                        <ul className="space-y-2.5 border-t border-border/35 pt-4">
                          {project.highlights.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
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

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-border/55 bg-muted/15 px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )
          })}
        </div>

        <motion.div
          variants={cardVariants}
          className="flex flex-col gap-4 border-t border-border/45 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground sm:text-[0.9375rem]">
            These are the headline builds from the résumé. Public links can be
            connected later when the live URLs and repository targets are ready.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-10 w-fit border-border/70 bg-transparent px-4"
          >
            <a
              href="https://github.com/Elgedawy31"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
              <ArrowUpRight weight="bold" className="size-4" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export { ProjectsSection }
