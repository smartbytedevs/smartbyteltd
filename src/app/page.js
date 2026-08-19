import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/hero/Hero"
import { FeaturedTemplates } from "@/components/featured-templates/FeaturedTemplates"
import { BusinessSolution } from "@/components/sections/BusinessSolution"
import { WhatWeBuild } from "@/components/what-we-build/WhatWeBuild"
import { WhySmartByte } from "@/components/why-smartbyte/WhySmartByte"
import { Testimonials } from "@/components/testimonials/Testimonials"
import { About } from "@/components/sections/About"
import { TeamSection } from "@/components/team/TeamSection"
import { Works } from "@/components/sections/Works"
import { Pricing } from "@/components/sections/Pricing"
import { Contact } from "@/components/sections/Contact"
import { FinalCTA } from "@/components/sections/FinalCTA"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatWeBuild />
        <Works />
        <WhySmartByte />
        <Testimonials />
        <TeamSection />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
