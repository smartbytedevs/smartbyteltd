"use client"

import { useRef, useState, useCallback } from "react"
import { motion } from "motion/react"
import { Check } from "lucide-react"
import { SafeScale, SafeSlideUp } from "@/components/common/SafeMotion"

function MagneticButton({ children, className }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25
      setPos({ x, y })
    },
    []
  )

  const handleMouseLeave = useCallback(() => setPos({ x: 0, y: 0 }), [])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function PricingCard({ plan, index }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <SafeScale delay={index * 0.1} viewportMargin="-60px">
      <div
        className="relative group/card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={isHovered ? { y: -8 } : { y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`relative rounded-[28px] overflow-hidden bg-white border transition-all duration-300 ${
            plan.popular
              ? "border-[#50FFAF]/40 shadow-md"
              : "border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300"
          }`}
        >
          {/* Popular badge */}
          {plan.popular && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
              <SafeSlideUp className="px-4 py-1.5 rounded-b-xl text-[9px] font-bold tracking-label uppercase bg-gray-900 text-white shadow-lg">
                Most Popular
              </SafeSlideUp>
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-7 lg:p-8">
            {/* Plan name + tagline */}
            <div className="mb-6">
              <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900">
                {plan.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-tight">
                {plan.tagline}
              </p>
            </div>

            {/* Price */}
            <div className="mb-6">
              {plan.priceLabel && (
                <span className="text-[10px] font-medium text-gray-400 tracking-label uppercase block mb-1">
                  {plan.priceLabel}
                </span>
              )}
              {plan.price === "Custom Quote" ? (
                <div className="space-y-1">
                  <span className="text-[10px] font-medium text-gray-400 tracking-label uppercase block">
                    Custom Quote
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-gray-900 block leading-tight">
                    {plan.tagline}
                  </span>
                </div>
              ) : (
                <motion.span
                  className="font-display text-3xl sm:text-4xl font-bold text-gray-900 block"
                  animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {plan.price}
                </motion.span>
              )}
            </div>

            {/* Divider */}
            <div className="h-px mb-5 bg-gray-100" />

            {/* Features */}
            <ul className="space-y-2.5 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center bg-[#50FFAF]/15 text-[#50FFAF]">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600 leading-snug">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <MagneticButton>
              <button
                type="button"
                onClick={() => {
                  const params = new URLSearchParams()
                  params.set("source", "pricing")
                  params.set("heading", plan.cta)
                  window.location.href = `/contact?${params.toString()}`
                }}
                className={`group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 font-semibold text-xs tracking-nav transition-all duration-300 w-full cursor-pointer ${
                  plan.popular
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "border border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900"
                }`}
              >
                {plan.cta}
              </button>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </SafeScale>
  )
}
