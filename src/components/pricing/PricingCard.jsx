"use client"

import { useRef, useState, useCallback } from "react"
import { motion } from "motion/react"
import { Check } from "lucide-react"
import { SafeScale, SafeSlideUp } from "@/components/common/SafeMotion"
import { useQuoteModal } from "@/components/quote/QuoteModalContext"

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
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const { openQuoteModal } = useQuoteModal()

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setMousePos({ x: 0.5, y: 0.5 })
  }, [])

  const orbX = (mousePos.x - 0.5) * 100
  const orbY = (mousePos.y - 0.5) * 100

  return (
    <SafeScale delay={index * 0.1} viewportMargin="-60px">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative group/card"
        style={{ perspective: "1000px" }}
      >
        {/* Glow behind card */}
        <div
          className={`absolute -inset-3 rounded-[32px] opacity-0 transition-all duration-700 pointer-events-none ${
            isHovered ? "opacity-100" : ""
          }`}
          style={{
            background: plan.popular
              ? "radial-gradient(circle at 50% 0%, rgba(0, 194, 168, 0.15), rgba(56, 189, 248, 0.08), transparent 70%)"
              : "radial-gradient(circle at 50% 0%, rgba(0, 194, 168, 0.06), transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Card body */}
        <motion.div
          animate={isHovered ? { y: -8 } : { y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] overflow-hidden"
        >
          {/* Gradient border */}
          <div
            className={`absolute inset-0 rounded-[28px] transition-all duration-700 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            style={{
              padding: "1px",
              background: `linear-gradient(135deg, rgba(0, 194, 168, ${isHovered ? 0.5 : 0.2}), rgba(56, 189, 248, ${isHovered ? 0.3 : 0.1}), transparent 60%)`,
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* Glass background */}
          <div
            className="absolute inset-0 rounded-[28px] transition-all duration-700"
            style={{
              background: isHovered
                ? "rgba(11, 18, 40, 0.55)"
                : "rgba(11, 18, 40, 0.4)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: `1px solid ${
                isHovered
                  ? "rgba(0, 194, 168, 0.15)"
                  : plan.popular
                    ? "rgba(0, 194, 168, 0.12)"
                    : "rgba(255,255,255,0.06)"
              }`,
            }}
          />

          {/* Orb that follows mouse */}
          <div
            className="absolute w-48 h-48 rounded-full pointer-events-none transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 194, 168, 0.08), transparent 70%)",
              filter: "blur(50px)",
              left: `calc(50% + ${orbX}px - 96px)`,
              top: `calc(50% + ${orbY}px - 96px)`,
              opacity: isHovered ? 1 : 0,
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.015] rounded-[28px] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Popular badge */}
          {plan.popular && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
              <SafeSlideUp className="px-4 py-1.5 rounded-b-xl text-[9px] font-bold tracking-label uppercase bg-gradient-to-r from-accent to-accent-secondary text-background shadow-lg shadow-accent/20">
                Most Popular
              </SafeSlideUp>
            </div>
          )}

          {/* ═══ Content ═══ */}
          <div className="relative z-10 p-6 sm:p-7 lg:p-8">
            {/* Plan name + tagline */}
            <div className="mb-6">
              <h3
                className={`font-display text-lg sm:text-xl font-bold transition-colors duration-300 ${
                  isHovered ? "text-accent" : "text-foreground"
                }`}
              >
                {plan.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted/60 mt-1 leading-tight">
                {plan.tagline}
              </p>
            </div>

            {/* Price */}
            <div className="mb-6">
              {plan.priceLabel && (
                <span className="text-[10px] font-medium text-muted/40 tracking-label uppercase block mb-1">
                  {plan.priceLabel}
                </span>
              )}
              {plan.price === "Custom Quote" ? (
                <div className="space-y-1">
                  <span className="text-[10px] font-medium text-muted/40 tracking-label uppercase block">
                    Custom Quote
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-foreground block leading-tight">
                    {plan.tagline}
                  </span>
                </div>
              ) : (
                <motion.span
                  className="font-display text-3xl sm:text-4xl font-bold text-foreground block"
                  animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {plan.price}
                </motion.span>
              )}
            </div>

            {/* Divider */}
            <div
              className={`h-px mb-5 transition-all duration-500 ${
                isHovered
                  ? "bg-gradient-to-r from-accent/30 via-accent-secondary/20 to-transparent"
                  : "bg-white/[0.04]"
              }`}
            />

            {/* Features */}
            <ul className="space-y-2.5 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span
                    className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isHovered
                        ? "bg-accent/15 text-accent"
                        : "bg-white/[0.04] text-muted/40"
                    }`}
                  >
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span className="text-xs sm:text-sm text-muted/80 leading-snug">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <MagneticButton>
              <button
                type="button"
                onClick={() => openQuoteModal({ source: "pricing", heading: plan.cta })}
                className={`group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 font-semibold text-xs tracking-nav transition-all duration-500 cursor-pointer ${
                  plan.id === "custom"
                    ? "border border-white/[0.08] text-muted hover:text-foreground hover:border-white/20"
                    : ""
                }`}
              >
                {plan.id !== "custom" && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-secondary opacity-90 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    <span
                      className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700"
                      style={{
                        boxShadow:
                          "0 0 20px rgba(0, 194, 168, 0.2), 0 0 40px rgba(56, 189, 248, 0.1)",
                      }}
                    />
                    <span className="relative z-10 text-background">
                      {plan.cta}
                    </span>
                  </>
                )}
                {plan.id === "custom" && (
                  <span className="relative z-10 flex items-center gap-2">
                    {plan.cta}
                    <span className="text-accent group-hover/btn:translate-x-0.5 transition-transform duration-300">
                      →
                    </span>
                  </span>
                )}
              </button>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </SafeScale>
  )
}
