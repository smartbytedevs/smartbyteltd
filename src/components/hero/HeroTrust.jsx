"use client"

import { Check, Zap, Shield, Clock } from "lucide-react"
import { SafeSlideUp } from "@/components/common/SafeMotion"

const items = [
  { icon: Check, label: "Trusted by Growing Businesses" },
  { icon: Zap, label: "Fast Delivery" },
  { icon: Shield, label: "Modern Technology" },
  { icon: Clock, label: "Long-Term Support" },
]

export function HeroTrust() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10">
      {items.map((item, i) => {
        const Icon = item.icon
        return (
          <SafeSlideUp key={item.label} delay={2.3 + i * 0.1} viewportMargin="-100px" className="flex items-center gap-2 text-xs text-muted font-medium tracking-nav">
            <Icon className="w-3.5 h-3.5 text-accent" />
            {item.label}
          </SafeSlideUp>
        )
      })}
    </div>
  )
}
