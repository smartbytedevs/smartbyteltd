"use client"

import { SafeSlideUp } from "@/components/common/SafeMotion"

const stats = [
  { value: "14+", label: "Services", num: 14, suffix: "+" },
  { value: "100%", label: "Responsive", num: 100, suffix: "%" },
  { value: "Modern", label: "Technology", num: null },
  { value: "AI", label: "Powered", num: null },
]

function AnimatedNumber({ target }) {
  return <span>{target}</span>
}

export function ServiceStats() {
  return (
    <div className="grid grid-cols-2 gap-4 mt-8">
      {stats.map((stat, i) => (
        <SafeSlideUp
          key={stat.label}
          delay={0.3 + i * 0.1}
          className="relative"
        >
          <div className="glass rounded-xl px-4 py-3 sm:px-5 sm:py-4">
            {stat.num ? (
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                <AnimatedNumber target={stat.value} />
              </span>
            ) : (
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                {stat.value}
              </span>
            )}
            <p className="text-xs sm:text-sm text-muted mt-0.5">{stat.label}</p>
          </div>
          <div className="absolute -inset-[1px] rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(139, 92, 246, 0.05))",
            }}
          />
        </SafeSlideUp>
      ))}
    </div>
  )
}
