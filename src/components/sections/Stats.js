"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { AnimatedGradient } from "@/components/ui/AnimatedGradient"
import { AnimatedCounter } from "@/components/ui/AnimatedCounter"

const statsData = [
  { value: 150, suffix: "+", label: "Happy Clients" },
  { value: 300, suffix: "+", label: "Projects Delivered" },
  { value: 24, suffix: "/7", label: "Support Available" },
  { value: 12, suffix: "+", label: "Countries Served" },
]

export function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <AnimatedGradient className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 md:p-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {statsData.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
