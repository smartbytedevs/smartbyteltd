"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Particles } from "@/components/why-smartbyte/Particles"
import { PremiumCTA } from "@/components/ui/PremiumCTA"
import { Button } from "@/components/ui/Button"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { ArrowDown, MessageSquare } from "lucide-react"

export function TemplatesHero({ onBrowse }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 80])

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(28,25,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,25,23,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="absolute top-[5%] -left-48 w-[700px] h-[700px] rounded-full opacity-20" style={{
          background: "radial-gradient(circle, rgba(15, 118, 110, 0.07), transparent 70%)",
          filter: "blur(120px)",
        }} />
        <div className="absolute bottom-[10%] -right-48 w-[500px] h-[500px] rounded-full opacity-15" style={{
          background: "radial-gradient(circle, rgba(14, 116, 144, 0.05), transparent 70%)",
          filter: "blur(120px)",
        }} />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(15, 118, 110, 0.03), transparent 70%)",
          filter: "blur(120px)",
        }} />

        <div className="absolute top-0 left-[20%] w-px h-full opacity-[0.02]" style={{
          background: "linear-gradient(to bottom, transparent, rgba(15, 118, 110, 0.2), transparent)",
        }} />
        <div className="absolute top-0 right-[30%] w-px h-full opacity-[0.015]" style={{
          background: "linear-gradient(to bottom, transparent, rgba(14, 116, 144, 0.15), transparent)",
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
                Premium Templates
              </span>
            </SafeSlideUp>

            <SafeSlideUp delay={0.3}>
              <h1 className="font-display text-hero font-bold tracking-display leading-[0.95]">
                Ready-Made Solutions.
                <br />
                <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                  Custom Quality.
                </span>
              </h1>
            </SafeSlideUp>

            <SafeSlideUp delay={0.4}>
              <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
                Launch faster with professionally built SmartByte templates. Each solution is
                production-ready, fully responsive, and designed to help your business stand out
                from day one — without compromising on quality.
              </p>
            </SafeSlideUp>

            <SafeSlideUp delay={0.5}>
              <div className="mt-10 flex flex-wrap gap-4">
                <PremiumCTA href="#templates-grid" showArrow onClick={onBrowse}>
                  Browse Templates
                </PremiumCTA>
                <a
                  href="#solution-finder"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-border/40 text-foreground hover:bg-white/55 hover:border-border/55 transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4" />
                  Need Custom Solution?
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
