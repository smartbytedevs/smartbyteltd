"use client"

import { SafeSlideUp, SafeCounter, SafeReveal } from "@/components/common/SafeMotion"
import { trustStats } from "./contactData"

function AnimatedStat({ value, suffix, label, delay }) {
  return (
    <SafeSlideUp delay={delay} className="text-center">
      <div className="font-display text-3xl font-bold leading-none tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        <span>
          <SafeCounter value={value} suffix={suffix} />
        </span>
      </div>
      <p className="mt-1.5 text-xs text-muted sm:text-sm">{label}</p>
    </SafeSlideUp>
  )
}

export function TrustBar() {
  return (
    <SafeReveal className="mt-20 lg:mt-24">
      <div
        className="relative overflow-hidden rounded-3xl border border-border/25"
        style={{
          background: "rgba(11, 18, 40, 0.2)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 grid grid-cols-2 lg:grid-cols-4">
          <div className="border-r border-border/25" />
          <div className="hidden border-r border-border/25 lg:block" />
          <div className="hidden border-r border-border/25 lg:block" />
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8 px-8 py-10 lg:grid-cols-4 sm:px-12 sm:py-14">
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
