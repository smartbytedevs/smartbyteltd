"use client"

import { useState, useCallback } from "react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { Calendar } from "lucide-react"
import { testimonials } from "./testimonials"
import { TestimonialCard } from "./TestimonialCard"
import { TestimonialStats } from "./TestimonialStats"
import { Particles } from "@/components/why-smartbyte/Particles"
import { PremiumCTA } from "@/components/ui/PremiumCTA"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { useQuoteModal } from "@/components/quote/QuoteModalContext"

const columnLayout = {
  left: [testimonials[0], testimonials[2], testimonials[4], testimonials[6]],
  right: [testimonials[1], testimonials[3], testimonials[5], testimonials[7]],
}

export function Testimonials() {
  const [activeCard, setActiveCard] = useState(null)
  const { openQuoteModal } = useQuoteModal()

  const handleHover = useCallback((id) => {
    setActiveCard(id)
  }, [])

  const handleLeave = useCallback(() => {
    setActiveCard(null)
  }, [])

  const isDimmed = useCallback(
    (id) => {
      return activeCard !== null && activeCard !== id
    },
    [activeCard]
  )

  return (
    <section
      id="testimonials"
      className="relative py-[140px] overflow-hidden bg-background"
    >
      {/* ═══ Background ═══ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(43,33,24,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(43,33,24,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gradient orbs */}
        <div
          className="absolute top-[5%] -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(180, 83, 9, 0.06), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute bottom-[20%] -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(160, 58, 30, 0.04), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(180, 83, 9, 0.03), transparent 70%)",
            filter: "blur(120px)",
          }}
        />

        {/* Light beams */}
        <div
          className="absolute top-0 left-[40%] w-px h-full opacity-[0.02]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(180, 83, 9, 0.2), transparent)",
          }}
        />

        {/* Noise */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px",
          }}
        />

        <Particles />
      </div>

      {/* ═══ Content ═══ */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[38%_62%] lg:gap-16 xl:gap-20">
          {/* ═══ LEFT — Sticky ═══ */}
          <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center lg:col-start-1">
            <div className="w-full py-12 lg:py-0 lg:pr-4">
              <SectionHeading
                asSafe
                label="Client Success"
                title={
                  <>
                    Trusted By<br />
                    Growing<br />
                    <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                      Businesses.
                    </span>
                  </>
                }
                description="We help startups and businesses launch digital products that customers love."
                maxWidth="460px"
              />

              {/* Stats */}
              <TestimonialStats />

              {/* CTA */}
              <SafeSlideUp delay={0.5}>
                <div className="relative mt-10">
                  <PremiumCTA
                    icon={Calendar}
                    showArrow
                    arrowMotion
                    scaleOnHover
                    onClick={() => openQuoteModal({ source: "home" })}
                  >
                    Start Your Project
                  </PremiumCTA>
                </div>
              </SafeSlideUp>
            </div>
          </div>

          {/* ═══ RIGHT — Masonry Grid ═══ */}
          <div className="lg:col-start-2 py-12 lg:py-0">
            {/* Desktop/Tablet: 2-column masonry */}
            <div
              className="hidden md:grid md:grid-cols-2 gap-5 lg:gap-6"
              onMouseLeave={handleLeave}
            >
              {/* Left column */}
              <div className="flex flex-col gap-5 lg:gap-6">
                {columnLayout.left.map((testimonial, i) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={i}
                    speed={0.04 + i * 0.015}
                    isDimmed={isDimmed(testimonial.id)}
                    onHover={handleHover}
                  />
                ))}
              </div>

              {/* Right column — push first card down for stagger */}
              <div className="flex flex-col gap-5 lg:gap-6 pt-0 lg:pt-10">
                {columnLayout.right.map((testimonial, i) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={i + 4}
                    speed={0.07 + i * 0.01}
                    isDimmed={isDimmed(testimonial.id)}
                    onHover={handleHover}
                  />
                ))}
              </div>
            </div>

            {/* Mobile: horizontal snap-scroll */}
            <div
              className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar"
              style={{ scrollPaddingLeft: "1rem" }}
            >
              {testimonials.map((testimonial, i) => (
                <div key={testimonial.id} className="snap-start shrink-0 w-[85vw] max-w-[360px]">
                  <TestimonialCard
                    testimonial={testimonial}
                    index={i}
                    speed={0}
                    isDimmed={false}
                    onHover={handleHover}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
