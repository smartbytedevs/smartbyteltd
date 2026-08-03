"use client"

import { SafeSlideUp, SafeReveal } from "@/components/common/SafeMotion"

export function AboutValues({ values }) {
  return (
    <div className="mt-20">
      <SafeSlideUp className="text-xs font-semibold tracking-label uppercase text-foreground/40 mb-6 block">
        Our Values
      </SafeSlideUp>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {values.map((item, i) => {
          const Icon = item.icon
          const offset = i % 2 === 1 ? "sm:mt-8" : ""

          return (
            <SafeReveal
              key={item.id}
              delay={0.15 + i * 0.1}
              viewportMargin="-50px"
              className={`group relative overflow-hidden rounded-2xl p-6 ${offset}`}
            >
              <div
                className="absolute inset-0 rounded-2xl border border-border/30 transition-colors duration-500"
                style={{
                  background: "rgba(255, 247, 236, 0.7)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              />

              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(180, 83, 9, 0.04), transparent 70%)",
                }}
              />

              <div
                className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(180, 83, 9, 0.06), rgba(160, 58, 30, 0.03))",
                  filter: "blur(16px)",
                  zIndex: -1,
                }}
              />

              <div className="relative z-10">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent/15 to-accent-secondary/15 border border-border/25 flex items-center justify-center mb-4">
                  <Icon className="w-4.5 h-4.5 text-accent" />
                </div>

                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </SafeReveal>
          )
        })}
      </div>
    </div>
  )
}
