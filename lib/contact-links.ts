import type { Icon } from "@phosphor-icons/react"
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react"

export const CONTACT_EMAIL = "mohamedelgedawy40@gmail.com" as const

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
    href: "https://www.linkedin.com/in/mohamedelgedawy",
    Icon: LinkedinLogo,
  },
]
