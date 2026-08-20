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
        {/* Panel Background */}
        <div className="relative rounded-3xl border border-gray-200 bg-white overflow-hidden transition-shadow duration-300 group-hover:shadow-md">
          {/* Content */}
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
                    "w-20 h-20 sm:w-24 sm:h-24 bg-[#8ba4ff]/10 border border-[#8ba4ff]/20 flex items-center justify-center",
                    shapes[index]
                  )}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg">
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
                    "text-gray-200"
                  )}
                >
                  {item.number}
                </span>

                {/* Title */}
                <h3
                  className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] mt-2 text-gray-900"
                >
                  {item.title}
                </h3>

                {/* Description */}
                <motion.p
                  className={cn(
                    "text-sm sm:text-base text-gray-500 leading-relaxed mt-3 max-w-md",
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
                    "text-[#8ba4ff]",
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

        {/* Focus ring */}
        <div className="absolute inset-0 rounded-3xl ring-2 ring-[#8ba4ff]/50 opacity-0 focus-visible:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </SafeReveal>
  )
}
