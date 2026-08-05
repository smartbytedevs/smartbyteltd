"use client"

import { useState, useRef } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useQuoteModal } from "@/components/quote/QuoteModalContext"

export function CTAButton({ onClick, mobile }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const buttonRef = useRef(null)
  const prefersReduced = useReducedMotion()
  const { openQuoteModal } = useQuoteModal()

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const size = mobile
    ? "w-full px-8 py-4 text-sm"
    : "px-6 py-2.5 text-xs"

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={() => {
        onClick?.()
        openQuoteModal({ source: "navbar" })
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePos({ x: 50, y: 50 })
      }}
      onMouseMove={handleMouseMove}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-nav uppercase outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${size}`}
      aria-label="Start Your Project"
    >
      {/* Glass background */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 118, 110, 0.16), rgba(14, 116, 144, 0.12))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />

      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ padding: "1px" }}
      >
        <motion.div
          className="w-full h-full rounded-full"
          animate={
            prefersReduced
              ? { background: "linear-gradient(135deg, rgba(15,118,110,0.35), rgba(14,116,144,0.35))" }
              : {
                  background: isHovered
                    ? "linear-gradient(135deg, rgba(15,118,110,0.6), rgba(14,116,144,0.6), rgba(15,118,110,0.6))"
                    : "linear-gradient(135deg, rgba(15,118,110,0.35), rgba(14,116,144,0.35), rgba(15,118,110,0.35))",
                  backgroundSize: "200% 200%",
                  backgroundPosition: isHovered ? "100% 50%" : "0% 50%",
                }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ mask: "linear-gradient(#fff 0 0) content-box", maskComposite: "exclude", WebkitMaskComposite: "xor" }}
        />
      </motion.div>

      {/* Spotlight overlay */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: isHovered
            ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(15, 118, 110, 0.18), transparent 60%)`
            : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow shadow */}
      <motion.div
        className="absolute -inset-1 rounded-full pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered
            ? "0 0 30px rgba(15, 118, 110, 0.25), 0 0 60px rgba(14, 116, 144, 0.15)"
            : "0 0 0px transparent",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Button content */}
      <motion.span
        className="relative z-10 text-foreground"
        animate={
          prefersReduced
            ? {}
            : {
                x: isHovered ? -4 : 0,
              }
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        Start Your Project
      </motion.span>

      <motion.span
        className="relative z-10 inline-flex"
        animate={
          prefersReduced
            ? {}
            : {
                x: isHovered ? 4 : 0,
              }
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <ArrowRight className={`${mobile ? "w-4 h-4" : "w-3.5 h-3.5"} text-accent`} />
      </motion.span>
    </button>
  )
}
