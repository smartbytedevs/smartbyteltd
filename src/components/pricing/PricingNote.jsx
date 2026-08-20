"use client"

import { Shield, Info } from "lucide-react"
import { SafeReveal, SafeSlideUp } from "@/components/common/SafeMotion"
export function PricingNote() {

  return (
    <SafeReveal
      viewportMargin="-60px"
      className="relative mt-24 lg:mt-28 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
    >
      <div className="relative z-10 px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Icon */}
          <div className="shrink-0">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-[#8ba4ff]/20 bg-[#8ba4ff]/10">
              <Shield className="w-6 h-6 text-[#8ba4ff]" />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 max-w-3xl">
            <SafeSlideUp delay={0.15} viewportMargin="-60px">
              <h4 className="font-display text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Every Project Is Different
              </h4>
            </SafeSlideUp>
            <SafeSlideUp delay={0.2} viewportMargin="-60px">
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                Every business has unique requirements. The prices above are starting points.
                Final pricing depends on features, integrations, complexity and timeline.
                We always provide a free consultation before giving a quotation.
              </p>
            </SafeSlideUp>
          </div>

          {/* Hint */}
          <SafeSlideUp delay={0.3} viewportMargin="-60px" className="shrink-0">
            <button
              type="button"
              onClick={() => (window.location.href = "/contact")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-900 font-semibold tracking-nav text-white transition-all duration-300 hover:bg-gray-800 hover:-translate-y-0.5 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] font-semibold tracking-nav">
                Free Consultation
              </span>
            </button>
          </SafeSlideUp>
        </div>
      </div>
    </SafeReveal>
  )
}
