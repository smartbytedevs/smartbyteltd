"use client"

import { SafeSlideUp, SafeCounter } from "@/components/common/SafeMotion"

function AnimatedStat({ value, suffix, label, delay }) {
  return (
    <SafeSlideUp delay={delay}>
      <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
        <SafeCounter value={value} suffix={suffix} />
      </div>
      <p className="text-sm text-gray-500 mt-0.5 leading-snug">{label}</p>
    </SafeSlideUp>
  )
}

export function TestimonialStats() {
  return (
    <div className="grid grid-cols-2 gap-y-8 gap-x-6 mt-10">
      <AnimatedStat value={98} suffix="%" label="Client Satisfaction" delay={0.3} />
      <AnimatedStat value={45} suffix="+" label="Projects Delivered" delay={0.35} />
      <AnimatedStat value={15} suffix="+" label="Business Solutions" delay={0.4} />
      <AnimatedStat value={5} suffix=" Days" label="Average Delivery" delay={0.45} />
    </div>
  )
}
