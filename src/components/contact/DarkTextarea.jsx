"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function DarkTextarea({
  label,
  id,
  value = "",
  onChange,
  onBlur,
  error,
  touched,
  required,
  rows = 4,
  className,
}) {
  const [focused, setFocused] = useState(false)
  const hasValue = typeof value === "string" ? value.length > 0 : Boolean(value)
  const float = focused || hasValue
  const showError = touched && error

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "relative w-full rounded-xl transition-all duration-300",
          "bg-[#2A2A2A]",
          focused
            ? "ring-2 ring-[#8ba4ff]/40"
            : showError
              ? "ring-2 ring-red-500/40"
              : "ring-1 ring-white/[0.06]"
        )}
      >
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
            "peer min-h-[160px] w-full resize-y bg-transparent outline-none transition-all duration-200",
            "pt-[22px] pb-[8px] px-5",
            "text-sm text-white font-body",
            "placeholder:opacity-0 placeholder:text-gray-400",
            "caret-[#8ba4ff]"
          )}
          aria-invalid={showError ? "true" : "false"}
          aria-describedby={showError ? `${id}-error` : undefined}
        />

        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute z-10 select-none transition-all duration-200 left-5",
            float
              ? [
                  "-top-[10px] translate-y-0 text-[11px] font-medium",
                  "bg-[#2A2A2A] px-2 rounded-full",
                  focused
                    ? "text-[#8ba4ff]"
                    : showError
                      ? "text-red-400"
                      : "text-gray-400",
                ]
              : [
                  "top-[22px] text-sm",
                  showError ? "text-red-400/80" : "text-gray-400",
                ]
          )}
        >
          {label}
          {required && <span className="ml-0.5 text-[#8ba4ff]">*</span>}
        </label>
      </div>

      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          id={`${id}-error`}
          role="alert"
          className="ml-1 mt-1.5 text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
