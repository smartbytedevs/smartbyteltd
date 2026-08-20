"use client"

import { motion } from "motion/react"
import { PremiumCTA } from "@/components/ui/PremiumCTA"
export function FinalCTA() {

  return (
    <section className="relative overflow-hidden bg-[#111111] py-[100px] sm:py-[120px] lg:py-[150px]">
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Ready To Turn
          <br />
          <span className="text-[#8ba4ff]">
            Your Idea Into Reality?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg"
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
            showArrow
            onClick={() => (window.location.href = "/contact")}
          >
            Start Your Project
          </PremiumCTA>
        </motion.div>
      </div>
    </section>
  )
}
