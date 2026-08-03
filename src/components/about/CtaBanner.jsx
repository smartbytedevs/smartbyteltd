"use client"

import { MessageCircle } from "lucide-react"
import { SafeReveal, SafeSlideUp } from "@/components/common/SafeMotion"
import { PremiumCTA } from "@/components/ui/PremiumCTA"
import { useQuoteModal } from "@/components/quote/QuoteModalContext"

export function CtaBanner() {
  const { openQuoteModal } = useQuoteModal()

  return (
    <SafeReveal viewportMargin="-80px" className="relative mt-24 overflow-hidden rounded-3xl">
      {/* Background */}
      <div
        className="absolute inset-0 rounded-3xl border border-white/[0.06]"
        style={{
          background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 194, 168, 0.08), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.05), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 text-center">
        <SafeSlideUp delay={0.2} viewportMargin="-80px">
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Ready to Build
            <br />
            Something Amazing?
          </h3>
        </SafeSlideUp>

        <SafeSlideUp delay={0.25} viewportMargin="-80px">
          <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed max-w-xl mx-auto">
            Whether you need a business website, custom software or a complete digital
            transformation — we&apos;re ready to help.
          </p>
        </SafeSlideUp>

        <SafeSlideUp delay={0.3} viewportMargin="-80px">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <PremiumCTA showArrow onClick={() => openQuoteModal({ source: "about" })}>
              Start Your Project
            </PremiumCTA>

            {/* Secondary CTA */}
            <button
              type="button"
              onClick={() => openQuoteModal({ source: "about" })}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.08] font-semibold text-sm tracking-nav text-muted hover:text-foreground hover:border-white/20 transition-all duration-500"
            >
              <MessageCircle className="w-4 h-4" />
              Let&apos;s Talk
            </button>
          </div>
        </SafeSlideUp>
      </div>
    </SafeReveal>
  )
}
