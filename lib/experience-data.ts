export type ExperienceEntry = {
  /** Job title */
  title: string
  /** Organization name */
  company: string
  /** City / region */
  location: string
  /** e.g. Hybrid, Full-time */
  arrangement: string
  /** ISO-like labels for sorting; display strings are derived in UI */
  startLabel: string
  endLabel: string | null
  /** When true, `endLabel` is ignored for display in favor of "Present" */
  current?: boolean
  highlights: readonly string[]
}

/**
 * Work history aligned with `public/mohamed-elgedawy-fullStack.pdf`.
 * Update this file when the résumé changes.
 */
export const experienceEntries: readonly ExperienceEntry[] = [
  {
    title: "Frontend Engineer",
    company: "DomApp",
    location: "Egypt",
    arrangement: "Hybrid, Full-time",
    startLabel: "2025-05",
    endLabel: null,
    current: true,
    highlights: [
      "Develop scalable, high-performance user interfaces and reusable components using React and Next.js.",
      "Integrated REST APIs and implemented secure authentication for efficient, reliable data handling.",
      "Optimized application performance, reducing load time by 35% and improving overall user experience.",
    ],
  },
  {
    title: "Full Stack Engineer",
    company: "Rafeeq Group",
    location: "Egypt",
    arrangement: "Hybrid, Full-time",
    startLabel: "2024-12",
    endLabel: "2025-05",
    highlights: [
      "Designed end-to-end web applications across frontend and backend using Next.js and NestJS.",
      "Built scalable APIs and managed deployment pipelines with Docker and CI/CD practices.",
      "Led development efforts, improving system performance and SEO.",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Auvnet",
    location: "Dubai, UAE",
    arrangement: "Remote, Part-time",
    startLabel: "2023-02",
    endLabel: "2024-12",
    highlights: [
      "Developed modern web applications using React, Next.js, and TypeScript for scalable production environments.",
      "Improved application performance, raising Lighthouse score from 72 to 95.",
      "Reduced frontend bundle size by 25%, improving loading speed and overall user experience.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "DevGlobalLLC",
    location: "Egypt",
    arrangement: "Remote, Full-time",
    startLabel: "2022-07",
    endLabel: "2024-07",
    highlights: [
      "Built web and mobile apps using MERN, React Native, and Expo.",
      "Implemented scalable architecture with monorepo and Vite module federation.",
      "Developed APIs and delivered systems such as HR, ERP, and dashboards.",
    ],
  },
  {
    title: "Full Stack Engineer",
    company: "Self Employed",
    location: "Worldwide",
    arrangement: "Freelance / contract",
    startLabel: "2022-02",
    endLabel: "2025-09",
    highlights: [
      "Delivered 10+ web and mobile applications across frontend and backend.",
      "Built APIs and scalable systems and managed deployment pipelines.",
      "Developed responsive, SEO-friendly platforms, improving performance and user experience.",
    ],
  },
]

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
})

function parseYearMonth(ym: string): Date {
  const [y, m] = ym.split("-").map(Number)
  return new Date(y, (m ?? 1) - 1, 1)
}

export function formatMonthYear(ym: string): string {
  return monthFormatter.format(parseYearMonth(ym))
}

/** `YYYY-MM` → `YYYY-MM-01` for valid `dateTime` on `<time>`. */
export function yearMonthToDateAttr(ym: string): string {
  return `${ym}-01`
}
