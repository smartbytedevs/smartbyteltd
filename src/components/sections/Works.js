"use client"

import { useState, useCallback } from "react"
import { Calendar } from "lucide-react"
import { projects } from "@/components/works/worksData"
import { ProjectImage } from "@/components/works/ProjectImage"
import { ProjectDetails } from "@/components/works/ProjectDetails"
import { Particles } from "@/components/why-smartbyte/Particles"
import { SafeSlideUp, SafeReveal } from "@/components/common/SafeMotion"
import { PremiumCTA } from "@/components/ui/PremiumCTA"

export function Works() {
  const [hoveredId, setHoveredId] = useState(null)

  const handleHover = useCallback((id) => setHoveredId(id), [])
  const handleLeave = useCallback(() => setHoveredId(null), [])

  return (
    <section
      id="work"
      className="relative py-[140px] overflow-hidden bg-background"
    >
      {/* ═══ Background ═══ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-[10%] -left-48 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(0, 194, 168, 0.06), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute top-[50%] -right-48 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.04), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[40%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(0, 194, 168, 0.03), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute top-0 right-[25%] w-px h-full opacity-[0.02]"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(0, 194, 168, 0.2), transparent)",
          }}
        />
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
        {/* ═══ Section Header ═══ */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <SafeSlideUp className="text-xs sm:text-sm font-semibold tracking-label uppercase text-accent mb-5 block">
              Our Portfolio
            </SafeSlideUp>

            <SafeSlideUp delay={0.1}>
              <h2 className="font-display text-section-title font-bold">
                Projects That
                <br />
                <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                  Create Results.
                </span>
              </h2>
            </SafeSlideUp>

            <SafeSlideUp delay={0.15}>
              <p className="relative mt-4 text-base sm:text-lg text-muted leading-relaxed">
                From business websites to complex SaaS platforms, we design and develop digital experiences that help businesses grow.
              </p>
            </SafeSlideUp>
          </div>

          {/* CTA */}
          <SafeSlideUp delay={0.25} className="shrink-0">
            <PremiumCTA href="#" showArrow>
              View All Projects
            </PremiumCTA>
          </SafeSlideUp>
        </div>

        {/* ═══ Project Showcase ═══ */}
        <div className="space-y-24 lg:space-y-32">
          {projects.map((project, i) => {
            const isLeft = i % 2 === 0
            const isHovered = hoveredId === project.id

            return (
              <SafeReveal
                key={project.id}
                delay={0}
                viewportMargin="-100px"
                className="group/project"
                onMouseEnter={() => handleHover(project.id)}
                onMouseLeave={handleLeave}
              >
                {/* Desktop: alternating layout */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-16 items-center">
                  {isLeft ? (
                    <>
                      <ProjectImage accent={project.accent} index={i} />
                      <ProjectDetails project={project} index={i} isHovered={isHovered} />
                    </>
                  ) : (
                    <>
                      <ProjectDetails project={project} index={i} isHovered={isHovered} />
                      <ProjectImage accent={project.accent} index={i} />
                    </>
                  )}
                </div>

                {/* Tablet/ Mobile: stacked — image first */}
                <div className="lg:hidden space-y-6">
                  <ProjectImage accent={project.accent} index={i} />
                  <ProjectDetails project={project} index={i} isHovered={isHovered} />
                </div>
              </SafeReveal>
            )
          })}
        </div>

        {/* ═══ Bottom CTA ═══ */}
        <SafeReveal className="mt-20 text-center">
          <PremiumCTA href="#contact" icon={Calendar} showArrow>
            Start Your Project
          </PremiumCTA>
        </SafeReveal>
      </div>
    </section>
  )
}
