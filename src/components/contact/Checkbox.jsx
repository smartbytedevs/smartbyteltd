"use client"

import { motion } from "motion/react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function Checkbox({
  id,
  checked = false,
  onChange,
  onBlur,
  error,
  touched,
  label,
  className,
}) {
  const showError = touched && error

  return (
    <div className={cn("relative", className)}>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 group">
        <div className="relative mt-0.5 shrink-0">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            onBlur={onBlur}
            className="sr-only peer"
            aria-invalid={showError ? "true" : "false"}
            aria-describedby={showError ? `${id}-error` : undefined}
          />
          <div
            className={cn(
              "flex h-[20px] w-[20px] items-center justify-center rounded-[6px] border transition-all duration-250",
              checked
                ? "border-accent bg-accent/20"
                : showError
                    ? "border-red-500/50 bg-accent/[0.04]"
                    : "border-border bg-accent/[0.04] group-hover:border-accent/40"
            )}
          >
            {checked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Check className="h-[12px] w-[12px] text-accent" />
              </motion.div>
            )}
          </div>
        </div>
        <span className="select-none text-sm text-muted transition-colors duration-250 group-hover:text-foreground/80">
          {label}
          <span className="ml-0.5 text-accent">*</span>
        </span>
      </label>

      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          id={`${id}-error`}
          role="alert"
          className="ml-[32px] mt-1 text-xs text-red-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
