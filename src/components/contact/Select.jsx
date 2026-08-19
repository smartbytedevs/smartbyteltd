"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { ChevronDown, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function Select({
  label,
  id,
  value = "",
  onChange,
  onBlur,
  error,
  touched,
  required,
  options = [],
  icon: Icon,
  className,
}) {
  const [focused, setFocused] = useState(false)
  const hasValue = value !== "" && value !== null && value !== undefined
  const float = focused || hasValue
  const showError = touched && error
  const showSuccess = touched && !error && hasValue
  const withIcon = Boolean(Icon)

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "relative h-[64px] w-full rounded-[18px] transition-all duration-200",
          "bg-white",
          "border",
          focused
            ? "border-[#50FFAF]/60 shadow-[0_0_0_4px_rgba(80,255,175,0.08)]"
            : showError
              ? "border-red-500/50"
              : "border-gray-200 hover:border-gray-300"
        )}
      >
        {withIcon && (
          <div
            className={cn(
              "pointer-events-none absolute left-[20px] top-1/2 -translate-y-1/2 transition-colors duration-200",
              focused ? "text-[#50FFAF]" : "text-gray-400"
            )}
            aria-hidden="true"
          >
            <Icon className="h-[18px] w-[18px]" />
          </div>
        )}

        <select
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false)
            onBlur?.(e)
          }}
          required={required}
          className={cn(
            "peer h-full w-full cursor-pointer appearance-none bg-transparent outline-none transition-all duration-200",
            "pt-[20px] pb-[8px]",
            withIcon ? "pl-[56px]" : "pl-[22px]",
            "pr-[52px]",
            "font-body text-sm transition-colors duration-200",
            hasValue
              ? "text-gray-900"
              : float
                ? "text-transparent"
                : "text-gray-900",
            "caret-[#50FFAF]"
          )}
          aria-invalid={showError ? "true" : "false"}
          aria-describedby={showError ? `${id}-error` : undefined}
        >
          <option value="" disabled className="bg-white text-gray-400">
            {`Select ${label}`}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-white text-gray-900">
              {opt}
            </option>
          ))}
        </select>

        <ChevronDown
          className={cn(
            "pointer-events-none absolute right-[20px] top-1/2 -translate-y-1/2 h-[18px] w-[18px] transition-all duration-200",
            float
              ? "rotate-180 text-[#50FFAF]"
              : "text-gray-400"
          )}
          aria-hidden="true"
        />

        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute z-10 select-none transition-all duration-200",
            withIcon ? "left-[56px]" : "left-[22px]",
            float
              ? [
                  "-top-[10px] translate-y-0 text-[12px] font-medium opacity-100",
                  "bg-white px-2 rounded-full",
                  focused
                    ? "text-[#50FFAF]"
                    : showError
                      ? "text-red-600"
                      : "text-gray-400",
                ]
              : [
                  "top-1/2 -translate-y-1/2 text-sm opacity-0",
                ]
          )}
        >
          {label}
          {required && <span className="ml-0.5 text-[#50FFAF]">*</span>}
        </label>

        {showSuccess && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute right-[44px] top-1/2 -translate-y-1/2"
          >
            <CheckCircle className="h-[18px] w-[18px] text-[#50FFAF]" />
          </motion.div>
        )}
        {showError && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute right-[44px] top-1/2 -translate-y-1/2"
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
