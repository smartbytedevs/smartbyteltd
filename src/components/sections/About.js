"use client"

import { motion } from "motion/react"
import { values, team } from "@/components/about/aboutData"
import { TransformationJourney } from "@/components/about/TransformationJourney"
import { AboutValues } from "@/components/about/AboutValues"
import { TeamGrid } from "@/components/about/TeamGrid"
import { CtaBanner } from "@/components/about/CtaBanner"
import { Particles } from "@/components/why-smartbyte/Particles"
import { SectionHeading } from "@/components/ui/SectionHeading"

export function About() {
  return (
    <section
      id="about"
      className="relative py-[140px] overflow-hidden bg-background"
    >
      {/* ═══ Background ═══ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gradient orbs */}
        <div
          className="absolute top-[5%] -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(0, 194, 168, 0.06), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute top-[40%] -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.04), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute bottom-[15%] left-[30%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(0, 194, 168, 0.03), transparent 70%)",
            filter: "blur(120px)",
          }}
        />

        {/* Light beams */}
        <div
          className="absolute top-0 left-[20%] w-px h-full opacity-[0.02]"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(0, 194, 168, 0.2), transparent)",
          }}
        />
        <div
          className="absolute top-0 right-[30%] w-px h-full opacity-[0.015]"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(56, 189, 248, 0.15), transparent)",
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
        {/* ═══ Section Header ═══ */}
        <div className="mb-12 lg:mb-16">
          <SectionHeading
            label="About SmartByte"
            title={
              <>
                More Than<br />
                Developers.<br />
                <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                  We&apos;re Your Technology Partner.
                </span>
              </>
            }
            description="We don't just build websites. We help businesses launch, grow and scale with modern technology. From business websites and SaaS products to inventory systems, restaurant platforms, AI automation and digital branding — we become your long-term technology partner."
            maxWidth="640px"
          />
        </div>

        {/* ═══ Main Grid ═══ */}
        <div className="lg:grid lg:grid-cols-[38%_58%] lg:gap-12 xl:gap-16">
          {/* ═══ LEFT — Story & Values (38%) ═══ */}
          <div>
            <TransformationJourney />
            <AboutValues values={values} />
          </div>

          {/* ═══ RIGHT — Team (58%) ═══ */}
          <div className="mt-12 lg:mt-0">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold tracking-label uppercase text-foreground/40 mb-6 block"
            >
              Our Team
            </motion.span>
            <TeamGrid team={team} />
          </div>
        </div>

        {/* ═══ Bottom CTA Banner ═══ */}
        <CtaBanner />
      </div>
    </section>
  )
}
