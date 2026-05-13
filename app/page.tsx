"use client"

import { ArrowUpRight, BracketsCurly, Cpu, DownloadSimple } from "@phosphor-icons/react"
import { motion, type Variants } from "framer-motion"

import { SiteNavbar } from "@/components/site-navbar"
import { useSplashReady } from "@/components/splash-ready"
import { Button } from "@/components/ui/button"

const stackItems = ["React", "Next.js", "TypeScript", "Node.js", "NestJS", "Docker"]
const metrics = [
  ["35%", "load-time reduction"],
  ["95", "lighthouse score"],
  ["10+", "delivered products"],
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

const rightCardVariants: Variants = {
  hidden: { opacity: 0, x: 46, scale: 0.98, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.78, ease: "easeOut", delay: 0.34 },
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

export default function Page() {
  const isSplashReady = useSplashReady()

  return (
    <main id="home" className="min-h-svh overflow-x-clip">
      <SiteNavbar />

      <section className="mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-6xl flex-col justify-center px-4 py-16 sm:py-20">
        <motion.div
          className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end"
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
              <motion.p className="font-mono text-sm text-primary" variants={itemVariants}>
                Full Stack Engineer
              </motion.p>
              <motion.h1
                className="max-w-4xl text-balance font-heading text-5xl font-semibold leading-[0.98] sm:text-6xl lg:text-7xl"
                variants={itemVariants}
              >
                Mohamed Elgedawy builds fast, reliable web products.
              </motion.h1>
              <motion.p
                className="max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg"
                variants={itemVariants}
              >
                I design and ship production-ready applications with React, Next.js, TypeScript, Node.js,
                Docker, CI/CD, and clean frontend systems focused on performance and SEO.
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
                  className="border border-border/70 bg-transparent px-3 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur-xl"
                  variants={itemVariants}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.aside
            className="border border-border/70 bg-transparent p-4 font-mono text-xs text-muted-foreground shadow-[0_24px_80px_color-mix(in_oklch,var(--foreground)_6%,transparent)] backdrop-blur-xl"
            variants={rightCardVariants}
          >
            <div className="mb-4 flex items-center justify-between border-b border-border/70 pb-3">
              <div className="flex items-center gap-2 text-foreground">
                <Cpu weight="duotone" className="size-4 text-primary" />
                <span>profile.sh</span>
              </div>
              <span className="text-primary">active</span>
            </div>
            <div className="space-y-3 leading-6">
              <p>
                <span className="text-primary">$</span> whoami
              </p>
              <p className="pl-4 text-foreground">mohamed-elgedawy</p>
              <p>
                <span className="text-primary">$</span> cat focus.txt
              </p>
              <p className="pl-4">scalable-ui performance seo apis deployments</p>
              <p>
                <span className="text-primary">$</span> ls skills
              </p>
              <p className="flex flex-wrap gap-2 pl-4">
                <span>frontend</span>
                <span>backend</span>
                <span>cloud</span>
              </p>
            </div>
          </motion.aside>
        </motion.div>

        <motion.div
          id="work"
          className="mt-12 grid gap-3 border-t border-border/70 pt-6 sm:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isSplashReady ? "visible" : "hidden"}
        >
          {metrics.map(([value, label], index) => (
            <motion.div
              key={label}
              className="flex items-center gap-3 border border-border/70 bg-transparent p-4 backdrop-blur-xl"
              variants={topCardVariants}
              transition={{ delay: 0.68 + index * 0.1 }}
            >
              <BracketsCurly weight="duotone" className="size-5 text-primary" />
              <div>
                <p className="font-heading text-2xl font-semibold">{value}</p>
                <p className="font-mono text-xs text-muted-foreground">{label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  )
}
