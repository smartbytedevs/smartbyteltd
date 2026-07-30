"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Particles } from "@/components/why-smartbyte/Particles"
import { PremiumCTA } from "@/components/ui/PremiumCTA"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { ArrowDown, Globe, ArrowDownToLine, TrendingUp, CheckCircle, Sparkles } from "lucide-react"

const steps = [
  { icon: Globe, label: "Website", color: "from-accent to-accent-secondary" },
  { icon: ArrowDownToLine, label: "Automation", color: "from-accent-secondary to-blue-400" },
  { icon: TrendingUp, label: "Growth", color: "from-blue-400 to-purple-400" },
  { icon: CheckCircle, label: "Success", color: "from-purple-400 to-accent" },
]

function FloatingCard({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl"
      style={{ width: 200 }}
    >
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0`}>
        <step.icon className="w-5 h-5 text-background" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{step.label}</p>
        <p className="text-[10px] text-muted-foreground">Step {index + 1}</p>
      </div>
      {index < steps.length - 1 && (
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
        >
          <ArrowDown className="w-4 h-4 text-accent/40" />
        </motion.div>
      )}
    </motion.div>
  )
}

export function ServicesHero({ onExplore }) {
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
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }} />
        <Particles />
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 w-full">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SafeSlideUp delay={0.2}>
                <span className="text-xs sm:text-sm font-semibold tracking-label uppercase bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-6 block">
                  Our Services
                </span>
              </SafeSlideUp>

              <SafeSlideUp delay={0.3}>
                <h1 className="font-display text-hero font-bold tracking-display leading-[0.95]">
                  Everything Your Business
                  <br />
                  <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                    Needs To Grow Online.
                  </span>
                </h1>
              </SafeSlideUp>

              <SafeSlideUp delay={0.4}>
                <p className="mt-6 text-base sm:text-lg text-muted max-w-xl leading-relaxed">
                  Whether you need a professional website, a powerful web application, or a complete business management system, SmartByte delivers modern digital solutions built for performance and growth.
                </p>
              </SafeSlideUp>

              <SafeSlideUp delay={0.5}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <PremiumCTA href="#services-grid" showArrow onClick={onExplore}>
                    Explore Services
                  </PremiumCTA>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-white/10 text-foreground hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                  >
                    Get Free Consultation
                  </a>
                </div>
              </SafeSlideUp>
            </div>

            <div className="hidden lg:flex flex-col items-center gap-8 relative">
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center center" }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-accent/5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-accent-secondary/5" />
              </motion.div>

              <div className="relative flex flex-col items-center gap-8">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-7 h-7 text-background" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">{step.label}</p>
                      <p className="text-xs text-muted-foreground">SmartByte delivers</p>
                    </div>
                    {i < steps.length - 1 && (
                      <motion.div
                        className="absolute -bottom-8 left-7"
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                      >
                        <ArrowDown className="w-5 h-5 text-accent/30" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="absolute -top-4 -right-4"
                animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="rounded-2xl border border-accent/20 bg-accent/5 p-3 backdrop-blur-xl">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
              </motion.div>
            </div>
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
