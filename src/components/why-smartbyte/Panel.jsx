"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { SafeReveal } from "@/components/common/SafeMotion"
import {
  Briefcase,
  Layers,
  MessageCircle,
  ShieldCheck,
  Monitor,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

const icons = [
  Briefcase,
  Layers,
  MessageCircle,
  ShieldCheck,
  Monitor,
  TrendingUp,
]

const shapes = [
  "rounded-2xl rotate-45",
  "rounded-xl",
  "rounded-full",
  "rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]",
  "rounded-lg",
  "rounded-[40%_60%_65%_35%_/_40%_45%_55%_60%]",
]

export function Panel({ item, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const isEven = index % 2 === 0
  const Icon = icons[index]

  return (
    <SafeReveal
      delay={index * 0.12}
      className={cn(
        "w-full",
        isEven ? "lg:mr-auto lg:pr-12" : "lg:ml-auto lg:pl-12"
      )}
    >
      <div
        className="group relative outline-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        tabIndex={0}
        role="article"
        aria-label={`${item.number}: ${item.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setIsHovered((prev) => !prev)
          }
        }}
      >
        {/* ── Panel Background ── */}
        <div className="relative rounded-3xl border border-accent/15 bg-accent/[0.05] backdrop-blur-sm overflow-hidden">
          {/* Liquid gradient overlay - expands from left */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(139, 92, 246, 0.04))",
            }}
            animate={{
              clipPath: isHovered
                ? "inset(0 0% 0 0 round 24px)"
                : "inset(0 100% 0 0 round 24px)",
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 30,
              mass: 0.9,
            }}
          />

          {/* Glass overlay glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{
              boxShadow: isHovered
                ? "inset 0 0 60px rgba(0, 240, 255, 0.06), 0 0 80px rgba(139, 92, 246, 0.04)"
                : "inset 0 0 0px transparent",
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* ── Content ── */}
          <div className="relative z-10 p-8 sm:p-10 lg:p-12">
            <div
              className={cn(
                "flex flex-col sm:flex-row items-start gap-8 sm:gap-10 lg:gap-14",
                !isEven && "sm:flex-row-reverse"
              )}
            >
              {/* Illustration */}
              <motion.div
                className="flex-shrink-0"
                animate={{
                  rotate: isHovered ? (isEven ? -8 : 8) : 0,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
              >
                <div
                  className={cn(
                    "w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-accent/15 to-accent-secondary/10 border border-border/30 flex items-center justify-center",
                    shapes[index]
                  )}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-lg shadow-accent/20">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Text */}
              <div className={cn("flex-1 min-w-0", !isEven && "sm:text-right")}>
                {/* Number */}
                <span
                  className={cn(
                    "font-display block text-[5rem] sm:text-[7rem] lg:text-[9rem] font-bold leading-[0.75] tracking-[-0.06em] select-none",
                    "text-foreground/10"
                  )}
                >
                  {item.number}
                </span>

                {/* Title */}
                <h3
                  className={cn(
                    "font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] mt-2",
                    "text-foreground"
                  )}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <motion.p
                  className={cn(
                    "text-sm sm:text-base text-muted leading-relaxed mt-3 max-w-md",
                    !isEven && "sm:ml-auto"
                  )}
                  animate={{
                    y: isHovered ? -3 : 0,
                    opacity: isHovered ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.description}
                </motion.p>

                {/* CTA arrow */}
                <motion.div
                  className={cn(
                    "inline-flex items-center gap-3 mt-5 text-sm font-semibold tracking-wide",
                    "text-accent",
                    !isEven && "sm:flex-row-reverse sm:ml-auto"
                  )}
                  animate={{
                    x: isHovered ? (isEven ? 6 : -6) : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                >
                  <span>Explore Service</span>
                  <motion.span
                    animate={{ x: isHovered ? (isEven ? 4 : -4) : 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 25,
                    }}
                    className="inline-block"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Glow border on hover */}
        <motion.div
          className="absolute -inset-[1px] rounded-3xl pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
            boxShadow: isHovered
              ? "0 0 30px rgba(0, 240, 255, 0.08), 0 0 60px rgba(139, 92, 246, 0.04)"
              : "0 0 0px transparent",
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Focus ring */}
        <div className="absolute inset-0 rounded-3xl ring-2 ring-accent/50 opacity-0 focus-visible:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </SafeReveal>
  )
}
