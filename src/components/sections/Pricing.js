"use client"

import { Calendar } from "lucide-react"
import { plans } from "@/components/pricing/pricingData"
import { PricingCard } from "@/components/pricing/PricingCard"
import { PricingFeatureCompare } from "@/components/pricing/PricingFeatureCompare"
import { PricingNote } from "@/components/pricing/PricingNote"
import { PricingTrust } from "@/components/pricing/PricingTrust"
import { PremiumCTA } from "@/components/ui/PremiumCTA"
export function Pricing() {

  return (
    <section
      id="pricing"
      className="relative py-[120px] sm:py-[160px] overflow-hidden bg-[#F7F7F8]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-sm font-semibold tracking-label uppercase text-[#50FFAF] mb-5 block">
              Pricing
            </span>

            <h2 className="font-display text-section-title font-bold text-gray-900">
              Flexible Pricing
              <br />
              <span className="text-[#50FFAF]">
                For Every Business.
              </span>
            </h2>

            <p className="relative mt-4 text-base sm:text-lg text-gray-500 leading-relaxed">
              Whether you&apos;re launching your first business website or building a
              complete software ecosystem, we have a solution tailored to your goals.
            </p>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <PremiumCTA size="sm" showArrow onClick={() => (window.location.href = "/contact")}>
              Get Free Consultation
            </PremiumCTA>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 xl:gap-6">
          {plans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* Feature Comparison */}
        <PricingFeatureCompare />

        {/* Pricing Note */}
        <PricingNote />

        {/* Trust Stats */}
        <PricingTrust />
      </div>
    </section>
  )
}
