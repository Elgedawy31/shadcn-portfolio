import { HeroSection } from "@/components/hero-section"
import { SiteNavbar } from "@/components/site-navbar"

export default function Page() {
  return (
    <main id="home" className="min-h-svh overflow-x-clip">
      <SiteNavbar />
      <HeroSection />
    </main>
  )
}
