import { BracketsCurly, Car, Leaf, Scissors } from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"

export type ProjectEntry = {
  title: string
  category: string
  status: string
  summary: string
  impact: string
  liveUrl?: string
  repoLinks?: readonly {
    label: string
    href: string
  }[]
  imageSrc?: string
  imageAlt?: string
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
    liveUrl: "https://autopower.sa",
    imageSrc: "/projects/auto-power-showcase.png",
    imageAlt: "Auto Power car dealership platform screenshot",
    tags: ["Next.js", "TypeScript", "shadcn/ui", "CRM", "CI/CD"],
    highlights: [
      "Built the platform across frontend and backend, including API design and data management.",
      "Dockerized the application for consistent delivery across environments.",
      "Implemented CI/CD pipelines to improve deployment reliability and release speed.",
    ],
    Icon: Car,
  },
  {
    title: "CladCut",
    category: "Cladding Fabrication Software",
    status: "Live",
    summary:
      "Fast software for preparing cladding fabrication drawings with cleaner workflows, fewer errors, and better productivity.",
    impact:
      "Reduces drawing preparation time by 85% while improving fabrication accuracy for cladding teams.",
    liveUrl: "https://clad-cut.vercel.app/",
    imageSrc: "/projects/cladcut-showcase.png",
    imageAlt: "CladCut cladding fabrication software screenshot",
    tags: [
      "Next.js",
      "TypeScript",
      "shadcn/ui",
      "Architecture",
      "Design patterns",
    ],
    highlights: [
      "Built a focused drawing-preparation workflow for cladding fabrication teams.",
      "Used Next.js, TypeScript, and shadcn/ui to keep the interface fast, structured, and maintainable.",
      "Applied architecture and design patterns for scalable product growth and cleaner feature delivery.",
      "Developed by DomApp with Dlalat as the exclusive agent.",
    ],
    Icon: Scissors,
  },
  {
    title: "Alomera",
    category: "Agriculture E-commerce & Dashboard",
    status: "Case study",
    summary:
      "An agriculture e-commerce platform with product catalog, customer flows, dashboard operations, and reliable deployment.",
    impact:
      "Built to support agricultural product sales, admin operations, and maintainable product growth.",
    liveUrl: "https://agri.alomera-eg.com/",
    imageSrc: "/projects/alomera-showcase.png",
    imageAlt: "Alomera agriculture e-commerce platform screenshot",
    tags: [
      "Next.js",
      "TypeScript",
      "shadcn/ui",
      "Dashboard",
      "Docker",
      "CI/CD",
      "Architecture",
    ],
    highlights: [
      "Built an Arabic storefront for agricultural products with category and product browsing.",
      "Developed dashboard tooling for products, orders, and content operations.",
      "Prepared Docker and CI/CD foundations for reliable deployment.",
    ],
    Icon: Leaf,
  },
  {
    title: "Fofodio Platform",
    category: "Enterprise ERP/CRM Platform",
    status: "GitHub",
    summary:
      "A modular enterprise platform with admin, CRM, communication, backend services, and deployment workflows.",
    impact:
      "Large-scale business modules structured for maintainable frontend and backend development.",
    repoLinks: [
      {
        label: "Frontend Repo",
        href: "https://github.com/Elgedawy31/rofodio-frontend",
      },
      {
        label: "Backend Repo",
        href: "https://github.com/Elgedawy31/rofodio-backend",
      },
    ],
    tags: ["ERP", "CRM", "Monorepo", "Module federation"],
    highlights: [
      "Built enterprise modules including admin panel, CRM, and communication workflows.",
      "Structured frontend delivery with monorepo architecture and Vite module federation.",
      "Designed backend services and Docker-based deployment pipelines for complex business workflows.",
    ],
    Icon: BracketsCurly,
  },
]
