"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useSpring } from "motion/react"

export function AnimatedCounter({ value, suffix = "", label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const springValue = useSpring(0, { stiffness: 50, damping: 20 })

  useEffect(() => {
    if (isInView) {
      springValue.set(value)
    }
  }, [isInView, value, springValue])

  return (
    <div ref={ref} className="text-center">
      <motion.div className="font-display text-5xl md:text-6xl font-bold mb-2">
        <motion.span>{springValue}</motion.span>
        <span className="gradient-text">{suffix}</span>
      </motion.div>
      <p className="text-zinc-400 text-lg">{label}</p>
    </div>
  )
}
