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
    primary: "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10",
    secondary: "border border-white/10 text-white hover:bg-white/5 hover:border-white/20",
    ghost: "text-white/70 hover:text-white hover:bg-white/5",
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
