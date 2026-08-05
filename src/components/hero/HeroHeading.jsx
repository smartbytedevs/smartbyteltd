"use client"

import { Typewriter } from "@/components/ui/Typewriter"
import { SafeSlideUp } from "@/components/common/SafeMotion"

const phrases = [
  "Digital Products.",
  "Business Websites.",
  "Custom Software.",
  "SaaS Platforms.",
]

const lines = [
  { text: "We Build", style: "outlined" },
  { text: "", style: "rotating" },
]

const textClasses =
  "font-display text-hero font-bold text-foreground"

export function HeroHeading() {
  return (
    <div>
      <h1 className="space-y-0">
        {lines.map((line, i) => (
          <SafeSlideUp key={i} delay={0.3 + i * 0.2} viewportMargin="-100px" className="overflow-hidden">
            {line.style === "outlined" ? (
              <span
                className={`block ${textClasses} select-none`}
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1.2px rgba(28, 25, 23, 0.6)",
                }}
              >
                {line.text}
              </span>
            ) : (
              <span className="relative block">
                <Typewriter words={phrases} className={textClasses} />
              </span>
            )}
          </SafeSlideUp>
        ))}
      </h1>
    </div>
  )
}
