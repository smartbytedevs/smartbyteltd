"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Calendar, ArrowRight } from "lucide-react"
import { services } from "./services"
import { ServiceCard } from "./ServiceCard"
import { BackgroundEffects } from "./BackgroundEffects"
import { Particles } from "@/components/why-smartbyte/Particles"

export function WhatWeBuild() {
  const [activeService, setActiveService] = useState(services[0])
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef(null)
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
      id="what-we-build"
      className="relative py-[160px] bg-background"
    >
      <BackgroundEffects activeType={activeService?.previewType} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <Particles />
      </div>

      {/* Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={
          prefersReduced
            ? {}
            : {
                background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0, 194, 168, 0.02), transparent 60%)`,
              }
        }
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[36%_64%] lg:gap-16 xl:gap-20">
          {/* ═══ LEFT - Sticky ═══ */}
          <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center lg:col-start-1">
            <div className="w-full py-12 lg:py-0 lg:pr-4">
              {/* Section label */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs sm:text-sm font-semibold tracking-label uppercase bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-5 block"
              >
                Our Services
              </motion.span>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-section-title font-bold"
              >
                What
                <br />
                We
                <br />
                <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                  Build.
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-[460px]"
              >
                We create digital products that help businesses launch faster,
                automate operations and scale confidently.
              </motion.p>

              {/* Service Navigation */}
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 space-y-0.5"
                role="tablist"
                aria-label="Services"
              >
                {services.map((service) => {
                  const isActive = activeService?.id === service.id
                  return (
                    <button
                      key={service.id}
                      role="tab"
                      aria-selected={isActive}
                      className="group relative w-full text-left outline-none"
                      onMouseEnter={() => setActiveService(service)}
                      onFocus={() => setActiveService(service)}
                      tabIndex={0}
                    >
                      {/* Left indicator bar */}
                      <motion.div
                        className="absolute left-0 top-2.5 bottom-2.5 w-0.5 rounded-full bg-gradient-to-b from-accent to-accent-secondary"
                        animate={{
                          opacity: isActive ? 1 : 0,
                          scaleY: isActive ? 1 : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                          mass: 0.7,
                        }}
                        style={{ originY: 0.5 }}
                      />

                      {/* Highlight background */}
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        animate={{
                          background: isActive
                            ? "linear-gradient(to right, rgba(0, 194, 168, 0.08), transparent)"
                            : "linear-gradient(to right, transparent, transparent)",
                        }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />

                      {/* Service name */}
                      <span className="relative z-10 block px-5 py-3 text-base font-medium transition-colors duration-300">
                        <motion.span
                          animate={{
                            color: isActive ? "#F8FAFC" : "#64748b",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 25,
                            mass: 0.6,
                          }}
                        >
                          {service.title}
                        </motion.span>
                      </span>
                    </button>
                  )
                })}
              </motion.nav>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative mt-8"
              >
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 font-semibold text-sm tracking-nav transition-all duration-500"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-secondary opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                  <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      boxShadow:
                        "0 0 30px rgba(0, 194, 168, 0.3), 0 0 60px rgba(56, 189, 248, 0.15)",
                    }}
                  />
                  <span className="relative z-10 text-background flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Start Your Project
                  </span>
                  <motion.span
                    className="relative z-10"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-4 h-4 text-background" />
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ pointerEvents: "none" }}
                  />
                </a>
              </motion.div>
            </div>
          </div>

          {/* ═══ RIGHT - Premium Card ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-start-2 py-12 lg:py-0"
          >
            <ServiceCard service={activeService} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
