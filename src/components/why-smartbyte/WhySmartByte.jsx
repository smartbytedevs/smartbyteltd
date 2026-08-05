"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Calendar } from "lucide-react"
import { Panel } from "./Panel"
import { Particles } from "./Particles"
import { PremiumCTA } from "@/components/ui/PremiumCTA"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { useQuoteModal } from "@/components/quote/QuoteModalContext"

const panels = [
  {
    number: "01",
    title: "Business First Approach",
    description:
      "We take time to understand your business model, revenue drivers, and customer journey before writing a single line of code — ensuring every feature has a measurable impact.",
  },
  {
    number: "02",
    title: "Modern Technology Stack",
    description:
      "We architect platforms using battle-tested modern frameworks and cloud infrastructure, engineered for speed, security, and seamless scalability from day one.",
  },
  {
    number: "03",
    title: "Fast & Transparent Communication",
    description:
      "Real-time progress tracking, daily updates, and direct access to your project lead — no account managers, no bureaucracy, just honest collaboration.",
  },
  {
    number: "04",
    title: "Long-Term Partnership Mindset",
    description:
      "Our engagement doesn't end at launch. We provide continuous optimization, proactive maintenance, and strategic growth support as your business evolves.",
  },
  {
    number: "05",
    title: "Pixel-Perfect Craftsmanship",
    description:
      "Every interface is meticulously designed and developed with obsessive attention to typography, spacing, motion, and consistency across every screen size.",
  },
  {
    number: "06",
    title: "Scalable & Budget-Friendly",
    description:
      "We build modular systems that start lean and grow with you — no expensive rewrites, no technical debt, just sustainable architecture you can build on.",
  },
]

export function WhySmartByte() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef(null)
  const { openQuoteModal } = useQuoteModal()
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReduced) return

    const handleMouse = (e) => {
      const rect = section.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }

    section.addEventListener("mousemove", handleMouse)
    return () => section.removeEventListener("mousemove", handleMouse)
  }, [prefersReduced])

  return (
    <section
      ref={sectionRef}
      id="why-smartbyte"
      className="relative bg-background"
    >
      {/* ═══ Background Layers ═══ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(28,25,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,25,23,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gradient mesh - large blobs */}
        <div
          className="absolute top-[5%] -left-48 w-[700px] h-[700px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(15, 118, 110, 0.07), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute top-[30%] right-[-20%] w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(14, 116, 144, 0.05), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute bottom-[15%] left-[20%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(15, 118, 110, 0.04), transparent 70%)",
            filter: "blur(120px)",
          }}
        />

        {/* Light beams */}
        <div
          className="absolute top-0 left-[30%] w-px h-full opacity-[0.03]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(15, 118, 110, 0.3), transparent)",
          }}
        />
        <div
          className="absolute top-0 right-[25%] w-px h-full opacity-[0.02]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(14, 116, 144, 0.2), transparent)",
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

        {/* Floating particles */}
        <Particles />
      </div>

      {/* ═══ Main Content ═══ */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* ═══ LEFT — Sticky Panel ═══ */}
          <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center lg:col-start-1">
            <div className="w-full py-16 lg:py-0 lg:pr-8">
              {/* Animated gradient blob (tracks mouse) */}
              <div className="relative">
                <motion.div
                  className="absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full pointer-events-none"
                  animate={{
                    x: (mousePos.x - 0.5) * 30,
                    y: (mousePos.y - 0.5) * 30,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 30,
                    mass: 1,
                  }}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(15, 118, 110, 0.1), transparent 70%)",
                    filter: "blur(80px)",
                  }}
                />

                <SectionHeading
                  label="Why Smartbyte"
                  labelGradient={false}
                  title={
                    <>
                      Why Businesses<br />
                      <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                        Trust SmartByte.
                      </span>
                    </>
                  }
                  description="We combine deep technical expertise with genuine business understanding — delivering software that doesn't just work, but drives real growth."
                  maxWidth="450px"
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative mt-10"
                >
                  <PremiumCTA
                    icon={Calendar}
                    showArrow
                    arrowMotion
                    scaleOnHover
                    onClick={() => openQuoteModal({ source: "home" })}
                  >
                    Start Your Project
                  </PremiumCTA>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ═══ RIGHT — Scrollable Panels ═══ */}
          <div className="lg:col-start-2 flex flex-col gap-24 sm:gap-28 lg:gap-[120px] py-16 sm:py-20 lg:py-[160px]">
            {panels.map((item, index) => (
              <Panel key={item.number} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
