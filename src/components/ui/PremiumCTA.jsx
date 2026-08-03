"use client"

import { forwardRef } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const sizes = {
  sm: "px-6 py-3 text-sm",
  md: "px-8 py-4 text-sm",
  lg: "px-10 py-4 text-sm",
}

const glowShadows = {
  sm: "0 0 20px rgba(180, 83, 9, 0.2), 0 0 40px rgba(160, 58, 30, 0.1)",
  md: "0 0 30px rgba(180, 83, 9, 0.3), 0 0 60px rgba(160, 58, 30, 0.15)",
  lg: "0 0 40px rgba(180, 83, 9, 0.3), 0 0 80px rgba(160, 58, 30, 0.15)",
}

const PremiumCTA = forwardRef(function PremiumCTA(
  {
    href,
    onClick,
    children,
    icon: Icon,
    variant = "primary",
    size = "md",
    glow = "md",
    showArrow = false,
    arrowMotion = false,
    scaleOnHover = false,
    extraGlow = false,
    className,
    ...props
  },
  ref
) {
  const content = (
    <>
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-secondary opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ boxShadow: glowShadows[glow] }}
      />

      {extraGlow && (
        <span
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
          style={{
            boxShadow:
              "0 0 60px rgba(180, 83, 9, 0.15), 0 0 100px rgba(160, 58, 30, 0.08)",
            animation: "pulse-glow 3s ease-in-out infinite 1s",
          }}
        />
      )}

      <span className="relative z-10 text-background flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 shrink-0" />}
        {children}
      </span>

      {showArrow && arrowMotion && (
        <motion.span
          className="relative z-10"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-4 h-4 text-background shrink-0" />
        </motion.span>
      )}

      {showArrow && !arrowMotion && (
        <span className="relative z-10">
          <ArrowRight className="w-4 h-4 text-background shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" />
        </span>
      )}

      {scaleOnHover && (
        <motion.div
          className="absolute inset-0 rounded-full"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ pointerEvents: "none" }}
        />
      )}
    </>
  )

  const classes = cn(
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full font-semibold tracking-nav transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    sizes[size],
    className
  )

  const linkProps = onClick
    ? { onClick, role: "button" }
    : { href }

  const Tag = onClick ? "button" : "a"

  return (
    <Tag ref={ref} className={classes} {...linkProps} {...props}>
      {content}
    </Tag>
  )
})

PremiumCTA.displayName = "PremiumCTA"
export { PremiumCTA }
