"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
}

const navColumns = [
  [
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/#works" },
  ],
  [
    { label: "About", href: "/about" },
    { label: "Agency Culture", href: "/about" },
  ],
  [
    { label: "Blog", href: "/blog" },
    { label: "Testimonials", href: "/#testimonials" },
  ],
  [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
]

export function Footer() {
  return (
    <footer className="w-full bg-black px-6 pt-20 pb-8 md:px-16">
      {/* ── Agency Summary ────────────────────────────────────── */}
      <motion.p
        {...fadeUp}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl text-center text-base leading-relaxed text-gray-300"
      >
        SmartByte is a digital agency helping brands grow with smart,
        results-focused{" "}
        <a href="/#services" className="underline underline-offset-4 transition-colors duration-300 hover:text-[#8ba4ff]">
          Web Development
        </a>
        ,{" "}
        <a href="/#services" className="underline underline-offset-4 transition-colors duration-300 hover:text-[#8ba4ff]">
          UI/UX Design
        </a>
        ,{" "}
        <a href="/#services" className="underline underline-offset-4 transition-colors duration-300 hover:text-[#8ba4ff]">
          Full Stack Applications
        </a>
        , and{" "}
        <a href="/#services" className="underline underline-offset-4 transition-colors duration-300 hover:text-[#8ba4ff]">
          AI Solutions
        </a>
        .
      </motion.p>

      {/* ── Giant CTA Heading ─────────────────────────────────── */}
      <motion.h2
        {...fadeUp}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 text-center font-extrabold tracking-tight text-white"
      >
        <span className="block text-6xl md:text-8xl lg:text-9xl">
          Get in Touch
        </span>
      </motion.h2>

      {/* ── Contact Details ───────────────────────────────────── */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-300"
      >
        <a
          href="mailto:hello@smartbyte.com"
          className="underline underline-offset-4 transition-colors duration-300 hover:text-[#8ba4ff]"
        >
          hello@smartbyte.com
        </a>
        <a
          href="tel:+8801234567890"
          className="underline underline-offset-4 transition-colors duration-300 hover:text-[#8ba4ff]"
        >
          +880 1234 567890
        </a>
        <span>Chittagong, Bangladesh</span>
      </motion.div>

      {/* ── Primary CTA Button ────────────────────────────────── */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 flex justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => (window.location.href = "/contact")}
          className="inline-flex items-center gap-2 rounded-full bg-[#8ba4ff] px-8 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-[#8ba4ff]/90"
        >
          Start a Project
          <span aria-hidden="true">⟶</span>
        </motion.button>
      </motion.div>

      {/* ── Link Grid ─────────────────────────────────────────── */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-16 max-w-5xl border-t border-neutral-800 pt-12"
      >
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {navColumns.map((col, colIdx) => (
            <motion.ul
              key={colIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.5 + colIdx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="space-y-3"
            >
              {col.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-base font-medium text-gray-200 transition-all duration-300 hover:translate-x-1 hover:text-[#8ba4ff]"
                  >
                    <span className="text-gray-500 transition-colors duration-300 group-hover:text-[#8ba4ff]">
                      →
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          ))}
        </div>
      </motion.div>

      {/* ── Bottom Bar ────────────────────────────────────────── */}
      <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-900 pt-8 text-center md:flex-row md:text-left">
        <span className="text-2xl font-extrabold tracking-widest text-white">
          SMARTBYTE
        </span>
        <p className="text-xs text-gray-500">
          © 2026 SmartByte Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
