"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { SafeReveal } from "@/components/common/SafeMotion"

export function TestimonialCard({ testimonial, index, onHover, isDimmed }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  const speed = 0.03
  const parallaxY = index % 2 === 0
    ? [speed * 60, -speed * 60]
    : [-speed * 60, speed * 60]

  return (
    <SafeReveal delay={0.1 * (index % 4)} viewportMargin="-50px">
      <motion.div
        ref={cardRef}
        className="relative h-full"
        onMouseEnter={() => onHover?.(testimonial.id)}
        animate={
          isInView
            ? { y: parallaxY }
            : { y: 0 }
        }
        transition={{
          duration: 10 + index * 2,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
        style={{ opacity: isDimmed ? 0.5 : 1 }}
      >
        <div
          className="relative h-full rounded-2xl p-6 sm:p-7 border border-border/30 transition-all duration-500"
          style={{
            background: "rgba(19, 26, 50, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Quote icon */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
            style={{
              background: "rgba(180, 83, 9, 0.06)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent/60"
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
          </div>

          {/* Quote text */}
          <p className="text-sm sm:text-base text-muted leading-relaxed mb-5 min-h-[80px]">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 pt-4 border-t border-border/30">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-foreground shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(180, 83, 9, 0.2), rgba(160, 58, 30, 0.1))",
              }}
            >
              {testimonial.initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {testimonial.name}
              </p>
              <p className="text-xs text-muted truncate">
                {testimonial.role}
                {testimonial.company && (
                  <>
                    <span className="mx-1.5 text-foreground/15">·</span>
                    {testimonial.company}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </SafeReveal>
  )
}
