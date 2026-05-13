import { ContactSection } from "@/components/contact-section"
import { ExperienceSection } from "@/components/experience-section"
import { HeroSection } from "@/components/hero-section"
import { HomeAmbientBackground } from "@/components/home-ambient-background"
import { SkillsSection } from "@/components/skills-section"
import { SiteNavbar } from "@/components/site-navbar"

export default function Page() {
  return (
    <main id="home" className="relative min-h-svh overflow-x-clip bg-background">
      <HomeAmbientBackground />
      <div className="relative z-10">
        <SiteNavbar />
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </main>
  )
}
