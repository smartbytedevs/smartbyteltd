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

const variants = {
  primary:
    "bg-gray-900 hover:bg-gray-800 text-white shadow-sm hover:shadow-md",
  accent:
    "bg-[#8ba4ff] hover:bg-[#7594e6] text-gray-900 shadow-sm hover:shadow-md",
}

const PremiumCTA = forwardRef(function PremiumCTA(
  {
    href,
    onClick,
    children,
    icon: Icon,
    variant = "primary",
    size = "md",
    showArrow = false,
    arrowMotion = false,
    className,
    ...props
  },
  ref
) {
  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
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
          <ArrowRight className="w-4 h-4 shrink-0" />
        </motion.span>
      )}

      {showArrow && !arrowMotion && (
        <span className="relative z-10">
          <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" />
        </span>
      )}
    </>
  )

  const classes = cn(
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full font-semibold tracking-nav transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#8ba4ff]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F7F8] hover:scale-[1.02] active:scale-[0.98]",
    sizes[size],
    variants[variant],
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
