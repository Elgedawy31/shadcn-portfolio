import { BracketsCurly, Car } from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"

export type ProjectEntry = {
  title: string
  category: string
  status: string
  summary: string
  impact: string
  tags: readonly string[]
  highlights: readonly string[]
  Icon: Icon
}

/**
 * Featured projects aligned with `public/mohamed-elgedawy-fullStack.pdf`.
 * Add image URLs here later when project visuals are ready.
 */
export const projectEntries: readonly ProjectEntry[] = [
  {
    title: "Auto Power",
    category: "Car Dealership & CRM Platform",
    status: "Live",
    summary:
      "A full-stack car listings and CRM system for inventory, customer operations, APIs, and reliable deployment.",
    impact:
      "Dealership operations connected through listings, CRM workflows, and production-ready infrastructure.",
    tags: ["CRM", "Listings", "Docker", "CI/CD"],
    highlights: [
      "Built the platform across frontend and backend, including API design and data management.",
      "Dockerized the application for consistent delivery across environments.",
      "Implemented CI/CD pipelines to improve deployment reliability and release speed.",
    ],
    Icon: Car,
  },
  {
    title: "Fofodio Platform",
    category: "Enterprise ERP/CRM Platform",
    status: "GitHub",
    summary:
      "A modular enterprise platform with admin, CRM, communication, backend services, and deployment workflows.",
    impact:
      "Large-scale business modules structured for maintainable frontend and backend development.",
    tags: ["ERP", "CRM", "Monorepo", "Module federation"],
    highlights: [
      "Built enterprise modules including admin panel, CRM, and communication workflows.",
      "Structured frontend delivery with monorepo architecture and Vite module federation.",
      "Designed backend services and Docker-based deployment pipelines for complex business workflows.",
    ],
    Icon: BracketsCurly,
  },
]
