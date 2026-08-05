"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Particles } from "@/components/why-smartbyte/Particles"
import { PremiumCTA } from "@/components/ui/PremiumCTA"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { ArrowDown } from "lucide-react"

export function ContactHero({ onStartProject }) {
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
        <Particles />
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 w-full">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl">
            <SafeSlideUp delay={0.2}>
              <span className="text-xs sm:text-sm font-semibold tracking-label uppercase bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-6 block">
                Get In Touch
              </span>
            </SafeSlideUp>

            <SafeSlideUp delay={0.3}>
              <h1 className="font-display text-hero font-bold tracking-display leading-[0.95]">
                Let&apos;s Build
                <br />
                <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                  Something Great.
                </span>
              </h1>
            </SafeSlideUp>

            <SafeSlideUp delay={0.4}>
              <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
                Every successful project starts with a conversation. Whether you need a business website, custom software, SaaS platform, AI solution, or digital transformation, our team is ready to help you turn your vision into reality.
              </p>
            </SafeSlideUp>

            <SafeSlideUp delay={0.5}>
              <div className="mt-10 flex flex-wrap gap-4">
                <PremiumCTA href="#contact-form" showArrow onClick={onStartProject}>
                  Start Your Project
                </PremiumCTA>
                <a
                  href="mailto:hello@smartbyte.dev"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-border/40 text-foreground hover:bg-white/55 hover:border-border/55 transition-all duration-300"
                >
                  hello@smartbyte.dev
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
