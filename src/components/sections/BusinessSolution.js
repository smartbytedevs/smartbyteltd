"use client"

import { useState, useCallback } from "react"
import { ecosystemNodes } from "@/components/business-solution/ecosystemData"
import { EcosystemGrid } from "@/components/business-solution/EcosystemGrid"
import { SolutionPanel } from "@/components/business-solution/SolutionPanel"
import { SectionHeading } from "@/components/ui/SectionHeading"

export function BusinessSolution() {
  const [activeId, setActiveId] = useState(ecosystemNodes[0].id)
  const activeNode = ecosystemNodes.find((n) => n.id === activeId) || ecosystemNodes[0]

  const handleNodeSelect = useCallback((id) => {
    setActiveId(id)
  }, [])

  return (
    <section
      id="business-solution"
      className="relative py-[120px] sm:py-[160px] overflow-hidden bg-[#F7F7F8]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header — centered */}
        <div className="max-w-3xl mx-auto mb-14 lg:mb-20 text-center">
          <SectionHeading
            align="center"
            label="ALL-IN-ONE BUSINESS SOLUTION"
            title={
              <>
                Everything Your<br />
                Business Needs.<br />
                <span className="text-[#50FFAF]">
                  One Partner.
                </span>
              </>
            }
            description="We transform business ideas into complete digital ecosystems — from branding and websites to custom software, automation, online marketing and long-term technical support."
          />
        </div>

        {/* Ecosystem — responsive card grid */}
        <EcosystemGrid
          activeNodeId={activeId}
          onNodeSelect={handleNodeSelect}
          nodes={ecosystemNodes}
        />

        {/* Active Solution Panel — below the ecosystem */}
        <div className="mt-12 lg:mt-16">
          <div className="max-w-3xl mx-auto">
            <SolutionPanel activeNode={activeNode} />
          </div>
        </div>
      </div>
    </section>
  )
}
