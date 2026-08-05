"use client"

import { useState, useCallback } from "react"
import { motion } from "motion/react"
import { ecosystemNodes } from "@/components/business-solution/ecosystemData"
import { EcosystemGrid } from "@/components/business-solution/EcosystemGrid"
import { SolutionPanel } from "@/components/business-solution/SolutionPanel"
import { Particles } from "@/components/why-smartbyte/Particles"
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
      className="relative py-[140px] overflow-hidden bg-background"
    >
      {/* ═══ Background ═══ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(28,25,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,25,23,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gradient orbs */}
        <div
          className="absolute top-[10%] -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(15, 118, 110, 0.06), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute bottom-[10%] -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(14, 116, 144, 0.04), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute top-[40%] right-[30%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(15, 118, 110, 0.03), transparent 70%)",
            filter: "blur(120px)",
          }}
        />

        {/* Light beams */}
        <div
          className="absolute top-0 left-[25%] w-px h-full opacity-[0.02]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(15, 118, 110, 0.2), transparent)",
          }}
        />
        <div
          className="absolute top-0 right-[35%] w-px h-full opacity-[0.015]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(14, 116, 144, 0.15), transparent)",
          }}
        />

        {/* Noise */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px",
          }}
        />

        <Particles />
      </div>

      {/* ═══ Content ═══ */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* ═══ Section Header — centered ═══ */}
        <div className="max-w-3xl mx-auto mb-14 lg:mb-20 text-center">
          <SectionHeading
            align="center"
            label="ALL-IN-ONE BUSINESS SOLUTION"
            title={
              <>
                Everything Your<br />
                Business Needs.<br />
                <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                  One Partner.
                </span>
              </>
            }
            description="We transform business ideas into complete digital ecosystems — from branding and websites to custom software, automation, online marketing and long-term technical support."
          />
        </div>

        {/* ═══ Ecosystem — responsive card grid ═══ */}
        <EcosystemGrid
          activeNodeId={activeId}
          onNodeSelect={handleNodeSelect}
          nodes={ecosystemNodes}
        />

        {/* ═══ Active Solution Panel — below the ecosystem ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 lg:mt-16"
        >
          <div className="max-w-3xl mx-auto">
            <SolutionPanel activeNode={activeNode} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
