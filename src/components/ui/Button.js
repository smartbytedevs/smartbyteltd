"use client"

import { forwardRef } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const Button = forwardRef(function Button(
  { className, variant = "primary", size = "md", children, ...props },
  ref
) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

  const variants = {
    primary:
      "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-lg shadow-accent/15 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5",
    secondary:
      "border border-foreground/20 text-foreground hover:border-foreground/40 hover:bg-white/50 hover:-translate-y-0.5",
    ghost:
      "text-muted-foreground hover:text-foreground hover:bg-white/50",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const Comp = motion.button

  return (
    <Comp
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Comp>
  )
})

Button.displayName = "Button"
export { Button }
