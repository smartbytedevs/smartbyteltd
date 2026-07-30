"use client"

import { motion } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { PremiumCTA } from "@/components/ui/PremiumCTA"
import { Particles } from "@/components/why-smartbyte/Particles"
import { MessageSquare, ArrowRight, Send } from "lucide-react"

export function TemplatesFinalCTA() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20" style={{
          background: "radial-gradient(circle, rgba(0, 194, 168, 0.06), transparent 70%)",
          filter: "blur(120px)",
        }} />
        <div className="absolute top-1/3 right-[10%] w-[400px] h-[400px] rounded-full opacity-15" style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.04), transparent 70%)",
          filter: "blur(120px)",
        }} />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }} />
        <Particles />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <SafeSlideUp delay={0.1}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 border border-white/[0.06] flex items-center justify-center mx-auto mb-8">
              <MessageSquare className="w-8 h-8 text-accent" />
            </div>
          </SafeSlideUp>

          <SafeSlideUp delay={0.2}>
            <h2 className="font-display text-section-title font-bold leading-[1]">
              Need Something
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                Completely Unique?
              </span>
            </h2>
          </SafeSlideUp>

          <SafeSlideUp delay={0.3}>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-xl mx-auto leading-relaxed">
              Our team specializes in building fully custom digital solutions tailored to your
              exact business requirements. Let&apos;s create something extraordinary together.
            </p>
          </SafeSlideUp>

          <SafeSlideUp delay={0.4}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <PremiumCTA href="/contact?source=templates" icon={MessageSquare} showArrow>
                Book Consultation
              </PremiumCTA>
              <a
                href="/contact?source=templates"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full border border-white/10 text-foreground hover:bg-white/5 hover:border-white/20 transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                Contact SmartByte
              </a>
            </div>
          </SafeSlideUp>
        </div>
      </div>
    </section>
  )
}
