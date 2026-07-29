"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function Textarea({
  label,
  id,
  value = "",
  onChange,
  onBlur,
  error,
  touched,
  required,
  icon: Icon,
  rows = 4,
  className,
}) {
  const [focused, setFocused] = useState(false)
  const hasValue = typeof value === "string" ? value.length > 0 : Boolean(value)
  const float = focused || hasValue
  const showError = touched && error
  const showSuccess = touched && !error && hasValue
  const withIcon = Boolean(Icon)

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "relative w-full rounded-[18px] transition-all duration-200",
          "bg-[rgba(12,18,34,0.55)] backdrop-blur-xl",
          "border",
          focused
            ? "border-accent/60 shadow-[0_0_40px_rgba(0,194,168,0.18)]"
            : showError
              ? "border-red-500/50"
              : "border-white/[0.08] hover:border-white/[0.15]"
        )}
      >
        {withIcon && (
          <div
            className={cn(
              "pointer-events-none absolute left-[20px] top-[20px] transition-colors duration-200",
              focused ? "text-accent" : "text-[rgba(255,255,255,0.28)]"
            )}
            aria-hidden="true"
          >
            <Icon className="h-[18px] w-[18px]" />
          </div>
        )}

        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false)
            onBlur?.(e)
          }}
          placeholder={label}
          required={required}
          rows={rows}
          className={cn(
            "peer min-h-[180px] w-full resize-y bg-transparent outline-none transition-all duration-200",
            "pt-[20px] pb-[8px]",
            withIcon ? "pl-[56px]" : "pl-[22px]",
            "pr-[22px]",
            "font-body text-sm text-foreground",
            "placeholder:opacity-0",
            "caret-accent"
          )}
          aria-invalid={showError ? "true" : "false"}
          aria-describedby={showError ? `${id}-error` : undefined}
        />

        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute z-10 select-none transition-all duration-200",
            withIcon ? "left-[56px]" : "left-[22px]",
            float
              ? [
                  "-top-[10px] translate-y-0 text-[12px] font-medium",
                  "bg-background px-2 rounded-full",
                  focused ? "text-accent" : showError ? "text-red-400" : "text-accent",
                ]
              : [
                  "top-[20px] text-sm",
                  showError ? "text-red-400/70" : "text-[rgba(255,255,255,0.28)]",
                ]
          )}
        >
          {label}
          {required && <span className="ml-0.5 text-accent">*</span>}
        </label>

        {showSuccess && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute right-[16px] top-[20px]"
          >
            <CheckCircle className="h-[18px] w-[18px] text-accent" />
          </motion.div>
        )}
        {showError && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute right-[16px] top-[20px]"
          >
            <AlertCircle className="h-[18px] w-[18px] text-red-400" />
          </motion.div>
        )}
      </div>

      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          id={`${id}-error`}
          role="alert"
          className="ml-[22px] mt-1.5 text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
