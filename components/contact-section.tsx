"use client"

import * as React from "react"
import {
  Check,
  CheckCircle,
  CircleNotch,
  EnvelopeSimple,
} from "@phosphor-icons/react"
import { AnimatePresence, motion, type Variants } from "framer-motion"

import { useSplashReady } from "@/components/splash-ready"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CONTACT_EMAIL, socialProfileLinks } from "@/lib/contact-links"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.08, staggerChildren: 0.06 },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: "easeOut" },
  },
}

const columnVariants: Variants = {
  hidden: { opacity: 0, x: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: "easeOut" },
  },
}

function ContactSection() {
  const isSplashReady = useSplashReady()
  const id = React.useId()
  const nameId = `${id}-name`
  const emailId = `${id}-email`
  const messageId = `${id}-message`

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [copied, setCopied] = React.useState(false)
  const [pending, setPending] = React.useState(false)
  const [formNotice, setFormNotice] = React.useState<string | null>(null)
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!toastMessage) {
      return
    }

    const timer = window.setTimeout(() => setToastMessage(null), 3600)

    return () => window.clearTimeout(timer)
  }, [toastMessage])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormNotice(null)
    setToastMessage(null)

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)

    if (!trimmedName || !isValidEmail || !trimmedMessage) {
      setFormNotice("Please enter your name, a valid email, and a message.")
      return
    }

    setPending(true)

    await new Promise((resolve) => window.setTimeout(resolve, 1000))

    setPending(false)
    setFormNotice("Success: your message has been received.")
    setToastMessage("Message sent successfully.")
    setName("")
    setEmail("")
    setMessage("")
  }

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Hello Mohamed")}`

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto w-full max-w-7xl border-t border-border/70 px-4 py-16 sm:py-20"
    >
      <AnimatePresence>
        {toastMessage ? (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-4 bottom-4 z-50 flex max-w-[calc(100vw-2rem)] items-start gap-3 border border-primary/25 bg-background/96 px-4 py-3 shadow-[0_24px_80px_color-mix(in_oklch,var(--foreground)_16%,transparent)] backdrop-blur-xl sm:right-6 sm:bottom-6 sm:max-w-sm"
          >
            <CheckCircle
              weight="duotone"
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden
            />
            <span className="min-w-0 font-mono text-xs leading-relaxed text-foreground">
              {toastMessage}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
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
              Open channels
            </span>
            <span
              className="h-px min-w-8 flex-1 bg-linear-to-r from-border via-border/70 to-transparent"
              aria-hidden
            />
          </div>
          <div className="space-y-4 sm:space-y-5">
            <h2
              id="contact-heading"
              className="bg-linear-to-br from-foreground via-primary to-foreground/55 bg-clip-text font-heading text-3xl font-semibold tracking-tight text-transparent sm:text-4xl"
            >
              Let&apos;s build something solid
            </h2>
            <div className="border-l-2 border-primary/35 pl-3 sm:pl-4">
              <p className="font-mono text-xs leading-relaxed tracking-wide text-pretty text-muted-foreground sm:text-[0.8125rem] sm:leading-relaxed">
                Email is the fastest line in—profiles below for context. The
                form is ready to plug into an API when you want hosted
                submissions.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-10 border-t border-border/50 pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-12">
          <motion.div
            variants={columnVariants}
            className="flex flex-col gap-8 lg:sticky lg:top-24 lg:col-span-4 lg:self-start xl:top-28"
          >
            <div className="space-y-4">
              <p className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Direct
              </p>
              <a
                href={mailtoHref}
                className="block w-fit max-w-full font-mono text-sm leading-snug break-all text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline sm:text-base"
              >
                {CONTACT_EMAIL}
              </a>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="lg" className="h-9">
                  <a href={mailtoHref}>
                    <EnvelopeSimple
                      weight="duotone"
                      className="size-4"
                      aria-hidden
                    />
                    Compose
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-9 border-border/70 bg-transparent backdrop-blur-xl"
                  onClick={() => {
                    void copyEmail()
                  }}
                >
                  {copied ? (
                    <>
                      <Check
                        weight="bold"
                        className="size-4 text-primary"
                        aria-hidden
                      />
                      Copied
                    </>
                  ) : (
                    "Copy"
                  )}
                </Button>
              </div>
            </div>

            <div
              className="h-px w-full bg-linear-to-r from-border via-border/60 to-transparent"
              aria-hidden
            />

            <div className="space-y-3">
              <p className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Profiles
              </p>
              <nav aria-label="Social profiles" className="flex flex-col gap-1">
                {socialProfileLinks.map((link) => {
                  const Icon = link.Icon
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex w-fit items-center gap-2.5 py-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon
                        weight="duotone"
                        className="size-5 shrink-0 text-primary/90 transition-transform duration-200 group-hover:scale-105"
                        aria-hidden
                      />
                      <span className="border-b border-transparent pb-px transition-colors group-hover:border-primary/50">
                        {link.label}
                      </span>
                    </a>
                  )
                })}
              </nav>
            </div>
          </motion.div>

          <motion.div
            variants={columnVariants}
            className="min-w-0 lg:col-span-8"
          >
            <form
              onSubmit={(e) => {
                void handleSubmit(e)
              }}
              className="space-y-6 rounded-xl border border-border/55 bg-muted/5 p-6 shadow-sm ring-1 ring-border/20 backdrop-blur-sm sm:p-8"
              aria-label="Contact form"
              noValidate
            >
              <div className="flex flex-col gap-1 border-b border-border/40 pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    Send a message
                  </h3>
                  <p className="mt-1 max-w-md text-xs leading-relaxed text-pretty text-muted-foreground sm:text-sm">
                    Intro, scope, and timeline—I will respond from the address
                    on the left.
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground/90 uppercase">
                  Local demo
                </span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-1">
                  <Label
                    htmlFor={nameId}
                    className="font-mono text-[0.65rem] tracking-wider text-muted-foreground uppercase"
                  >
                    Name
                  </Label>
                  <Input
                    id={nameId}
                    name="name"
                    autoComplete="name"
                    value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="h-9 sm:text-sm"
                  disabled={pending}
                />
                </div>
                <div className="space-y-2 sm:col-span-1">
                  <Label
                    htmlFor={emailId}
                    className="font-mono text-[0.65rem] tracking-wider text-muted-foreground uppercase"
                  >
                    Email
                  </Label>
                  <Input
                    id={emailId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-9 sm:text-sm"
                  disabled={pending}
                />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={messageId}
                  className="font-mono text-[0.65rem] tracking-wider text-muted-foreground uppercase"
                >
                  Message
                </Label>
                <Textarea
                  id={messageId}
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What you are building, stack, and how I can help."
                  rows={5}
                  className="min-h-28 resize-y sm:text-sm"
                  disabled={pending}
                />
              </div>

              {formNotice ? (
                <p
                  role="status"
                  className="border border-border/60 bg-background/80 px-3 py-2 font-mono text-xs leading-relaxed text-pretty text-muted-foreground sm:text-[0.8125rem]"
                >
                  {formNotice}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  type="submit"
                  size="lg"
                  className="h-9 min-w-[7.5rem]"
                  disabled={pending}
                >
                  {pending ? (
                    <>
                      <CircleNotch
                        weight="bold"
                        className="size-4 animate-spin"
                        aria-hidden
                      />
                      Preparing
                    </>
                  ) : (
                    "Send"
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export { ContactSection }
