import type { Icon } from "@phosphor-icons/react"
import { GithubLogo, LinkedinLogo, WhatsappLogo } from "@phosphor-icons/react"

export const CONTACT_EMAIL = "mohamedelgedawy40@gmail.com" as const
export const WHATSAPP_URL = "https://wa.me/201003098950" as const

export type SocialProfileLink = {
  id: string
  label: string
  href: string
  Icon: Icon
}

/** GitHub + LinkedIn only — résumé and site live in the navbar / hero. */
export const socialProfileLinks: readonly SocialProfileLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Elgedawy31",
    Icon: GithubLogo,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohamed-elgedawy-780500242/",
    Icon: LinkedinLogo,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: WHATSAPP_URL,
    Icon: WhatsappLogo,
  },
]
