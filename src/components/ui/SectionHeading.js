"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { fadeUpSimple } from "@/lib/animations"
import { SafeSlideUp } from "@/components/common/SafeMotion"

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
  asSafe = false,
  maxWidth = "640px",
  labelGradient = true,
  as = "h2",
}) {
  const MotionWrapper = asSafe ? SafeSlideUp : motion.div
  const Tag = as

  const labelClasses = cn(
    "text-xs sm:text-sm font-semibold tracking-label uppercase mb-5 block",
    labelGradient
      ? "bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent"
      : "text-accent"
  )

  const descriptionClasses = cn(
    "relative mt-6 text-base sm:text-lg text-muted leading-relaxed",
    align === "center" && "mx-auto"
  )

  const maxWidthStyle = align === "center" ? {} : { maxWidth }

  return (
    <div
      className={cn(
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <MotionWrapper {...(asSafe ? { delay: 0 } : fadeUpSimple(0))}>
          <span className={labelClasses}>{label}</span>
        </MotionWrapper>
      )}

      {title && (
        <MotionWrapper {...(asSafe ? { delay: 0.1 } : fadeUpSimple(0.1))}>
          <Tag className="font-display text-section-title font-bold">{title}</Tag>
        </MotionWrapper>
      )}

      {description && (
        <MotionWrapper {...(asSafe ? { delay: 0.15 } : fadeUpSimple(0.15))}>
          <p className={descriptionClasses} style={maxWidthStyle}>
            {description}
          </p>
        </MotionWrapper>
      )}
    </div>
  )
}
