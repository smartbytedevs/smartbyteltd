"use client"

import { useCallback } from "react"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FilterProvider } from "@/components/templates/FilterContext"
import { TemplatesHero } from "@/components/templates/TemplatesHero"
import { SolutionFinder } from "@/components/templates/SolutionFinder"
import { TemplatesCatalog } from "@/components/templates/TemplatesCatalog"
import { CategoriesShowcase } from "@/components/templates/CategoriesShowcase"
import { WhyTemplates } from "@/components/templates/WhyTemplates"
import { TemplateFAQ } from "@/components/templates/TemplateFAQ"
import { TemplatesFinalCTA } from "@/components/templates/TemplatesFinalCTA"

export default function TemplatesPage() {
  const scrollToGrid = useCallback(() => {
    const el = document.getElementById("templates-grid")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const scrollToFinder = useCallback(() => {
    const el = document.getElementById("solution-finder")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <FilterProvider>
      <Navbar />
      <main>
        <TemplatesHero onBrowse={scrollToGrid} />
        <SolutionFinder onFindSolution={scrollToGrid} />
        <TemplatesCatalog />
        <CategoriesShowcase />
        <WhyTemplates />
        <TemplateFAQ />
        <TemplatesFinalCTA />
      </main>
      <Footer />
    </FilterProvider>
  )
}
