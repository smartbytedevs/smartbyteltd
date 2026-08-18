"use client"

import { motion } from "motion/react"
import { PremiumCTA } from "@/components/ui/PremiumCTA"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { ArrowRight } from "lucide-react"
import { useQuoteModal } from "@/components/quote/QuoteModalContext"

export function BlogFinalCTA() {
  const { openQuoteModal } = useQuoteModal()

  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full"
          animate={{ x: [0, 30, -20, 10, 0], y: [0, -20, 30, -10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle, rgba(0, 240, 255, 0.08), transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <motion.div
          className="absolute -bottom-48 -right-48 w-[600px] h-[600px] rounded-full"
          animate={{ x: [0, -30, 20, -10, 0], y: [0, 20, -30, 10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.06), transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
        <SafeSlideUp>
          <span className="text-xs sm:text-sm font-semibold tracking-label uppercase bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-6 block">
            Need More Than Advice?
          </span>
        </SafeSlideUp>

        <SafeSlideUp delay={0.1}>
          <h2 className="font-display text-hero font-bold tracking-display leading-[0.95] mb-6">
            Let&rsquo;s Build
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Your Business Together.
            </span>
          </h2>
        </SafeSlideUp>

        <SafeSlideUp delay={0.2}>
          <p className="text-base sm:text-lg text-muted max-w-xl mx-auto leading-relaxed mb-10">
            Ready to turn insights into action? Partner with SmartByte and build digital products that drive real results.
          </p>
        </SafeSlideUp>

        <SafeSlideUp delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4">
            <PremiumCTA showArrow size="lg" onClick={() => openQuoteModal({ source: "blog" })}>
              Book Consultation
            </PremiumCTA>
            <a
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full border border-border/40 text-foreground hover:bg-accent/[0.12] hover:border-accent/30 transition-all duration-300"
            >
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </SafeSlideUp>
      </div>
    </section>
  )
}
