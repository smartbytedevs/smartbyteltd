"use client"

import { SafeSlideUp, SafeCounter, SafeReveal } from "@/components/common/SafeMotion"
import { trustStats } from "./pricingData"

function AnimatedStat({ value, suffix, label, delay }) {
  return (
    <SafeSlideUp delay={delay} className="text-center">
      <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-none">
        <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
          <SafeCounter value={value} suffix={suffix} />
        </span>
      </div>
      <p className="text-xs sm:text-sm text-muted mt-1.5">{label}</p>
    </SafeSlideUp>
  )
}

export function PricingTrust() {
  return (
    <SafeReveal className="mt-20 lg:mt-24">
      <div
        className="relative rounded-3xl border border-border/25 overflow-hidden"
        style={{
          background: "rgba(11, 18, 40, 0.2)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="absolute inset-0 grid grid-cols-2 lg:grid-cols-4 pointer-events-none">
          <div className="border-r border-border/25 lg:border-r-0" />
          <div className="hidden lg:block border-r border-border/25" />
          <div className="hidden lg:block border-r border-border/25" />
        </div>

        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 px-8 py-10 sm:px-12 sm:py-14">
          {trustStats.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={0.15 + i * 0.08}
            />
          ))}
        </div>
      </div>
    </SafeReveal>
  )
}
