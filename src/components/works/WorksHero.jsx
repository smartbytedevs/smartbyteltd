"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Particles } from "@/components/why-smartbyte/Particles"
import { PremiumCTA } from "@/components/ui/PremiumCTA"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { ArrowDown } from "lucide-react"

export function WorksHero({ onBrowse }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 80])

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="absolute top-[5%] -left-48 w-[700px] h-[700px] rounded-full opacity-20" style={{
          background: "radial-gradient(circle, rgba(0, 194, 168, 0.07), transparent 70%)",
          filter: "blur(120px)",
        }} />
        <div className="absolute bottom-[10%] -right-48 w-[500px] h-[500px] rounded-full opacity-15" style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.05), transparent 70%)",
          filter: "blur(120px)",
        }} />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(0, 194, 168, 0.03), transparent 70%)",
          filter: "blur(120px)",
        }} />

        <div className="absolute top-0 left-[20%] w-px h-full opacity-[0.02]" style={{
          background: "linear-gradient(to bottom, transparent, rgba(0, 194, 168, 0.2), transparent)",
        }} />
        <div className="absolute top-0 right-[30%] w-px h-full opacity-[0.015]" style={{
          background: "linear-gradient(to bottom, transparent, rgba(56, 189, 248, 0.15), transparent)",
        }} />

        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }} />

        <Particles />
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 w-full">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl">
            <SafeSlideUp delay={0.2}>
              <span className="text-xs sm:text-sm font-semibold tracking-label uppercase bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-6 block">
                Portfolio &bull; Case Studies
              </span>
            </SafeSlideUp>

            <SafeSlideUp delay={0.3}>
              <h1 className="font-display text-hero font-bold tracking-display leading-[0.95]">
                Work That
                <br />
                <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                  Creates Results.
                </span>
              </h1>
            </SafeSlideUp>

            <SafeSlideUp delay={0.4}>
              <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
                Every project is designed with one goal: help businesses grow faster through exceptional digital experiences.
              </p>
            </SafeSlideUp>

            <SafeSlideUp delay={0.5}>
              <div className="mt-10 flex flex-wrap gap-4">
                <PremiumCTA href="#portfolio-grid" showArrow onClick={onBrowse}>
                  View Projects
                </PremiumCTA>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-white/10 text-foreground hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                >
                  Start Your Project
                </a>
              </div>
            </SafeSlideUp>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </motion.div>
    </section>
  )
}
