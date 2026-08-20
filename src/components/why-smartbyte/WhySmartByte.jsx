"use client"

import { motion } from "motion/react"
import Link from "next/link"

const cards = [
  {
    number: "01",
    category: "BRAND & TECH",
    title: "Tailored Web Architecture",
    description:
      "Custom React/Next.js platforms crafted without rigid templates—delivering lightning-fast load times and memorable UI.",
    stat: "100% Custom Code",
  },
  {
    number: "02",
    category: "PERFORMANCE",
    title: "Engineered for Conversion",
    description:
      "Clean code structure, smooth Framer Motion interactions, and seamless user journeys built to convert traffic into clients.",
    stat: "< 1.0s Load Speed",
  },
  {
    number: "03",
    category: "VISIBILITY",
    title: "Modern Search Optimization",
    description:
      "Semantic HTML, structured metadata, and fast server-side rendering ensuring top rankings across search engines and AI discovery tools.",
    stat: "99+ Lighthouse Score",
  },
]

export function WhySmartByte() {
  return (
    <section
      id="why-smartbyte"
      className="bg-[#0D0D0D] text-white py-24 px-6 md:px-16 border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-mono tracking-widest text-[#8ba4ff] uppercase mb-4 block"
        >
          Why SmartByte
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6"
        >
          Why Businesses Trust SmartByte.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed"
        >
          We bridge high-performance web engineering with strategic brand
          design—building scalable software that drives real revenue.
        </motion.p>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {cards.map((card, index) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: 0.15 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-[#141414] border border-neutral-800/80 rounded-3xl p-8 hover:border-neutral-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs text-neutral-500 font-mono">
                  {card.number} / {card.category}
                </span>
                <h3 className="text-2xl font-bold text-white mt-4 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-full px-4 py-2 w-fit text-xs font-semibold text-[#8ba4ff] mt-8">
                {card.stat}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between p-8 bg-[#161616] border border-neutral-800 rounded-3xl gap-6"
        >
          <p className="text-xl font-bold text-white">
            Ready to elevate your digital presence?
          </p>
          <Link
            href="/contact"
            className="bg-[#8ba4ff] text-black font-bold px-8 py-3.5 rounded-full hover:bg-[#a0b8ff] hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 text-sm shrink-0"
          >
            Partner With Us
            <span aria-hidden="true">⟶</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
