"use client"

import * as React from "react"
import { HardDrives, LockKey, TerminalWindow } from "@phosphor-icons/react"
import { motion, type Variants } from "framer-motion"

import { useSplashReady } from "@/components/splash-ready"

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
  about: [
    "Mohamed Elgedawy",
    "Full Stack Engineer building scalable React, Next.js, Node.js, and cloud-ready products.",
  ],
  skills: [
    "React / Next.js: 94%",
    "TypeScript: 90%",
    "Node / NestJS: 86%",
    "Docker / CI: 78%",
  ],
  contact: [
    "email: mohamedelgedawy40@gmail.com",
    "linkedin: linkedin.com/in/mohamedelgedawy",
    "github: github.com/Elgedawy31",
  ],
  resume: ["resume: /mohamed-elgedawy-fullStack.pdf"],
  status: [
    "open to new opportunities",
    "available for frontend, full-stack, and performance-focused product work",
  ],
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
      className="relative min-h-[34rem] overflow-hidden border border-border/70 bg-background/20 font-mono text-xs text-muted-foreground backdrop-blur-xl lg:min-h-[39rem]"
      variants={rightCardVariants}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--border)_38%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_38%,transparent)_1px,transparent_1px)] bg-[size:42px_42px] opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_28%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent_42%),linear-gradient(to_bottom,color-mix(in_oklch,var(--background)_18%,transparent),color-mix(in_oklch,var(--background)_86%,transparent))]" />

      <div className="relative flex items-center justify-between border-b border-border/70 bg-background/30 px-4 py-3">
        <div className="flex items-center gap-2 text-foreground">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2">mohamed@portfolio:~</span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <LockKey weight="duotone" className="size-4 text-primary" />
          <span>ssh secure</span>
        </div>
      </div>

      <div className="relative grid gap-4 p-4">
        <motion.div
          className="border border-border/70 bg-background/35 p-4 backdrop-blur-xl"
          custom={0}
          variants={terminalLineVariants}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground">
              <TerminalWindow
                weight="duotone"
                className="size-4 text-primary"
              />
              <span>developer-profile</span>
            </div>
            <span className="border border-emerald-500/35 bg-emerald-500/10 px-2 py-1 text-emerald-500">
              Works
            </span>
          </div>
          <div className="space-y-2 leading-6">
            <p>
              <span className="text-primary">$</span> cat ./mohamed/summary.txt
            </p>
            <p className="pl-4 text-foreground">
              Full Stack Engineer focused on production-ready web apps.
            </p>
            <p>
              <span className="text-primary">$</span> grep --skills ./resume.md
            </p>
            <p className="pl-4">
              React Next.js TypeScript Node.js NestJS Docker PostgreSQL SEO
            </p>
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
                  <span className="text-muted-foreground">{name}</span>
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
                      transition={{
                        duration: 0.75,
                        delay: 0.98 + index * 0.08,
                      }}
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
          <div
            ref={terminalOutputRef}
            className="max-h-40 space-y-3 overflow-y-auto pr-1 leading-6"
          >
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
          <form
            onSubmit={runCommand}
            className="mt-4 flex items-center gap-2 border-t border-border/70 pt-3"
          >
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

export { LinuxWorkstation }
