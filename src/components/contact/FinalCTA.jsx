"use client"

import { motion } from "motion/react"
import { PremiumCTA } from "@/components/ui/PremiumCTA"
import { useQuoteModal } from "@/components/quote/QuoteModalContext"

export function FinalCTA() {
  const { openQuoteModal } = useQuoteModal()

  return (
    <section className="relative mt-[120px] overflow-hidden py-[100px] sm:mt-[140px] sm:py-[120px] lg:py-[150px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(0, 194, 168, 0.08) 0%, rgba(56, 189, 248, 0.04) 40%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "800px",
          height: "800px",
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.03), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
        >
          Ready To Turn
          <br />
          <span className="bg-gradient-to-r from-accent via-accent-secondary to-accent bg-clip-text text-transparent">
            Your Idea Into Reality?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          Let&apos;s discuss your project and create something extraordinary
          together. No commitment required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <PremiumCTA
            size="lg"
            glow="lg"
            showArrow
            onClick={() => openQuoteModal({ source: "final-cta" })}
          >
            Start Your Project
          </PremiumCTA>
        </motion.div>
      </div>
    </section>
  )
}
