"use client"

import { motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Particles } from "@/components/why-smartbyte/Particles"
import { plans } from "@/components/pricing/pricingData"
import { PricingCard } from "@/components/pricing/PricingCard"
import { PricingFeatureCompare } from "@/components/pricing/PricingFeatureCompare"
import { PricingNote } from "@/components/pricing/PricingNote"
import { PricingTrust } from "@/components/pricing/PricingTrust"

export function Pricing() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="pricing"
      className="relative py-[120px] sm:py-[140px] overflow-hidden bg-background"
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
          className="absolute top-[5%] -left-48 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 194, 168, 0.06), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute top-[40%] -right-48 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(56, 189, 248, 0.04), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute bottom-[15%] left-[30%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 194, 168, 0.03), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute top-0 left-[30%] w-px h-full opacity-[0.02]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(0, 194, 168, 0.15), transparent)",
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
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm font-semibold tracking-label uppercase text-accent mb-5 block"
            >
              Pricing
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-section-title font-bold"
            >
              Flexible Pricing
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                For Every Business.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-4 text-base sm:text-lg text-muted leading-relaxed"
            >
              Whether you&apos;re launching your first business website or building a
              complete software ecosystem, we have a solution tailored to your goals.
            </motion.p>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 font-semibold text-sm tracking-nav transition-all duration-500"
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
                Get Free Consultation
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </motion.div>
        </div>

        {/* ═══ Pricing Cards ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 xl:gap-6">
          {plans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* ═══ Feature Comparison ═══ */}
        <PricingFeatureCompare />

        {/* ═══ Pricing Note ═══ */}
        <PricingNote />

        {/* ═══ Trust Stats ═══ */}
        <PricingTrust />
      </div>
    </section>
  )
}
