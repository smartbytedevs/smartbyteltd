"use client"

import { Shield, Info } from "lucide-react"
import { SafeReveal, SafeSlideUp } from "@/components/common/SafeMotion"

export function PricingNote() {
  return (
    <SafeReveal viewportMargin="-60px" className="relative mt-24 lg:mt-28 overflow-hidden rounded-3xl">
      {/* Glass background */}
      <div
        className="absolute inset-0 rounded-3xl border border-border/30"
        style={{
          background: "rgba(11, 18, 40, 0.35)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, rgba(180, 83, 9, 0.06), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle, rgba(160, 58, 30, 0.04), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.015] rounded-3xl"
        style={{
          backgroundImage:
            "linear-gradient(rgba(43,33,24,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(43,33,24,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Icon */}
          <div className="shrink-0">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center border border-border/30"
              style={{
                background: "rgba(180, 83, 9, 0.06)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <Shield className="w-6 h-6 text-accent" />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 max-w-3xl">
            <SafeSlideUp delay={0.15} viewportMargin="-60px">
              <h4 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">
                Every Project Is Different
              </h4>
            </SafeSlideUp>
            <SafeSlideUp delay={0.2} viewportMargin="-60px">
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                Every business has unique requirements. The prices above are starting points.
                Final pricing depends on features, integrations, complexity and timeline.
                We always provide a free consultation before giving a quotation.
              </p>
            </SafeSlideUp>
          </div>

          {/* Hint */}
          <SafeSlideUp delay={0.3} viewportMargin="-60px" className="shrink-0">
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/30"
              style={{
                background: "rgba(255, 247, 236, 0.6)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <Info className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] font-semibold tracking-nav text-muted">
                Free Consultation
              </span>
            </div>
          </SafeSlideUp>
        </div>
      </div>
    </SafeReveal>
  )
}
