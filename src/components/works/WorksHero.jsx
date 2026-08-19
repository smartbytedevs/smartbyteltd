"use client"

import { motion } from "motion/react"

const fadeDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
}

export function WorksHero() {
  return (
    <section className="bg-[#F7F7F7] px-6 pt-28 pb-20 md:px-16 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ── Left Column ──────────────────────────────────── */}
          <div className="lg:col-span-7">
            {/* Sub-badge */}
            <motion.div
              {...fadeDown}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-xs font-medium text-neutral-700">
                ⟶ Work
              </span>
            </motion.div>

            {/* Giant Heading */}
            <motion.h1
              {...fadeDown}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-4 text-6xl font-extrabold leading-[0.95] tracking-tight text-neutral-900 md:text-8xl"
            >
              Latest Work
            </motion.h1>

            {/* Bottom Row: Badge + Summary */}
            <motion.div
              {...fadeDown}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start"
            >
              <span className="inline-flex shrink-0 items-center rounded-full bg-[#50FFAF] px-4 py-2 text-sm font-semibold text-black">
                Trusted globally
              </span>
              <p className="max-w-xl text-base leading-relaxed text-neutral-600">
                Chittagong-born, globally trusted – we&apos;ve developed
                scalable web applications, e-commerce systems, and digital brand
                platforms engineered for maximum growth and conversion.
              </p>
            </motion.div>
          </div>

          {/* ── Right Column ─────────────────────────────────── */}
          <div className="relative lg:col-span-5">
            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute -top-4 -left-4 z-10 rounded-full bg-[#50FFAF] px-5 py-2 text-sm font-semibold text-black shadow-md"
            >
              Full-service agency
            </motion.div>

            {/* Image Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden rounded-3xl shadow-lg"
            >
              <div className="aspect-4/3 bg-gradient-to-br from-neutral-200 to-neutral-300">
                <img
                  src="/images/works-hero.jpg"
                  alt="SmartByte team at work"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
              </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div
              {...fadeDown}
              transition={{
                duration: 0.5,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-4 flex justify-end gap-4 text-sm text-neutral-500"
            >
              <a
                href="mailto:hello@smartbyte.com"
                className="underline underline-offset-4 transition-colors duration-300 hover:text-[#50FFAF]"
              >
                hello@smartbyte.com
              </a>
              <span className="text-neutral-300">|</span>
              <a
                href="tel:+8801234567890"
                className="underline underline-offset-4 transition-colors duration-300 hover:text-[#50FFAF]"
              >
                +880 1234 567890
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
