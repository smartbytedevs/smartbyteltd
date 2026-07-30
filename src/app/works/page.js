"use client"

import { useState, useCallback } from "react"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingContact } from "@/components/layout/FloatingContact"
import { WorksFilterProvider } from "@/components/works/WorksFilterContext"
import { WorksHero } from "@/components/works/WorksHero"
import { ProjectStats } from "@/components/works/ProjectStats"
import { FeaturedCaseStudy } from "@/components/works/FeaturedCaseStudy"
import { PortfolioGrid } from "@/components/works/PortfolioGrid"
import { CaseStudyModal } from "@/components/works/CaseStudyModal"
import { IndustriesSection } from "@/components/works/IndustriesSection"
import { ClientTestimonials } from "@/components/works/ClientTestimonials"
import { DevProcessTimeline } from "@/components/works/DevProcessTimeline"
import { AwardsStrip } from "@/components/works/AwardsStrip"
import { WorksFinalCTA } from "@/components/works/WorksFinalCTA"

export default function WorksPage() {
  const [modalProject, setModalProject] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const scrollToGrid = useCallback(() => {
    const el = document.getElementById("portfolio-grid")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const handleOpenModal = useCallback((project) => {
    setModalProject(project)
    setModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setModalOpen(false)
    setTimeout(() => setModalProject(null), 300)
  }, [])

  return (
    <WorksFilterProvider>
      <Navbar />
      <main>
        <WorksHero onBrowse={scrollToGrid} />
        <ProjectStats />
        <FeaturedCaseStudy />
        <PortfolioGrid onOpenModal={handleOpenModal} />
        <IndustriesSection />
        <ClientTestimonials />
        <DevProcessTimeline />
        <AwardsStrip />
        <WorksFinalCTA />
      </main>
      <Footer />
      <FloatingContact />
      <CaseStudyModal project={modalProject} open={modalOpen} onClose={handleCloseModal} />
    </WorksFilterProvider>
  )
}
