"use client"

import { useCallback } from "react"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingContact } from "@/components/layout/FloatingContact"
import { ServicesHero } from "@/components/services/ServicesHero"
import { WhatWeBuild } from "@/components/services/WhatWeBuild"
import { InteractiveServiceDetails } from "@/components/services/InteractiveServiceDetails"
import { DevProcessTimeline } from "@/components/services/DevProcessTimeline"
import { TechStack } from "@/components/services/TechStack"
import { WhyChooseUs } from "@/components/services/WhyChooseUs"
import { IndustriesWeServe } from "@/components/services/IndustriesWeServe"
import { PricingPhilosophy } from "@/components/services/PricingPhilosophy"
import { ServicesFAQ } from "@/components/services/ServicesFAQ"
import { ServicesFinalCTA } from "@/components/services/ServicesFinalCTA"
import { SectionProgress } from "@/components/services/SectionProgress"

export default function ServicesPage() {
  const scrollToGrid = useCallback(() => {
    const el = document.getElementById("services-grid")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const handleSelectService = useCallback((serviceId) => {
    const el = document.getElementById("service-details")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <>
      <SectionProgress />
      <Navbar />
      <main>
        <ServicesHero onExplore={scrollToGrid} />
        <WhatWeBuild onSelectService={handleSelectService} />
        <InteractiveServiceDetails />
        <DevProcessTimeline />
        <TechStack />
        <WhyChooseUs />
        <IndustriesWeServe />
        <PricingPhilosophy />
        <ServicesFAQ />
        <ServicesFinalCTA />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
