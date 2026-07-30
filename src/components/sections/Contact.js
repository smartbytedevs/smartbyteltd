"use client"

import { motion } from "motion/react"
import { Particles } from "@/components/why-smartbyte/Particles"
import { ConversationPanel } from "@/components/contact/ConversationPanel"
import { ContactForm } from "@/components/contact/ContactForm"
import { FAQ } from "@/components/contact/FAQ"
import { TrustBar } from "@/components/contact/TrustBar"
import { FinalCTA } from "@/components/contact/FinalCTA"
import { PremiumCTA } from "@/components/ui/PremiumCTA"

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-background py-[120px] sm:py-[140px]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div
          className="absolute -left-48 top-[5%] h-[700px] w-[700px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 194, 168, 0.06), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute -right-48 top-[25%] h-[500px] w-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(56, 189, 248, 0.04), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute bottom-[20%] left-[20%] h-[400px] w-[400px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 194, 168, 0.03), transparent 70%)",
            filter: "blur(120px)",
          }}
        />

        <div
          className="absolute left-[40%] top-0 h-full w-px opacity-[0.02]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(0, 194, 168, 0.15), transparent)",
          }}
        />
        <div
          className="absolute right-[15%] top-0 h-full w-px opacity-[0.015]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(56, 189, 248, 0.1), transparent)",
          }}
        />

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

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 block text-xs font-semibold uppercase tracking-label text-accent sm:text-sm"
          >
            Contact
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-section-title font-bold"
          >
            Let&apos;s Build
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Something Amazing.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Whether you need a business website, custom software, SaaS platform,
            AI solution, or complete digital transformation, our team is ready
            to help.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <PremiumCTA href="#contact-form" showArrow>
              Schedule Free Consultation
            </PremiumCTA>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
          <ConversationPanel />
          <div id="contact-form">
            <ContactForm />
          </div>
        </div>

        <FAQ />
        <TrustBar />
      </div>

      <FinalCTA />
    </section>
  )
}
