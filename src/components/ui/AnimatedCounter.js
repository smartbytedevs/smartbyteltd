"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

export function AnimatedCounter({ value, suffix = "", label, variant = "light" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const springValue = useSpring(0, { stiffness: 50, damping: 20 })

  useEffect(() => {
    if (isInView) {
      springValue.set(value)
    }
  }, [isInView, value, springValue])

  const isDark = variant === "dark"

  return (
    <div ref={ref} className="text-center">
      <motion.div className={cn(
        "font-display text-5xl md:text-6xl font-bold mb-2",
        isDark ? "text-white" : "text-gray-900"
      )}>
        <motion.span>{springValue}</motion.span>
        <span className="text-[#50FFAF]">{suffix}</span>
      </motion.div>
      <p className={cn("text-lg", isDark ? "text-gray-400" : "text-gray-500")}>{label}</p>
    </div>
  )
}
