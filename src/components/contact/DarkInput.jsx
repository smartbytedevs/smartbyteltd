"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function DarkInput({
  label,
  id,
  type = "text",
  value = "",
  onChange,
  onBlur,
  error,
  touched,
  required,
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
          "relative h-[60px] w-full rounded-xl transition-all duration-300",
          "bg-[#2A2A2A]",
          focused
            ? "ring-2 ring-[#8ba4ff]/40"
            : showError
              ? "ring-2 ring-red-500/40"
              : "ring-1 ring-white/[0.06]"
        )}
      >
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
            "px-5 pt-[20px] pb-[8px]",
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
                  "top-1/2 -translate-y-1/2 text-sm",
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
