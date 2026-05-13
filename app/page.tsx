"use client"

import * as React from "react"
import {
  ArrowUpRight,
  BracketsCurly,
  DownloadSimple,
  HardDrives,
  LockKey,
  TerminalWindow,
} from "@phosphor-icons/react"
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
const profileFacts = [
  ["role", "Full Stack Engineer"],
  ["location", "Egypt / Remote"],
  ["focus", "performance, SEO, scalable systems"],
  ["status", "open to new opportunities"],
]
const skillProgress = [
  ["React / Next.js", "94%"],
  ["TypeScript", "90%"],
  ["Node / NestJS", "86%"],
  ["Docker / CI", "78%"],
]
const terminalResponses: Record<string, string[]> = {
  help: ["commands:", "about, skills, contact, resume, status, clear"],
  about: ["Mohamed Elgedawy", "Full Stack Engineer building scalable React, Next.js, Node.js, and cloud-ready products."],
  skills: ["React / Next.js: 94%", "TypeScript: 90%", "Node / NestJS: 86%", "Docker / CI: 78%"],
  contact: ["email: mohamedelgedawy40@gmail.com", "linkedin: linkedin.com/in/mohamedelgedawy", "github: github.com/Elgedawy31"],
  resume: ["resume: /mohamed-elgedawy-fullStack.pdf"],
  status: ["open to new opportunities", "available for frontend, full-stack, and performance-focused product work"],
}

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

const terminalLineVariants: Variants = {
  hidden: { opacity: 0, x: 14, filter: "blur(6px)" },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.48, ease: "easeOut", delay: 0.58 + index * 0.07 },
  }),
}

