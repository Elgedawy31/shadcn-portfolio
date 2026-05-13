import type { Metadata } from "next"
import { JetBrains_Mono, Montserrat, Oxanium } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const siteUrl = "https://mohamedelgedawy.com"
const profileImage = "/logo.png"
const resumeUrl = "/mohamed-elgedawy-fullStack.pdf"
const previewImageUrl = `${siteUrl}${profileImage}`
const resumePreviewUrl = `${siteUrl}${resumeUrl}`

const fontHeading = Oxanium({
  subsets: ["latin"],
  variable: "--font-heading",
})

const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mohamed Elgedawy | Full Stack Engineer",
    template: "%s | Mohamed Elgedawy",
  },
  description:
    "Resume and portfolio of Mohamed Elgedawy, a Full Stack Engineer specializing in React, Next.js, TypeScript, Node.js, NestJS, REST APIs, Docker, CI/CD, and scalable production web applications.",
  applicationName: "Mohamed Elgedawy Portfolio",
  authors: [{ name: "Mohamed Elgedawy", url: siteUrl }],
  creator: "Mohamed Elgedawy",
  publisher: "Mohamed Elgedawy",
  category: "Portfolio",
  classification: "Full Stack Engineer Resume and Portfolio",
  keywords: [
    "Mohamed Elgedawy",
    "Mohamed Elgedawy resume",
    "Full Stack Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "NestJS Developer",
    "TypeScript Developer",
    "Frontend Engineer",
    "Backend Engineer",
    "React Native Developer",
    "Docker",
    "CI/CD",
    "AWS",
    "MongoDB",
    "PostgreSQL",
    "ERP developer",
    "CRM developer",
    "Egypt software engineer",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/pdf": resumeUrl,
    },
  },
  icons: {
    icon: [
      {
        url: profileImage,
        type: "image/png",
        sizes: "1024x1536",
      },
    ],
    shortcut: profileImage,
    apple: [
      {
        url: profileImage,
        type: "image/png",
        sizes: "1024x1536",
      },
    ],
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    siteName: "mohamedelgedawy.com",
    title: "Mohamed Elgedawy | Full Stack Engineer",
    description:
      "Full Stack Engineer building scalable, production-ready applications with React, Next.js, TypeScript, Node.js, NestJS, Docker, CI/CD, and cloud deployments.",
    firstName: "Mohamed",
    lastName: "Elgedawy",
    username: "mohamedelgedawy",
    gender: "male",
    images: [
      {
        url: previewImageUrl,
        width: 1024,
        height: 1536,
        alt: "Mohamed Elgedawy, Full Stack Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Elgedawy | Full Stack Engineer",
    description:
      "React, Next.js, TypeScript, Node.js, NestJS, Docker, CI/CD, and cloud-focused Full Stack Engineer.",
    images: [
      {
        url: previewImageUrl,
        alt: "Mohamed Elgedawy, Full Stack Engineer",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "profile:first_name": "Mohamed",
    "profile:last_name": "Elgedawy",
    "profile:username": "mohamedelgedawy",
    "website:domain": "mohamedelgedawy.com",
    "resume:url": resumePreviewUrl,
    "contact:email": "mohamedelgedawy40@gmail.com",
    "linkedin:profile": "https://linkedin.com/in/mohamedelgedawy",
    "github:profile": "https://github.com/Elgedawy31",
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohamed Elgedawy",
  alternateName: "Mohamed Elgedawy Full Stack Engineer",
  jobTitle: "Full Stack Engineer",
  description:
    "Full Stack Engineer experienced in scalable web applications using React, Next.js, TypeScript, Node.js, NestJS, REST APIs, Docker, CI/CD, and cloud environments.",
  url: siteUrl,
  image: previewImageUrl,
  email: "mailto:mohamedelgedawy40@gmail.com",
  telephone: "+201003098950",
  address: {
    "@type": "PostalAddress",
    addressCountry: "EG",
  },
  sameAs: [
    "https://linkedin.com/in/mohamedelgedawy",
    "https://github.com/Elgedawy31",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Kafrelshiekh University",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express.js",
    "NestJS",
    "REST APIs",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "React Native",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Nginx",
    "AWS",
    "Azure",
    "SEO",
    "Performance Optimization",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Full Stack Engineer",
    skills:
      "React, Next.js, TypeScript, Node.js, NestJS, REST APIs, GraphQL, Docker, CI/CD, AWS, MongoDB, PostgreSQL, React Native",
  },
}

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Mohamed Elgedawy Resume and Portfolio",
  url: siteUrl,
  mainEntity: personJsonLd,
  relatedLink: [resumePreviewUrl],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-sans antialiased",
        fontSans.variable,
        fontHeading.variable,
        jetbrainsMono.variable,
      )}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profilePageJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
