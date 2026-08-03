"use client"

import { ArrowRight, Calendar } from "lucide-react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { useQuoteModal } from "@/components/quote/QuoteModalContext"

export function HeroButtons() {
  const { openQuoteModal } = useQuoteModal()

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10">
      <SafeSlideUp delay={1.8} viewportMargin="-100px">
        <button
          type="button"
          onClick={() => openQuoteModal({ source: "home" })}
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 font-semibold text-sm tracking-nav transition-all duration-500"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-secondary opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              boxShadow: "0 0 30px rgba(0, 194, 168, 0.3), 0 0 60px rgba(56, 189, 248, 0.15)",
            }}
          />
          <span className="relative z-10 text-background flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Book Free Consultation
          </span>
          <span className="relative z-10">
            <ArrowRight className="w-4 h-4 text-background group-hover:translate-x-0.5 transition-transform duration-200" />
          </span>
        </button>
      </SafeSlideUp>

      <SafeSlideUp delay={1.95} viewportMargin="-100px">
        <a
          href="#work"
          className="group inline-flex items-center gap-3 rounded-full border border-white/10 px-8 py-4 font-semibold text-sm tracking-nav text-foreground/80 hover:text-foreground transition-all duration-500 hover:border-white/20"
        >
          <span className="flex items-center gap-2">
            View Portfolio
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </a>
      </SafeSlideUp>
    </div>
  )
}
