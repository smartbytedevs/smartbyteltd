"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { SafeReveal } from "@/components/common/SafeMotion"

export function AboutTimeline({ milestones }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const lineScale = useTransform(scrollYProgress, [0, 0.9], [0, 1])

  return (
    <div ref={ref} className="relative">
      {/* Timeline line */}
      <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-white/[0.06]">
        <motion.div
          className="w-full origin-top bg-gradient-to-b from-accent via-accent-secondary to-accent"
          style={{ scaleY: lineScale, height: "100%" }}
        />
      </div>

      {/* Milestones */}
      <div className="space-y-16 pl-14">
        {milestones.map((item, i) => (
          <SafeReveal
            key={item.year}
            delay={i * 0.12}
            viewportMargin="-80px"
            from={{ opacity: 0, x: -24, blur: 6 }}
            className="relative"
          >
            {/* Node */}
            <motion.div
              className="absolute -left-[43px] top-1.5 w-[9px] h-[9px] rounded-full"
              style={{
                background: "linear-gradient(135deg, #00C2A8, #38BDF8)",
                boxShadow: "0 0 12px rgba(0, 194, 168, 0.3)",
              }}
              whileInView={{ scale: [0, 1.2, 1] }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 + 0.3, duration: 0.5 }}
            />

            {/* Year */}
            <span className="text-xs font-semibold tracking-label uppercase text-accent/80 mb-2 block">
              {item.year}
            </span>

            {/* Title */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-muted leading-relaxed max-w-md">
              {item.description}
            </p>
          </SafeReveal>
        ))}
      </div>
    </div>
  )
}
