"use client"

import { forwardRef } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const Button = forwardRef(function Button(
  { className, variant = "primary", size = "md", children, ...props },
  ref
) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 cursor-pointer"

  const variants = {
    primary: "bg-accent text-background hover:bg-accent-hover shadow-lg shadow-accent/10",
    secondary: "border border-border/40 text-foreground hover:bg-white/455 hover:border-border/55",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-white/455",
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
