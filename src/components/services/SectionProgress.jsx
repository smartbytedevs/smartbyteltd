"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, useScroll, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

const sectionIds = [
  "services-hero",
  "services-grid",
  "service-details",
  "process-timeline",
  "tech-stack",
  "why-choose-us",
  "industries-we-serve",
  "pricing-philosophy",
  "faq",
  "final-cta",
]

const sectionLabels = [
  "Hero",
  "Services",
  "Details",
  "Process",
  "Tech Stack",
  "Why Us",
  "Industries",
  "Pricing",
  "FAQ",
  "CTA",
]

export function SectionProgress({ containerRef }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120
      let current = 0
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollPos) {
          current = i
          break
        }
      }
      setActiveIndex(current)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = useCallback((index) => {
    const el = document.getElementById(sectionIds[index])
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-gradient-to-r from-accent to-accent-secondary origin-left"
        style={{ scaleX }}
      />

      <nav
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3"
        aria-label="Section navigation"
      >
        {sectionIds.map((id, i) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(i)}
            className="group flex items-center gap-3"
            aria-label={`Go to ${sectionLabels[i]}`}
          >
            <div className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              i === activeIndex
                ? "bg-accent scale-125 shadow-sm shadow-accent/50"
                : "bg-white/[0.12] hover:bg-white/[0.25]"
            )} />
            <span className={cn(
              "text-[10px] font-medium transition-all duration-300 opacity-0 group-hover:opacity-100",
              i === activeIndex ? "text-accent opacity-100" : "text-muted-foreground"
            )}>
              {sectionLabels[i]}
            </span>
          </button>
        ))}
      </nav>
    </>
  )
}


