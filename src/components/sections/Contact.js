"use client"

import { motion } from "motion/react"
import { DarkContactForm } from "@/components/contact/DarkContactForm"
import { contactInfo } from "@/components/contact/contactData"

export function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-black py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #8ba4ff, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 md:px-12 lg:px-16">
        {/* ── Header ── */}
        <div className="text-center mb-12 sm:mb-16">
          {/* Giant Title */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-white tracking-tight leading-[0.9]"
          >
            <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
              Let&apos;s Talk
            </span>
          </motion.h2>

          {/* Subheading with pill badge */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            className="mt-5 sm:mt-6 text-lg sm:text-xl text-gray-200 font-medium flex flex-wrap items-center justify-center gap-2"
          >
            Take advantage of a{" "}
            <span className="inline-flex items-center px-4 py-1 bg-purple-200 text-purple-950 rounded-full text-sm sm:text-base font-semibold">
              free consultation.
            </span>
          </motion.p>

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm sm:text-base text-gray-300"
          >
            <a
              href={`mailto:${contactInfo.email}`}
              className="underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors"
            >
              {contactInfo.email}
            </a>
            <span className="text-gray-600 hidden sm:inline">·</span>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              className="underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors"
            >
              {contactInfo.phone}
            </a>
            <span className="text-gray-600 hidden sm:inline">·</span>
            <span className="text-gray-400">{contactInfo.location}</span>
          </motion.div>
        </div>

        {/* ── Form ── */}
        <DarkContactForm />
      </div>
    </section>
  )
}
