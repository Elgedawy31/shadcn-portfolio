import type { Icon } from "@phosphor-icons/react"
import { Cloud, Code, Cpu, Database } from "@phosphor-icons/react"

export type SkillGroup = {
  title: string
  blurb: string
  Icon: Icon
  skills: readonly string[]
}

/** Grouped skills aligned with the public résumé PDF — edit here to stay in sync. */
export const skillGroups: readonly SkillGroup[] = [
  {
    title: "Frontend",
    blurb: "Interfaces, design systems, and web performance.",
    Icon: Code,
    skills: ["React", "Next.js", "TypeScript", "React Native", "Tailwind CSS", "SEO"],
  },
  {
    title: "Backend",
    blurb: "APIs, services, and integration layers.",
    Icon: Cpu,
    skills: ["Node.js", "NestJS", "Express.js", "REST", "GraphQL", "WebSockets"],
  },
  {
    title: "Data",
    blurb: "Persistence, modeling, and data access.",
    Icon: Database,
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Prisma", "Redis"],
  },
  {
    title: "Platform & DevOps",
    blurb: "Shipping, observability, and cloud operations.",
    Icon: Cloud,
    skills: ["Docker", "Kubernetes", "CI/CD", "Nginx", "AWS", "Azure", "Linux"],
  },
]
