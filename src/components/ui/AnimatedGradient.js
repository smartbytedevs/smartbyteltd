"use client"

import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

export function AnimatedGradient({ className, size = "md" }) {
  const prefersReduced = useReducedMotion()
  const sizes = {
    sm: "w-64 h-64",
    md: "w-96 h-96",
    lg: "w-[600px] h-[600px]",
  }

  return (
    <motion.div
      className={cn("absolute rounded-full opacity-20 blur-3xl pointer-events-none", sizes[size], className)}
      {...(!prefersReduced && {
        animate: {
          x: [0, 50, -30, 20, 0],
          y: [0, -40, 20, -50, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        },
        transition: {
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        },
      })}
      style={{
        background:
          "radial-gradient(circle, rgba(0,240,255,0.4) 0%, rgba(139,92,246,0.3) 40%, rgba(0,240,255,0.2) 70%, transparent 100%)",
      }}
    />
  )
}
