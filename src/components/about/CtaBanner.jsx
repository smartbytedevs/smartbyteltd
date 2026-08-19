"use client"

import { MessageCircle } from "lucide-react"
import { SafeReveal, SafeSlideUp } from "@/components/common/SafeMotion"
import { PremiumCTA } from "@/components/ui/PremiumCTA"
export function CtaBanner() {

  return (
    <SafeReveal viewportMargin="-80px" className="relative mt-24 overflow-hidden rounded-3xl">
      <div className="absolute inset-0 rounded-3xl bg-[#111111]" />

      <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 text-center">
        <SafeSlideUp delay={0.2} viewportMargin="-80px">
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to Build
            <br />
            Something Amazing?
          </h3>
        </SafeSlideUp>

        <SafeSlideUp delay={0.25} viewportMargin="-80px">
          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto">
            Whether you need a business website, custom software or a complete digital
            transformation — we&apos;re ready to help.
          </p>
        </SafeSlideUp>

        <SafeSlideUp delay={0.3} viewportMargin="-80px">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <PremiumCTA
              variant="accent"
              showArrow
              onClick={() => (window.location.href = "/contact")}
            >
              Start Your Project
            </PremiumCTA>

            <button
              type="button"
              onClick={() => (window.location.href = "/contact")}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 font-semibold text-sm tracking-nav text-white hover:border-white/20 transition-all duration-300"
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