function LinuxWorkstation() {
  const terminalOutputRef = React.useRef<HTMLDivElement>(null)
  const terminalInputRef = React.useRef<HTMLInputElement>(null)
  const isSplashReady = useSplashReady()
  const [command, setCommand] = React.useState("")
  const [history, setHistory] = React.useState([
    { command: "echo $STATUS", output: ["Open to new opportunities"] },
    { command: "help", output: terminalResponses.help },
  ])

  React.useEffect(() => {
    const terminalOutput = terminalOutputRef.current

    if (!terminalOutput) {
      return
    }

    terminalOutput.scrollTo({
      top: terminalOutput.scrollHeight,
      behavior: "smooth",
    })
  }, [history])

  React.useEffect(() => {
    if (!isSplashReady) {
      return
    }

    const focusTimer = window.setTimeout(() => {
      terminalInputRef.current?.focus()
    }, 450)

    return () => {
      window.clearTimeout(focusTimer)
    }
  }, [isSplashReady])

  function runCommand(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedCommand = command.trim().toLowerCase()

    if (!normalizedCommand) {
      return
    }

    if (normalizedCommand === "clear") {
      setHistory([])
      setCommand("")
      return
    }

    setHistory((currentHistory) => [
      ...currentHistory,
      {
        command: normalizedCommand,
        output: terminalResponses[normalizedCommand] ?? [
          `command not found: ${normalizedCommand}`,
          `type "help" for available commands`,
        ],
      },
    ])
    setCommand("")
  }

  return (
    <motion.aside
      className="relative min-h-[34rem] overflow-hidden border border-border/70 bg-background/20 font-mono text-xs text-muted-foreground shadow-[0_24px_90px_color-mix(in_oklch,var(--foreground)_7%,transparent)] backdrop-blur-xl lg:min-h-[39rem]"
      variants={rightCardVariants}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--border)_38%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_38%,transparent)_1px,transparent_1px)] bg-[size:42px_42px] opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_28%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent_42%),linear-gradient(to_bottom,color-mix(in_oklch,var(--background)_18%,transparent),color-mix(in_oklch,var(--background)_86%,transparent))]" />

      <div className="relative flex items-center justify-between border-b border-border/70 bg-background/30 px-4 py-3">
        <div className="flex items-center gap-2 text-foreground">
          <span className="size-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_12px_rgba(255,95,87,0.35)]" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e] shadow-[0_0_12px_rgba(255,189,46,0.3)]" />
          <span className="size-2.5 rounded-full bg-[#28c840] shadow-[0_0_12px_rgba(40,200,64,0.3)]" />
          <span className="ml-2">mohamed@portfolio:~</span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <LockKey weight="duotone" className="size-4 text-primary" />
          <span>ssh secure</span>
        </div>
      </div>

      <div className="relative grid gap-4 p-4">
        <motion.div
          className="border border-border/70 bg-background/35 p-4 shadow-[inset_0_1px_0_color-mix(in_oklch,var(--foreground)_8%,transparent)] backdrop-blur-xl"
          custom={0}
          variants={terminalLineVariants}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground">
              <TerminalWindow weight="duotone" className="size-4 text-primary" />
              <span>developer-profile</span>
            </div>
            <span className="border border-emerald-500/35 bg-emerald-500/10 px-2 py-1 text-emerald-500 shadow-[0_0_22px_rgba(16,185,129,0.14)]">
              Works
            </span>
          </div>
          <div className="space-y-2 leading-6">
            <p>
              <span className="text-primary">$</span> cat ./mohamed/summary.txt
            </p>
            <p className="pl-4 text-foreground">Full Stack Engineer focused on production-ready web apps.</p>
            <p>
              <span className="text-primary">$</span> grep --skills ./resume.md
            </p>
            <p className="pl-4">React Next.js TypeScript Node.js NestJS Docker PostgreSQL SEO</p>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-[1fr_0.85fr]">
          <motion.div
            className="border border-border/70 bg-background/30 p-4 backdrop-blur-xl"
            custom={1}
            variants={terminalLineVariants}
          >
            <div className="mb-3 flex items-center gap-2 text-foreground">
              <HardDrives weight="duotone" className="size-4 text-primary" />
              <span>profile.info</span>
            </div>
            <div className="space-y-2">
              {profileFacts.map(([name, value], index) => (
                <motion.div
                  key={name}
                  className="grid grid-cols-[4.5rem_1fr] items-start gap-3 border-b border-border/50 pb-2 last:border-b-0 last:pb-0"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.42, delay: 0.85 + index * 0.08 }}
                >
                  <span className="text-primary">{name}</span>
                  <span className="text-foreground">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="border border-border/70 bg-background/30 p-4 backdrop-blur-xl"
            custom={2}
            variants={terminalLineVariants}
          >
            <div className="mb-3 text-foreground">skills.progress</div>
            <div className="space-y-3">
              {skillProgress.map(([label, value], index) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex justify-between">
                    <span>{label}</span>
                    <span className="text-primary">{value}</span>
                  </div>
                  <div className="h-1.5 bg-muted">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: value }}
                      transition={{ duration: 0.75, delay: 0.98 + index * 0.08 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border border-border/70 bg-background/30 p-4 backdrop-blur-xl"
          custom={3}
          variants={terminalLineVariants}
        >
          <div className="mb-3 flex items-center justify-between text-foreground">
            <span>interactive-shell</span>
            <span className="text-muted-foreground">type help</span>
          </div>
          <div ref={terminalOutputRef} className="max-h-40 space-y-3 overflow-y-auto pr-1 leading-6">
            {history.map((entry, index) => (
              <div key={`${entry.command}-${index}`}>
                <p className="text-foreground">
                  <span className="text-primary">$</span> {entry.command}
                </p>
                {entry.output.map((line) => (
                  <p key={line} className="pl-4">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <form onSubmit={runCommand} className="mt-4 flex items-center gap-2 border-t border-border/70 pt-3">
            <span className="text-primary">$</span>
            <input
              ref={terminalInputRef}
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              aria-label="Portfolio terminal command"
              placeholder='Type "help" for commands...'
              className="min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/70"
            />
            <div className="h-5 w-2 animate-pulse bg-primary" />
          </form>
        </motion.div>
      </div>
    </motion.aside>
  )
}

export default function Page() {
  const isSplashReady = useSplashReady()

  return (
    <main id="home" className="min-h-svh overflow-x-clip">
      <SiteNavbar />

      <section className="mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-7xl flex-col justify-center px-4 py-16 sm:py-20">
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

          <LinuxWorkstation />
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
