"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function Input({
  label,
  id,
  type = "text",
  value = "",
  onChange,
  onBlur,
  error,
  touched,
  required,
  icon: Icon,
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
          "relative h-[64px] w-full rounded-[18px] transition-all duration-200",
          "bg-white/60 backdrop-blur-xl",
          "border",
          focused
            ? "border-accent/60 shadow-[0_0_0_4px_rgba(15,118,110,0.08)]"
            : showError
              ? "border-red-500/50"
              : "border-border/35 hover:border-border-hover"
        )}
      >
        {withIcon && (
          <div
            className={cn(
              "pointer-events-none absolute left-[20px] top-1/2 -translate-y-1/2 transition-colors duration-200",
              focused ? "text-accent" : "text-muted-foreground"
            )}
            aria-hidden="true"
          >
            <Icon className="h-[18px] w-[18px]" />
          </div>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false)
            onBlur?.(e)
          }}
          placeholder={label}
          required={required}
          autoComplete={
            type === "email" ? "email" : type === "tel" ? "tel" : "off"
          }
          className={cn(
            "peer h-full w-full bg-transparent outline-none transition-all duration-200",
            "pt-[20px] pb-[8px]",
            withIcon ? "pl-[56px]" : "pl-[22px]",
            "pr-[22px]",
            "font-body text-sm text-foreground",
            "placeholder:opacity-0 placeholder:text-muted-foreground",
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
                  focused ? "text-accent" : showError ? "text-red-600" : "text-muted-foreground",
                ]
              : [
                  "top-1/2 -translate-y-1/2 text-sm",
                  showError ? "text-red-600/80" : "text-muted-foreground",
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
            className="absolute right-[16px] top-1/2 -translate-y-1/2"
          >
            <CheckCircle className="h-[18px] w-[18px] text-accent" />
          </motion.div>
        )}
        {showError && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute right-[16px] top-1/2 -translate-y-1/2"
          >
            <AlertCircle className="h-[18px] w-[18px] text-red-600" />
          </motion.div>
        )}
      </div>

      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          id={`${id}-error`}
          role="alert"
          className="ml-[22px] mt-1.5 text-xs text-red-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
