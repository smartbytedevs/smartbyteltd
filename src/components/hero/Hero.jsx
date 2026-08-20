"use client"

import { motion } from "motion/react"
import { ArrowRight, Calendar } from "lucide-react"
import { HeroHeading } from "./HeroHeading"
import { ClientTicker } from "./ClientTicker"
export function Hero() {

  return (
    <section id="home" className="relative w-full bg-[#F7F7F8] overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, rgba(139, 164, 255, 0.4), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.02]"
          style={{
            background: "radial-gradient(circle, rgba(0, 0, 0, 0.1), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-[140px] md:pt-[160px] pb-12 md:pb-16">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8 md:mb-10"
        >
          <span className="inline-flex items-center gap-2 bg-white border border-gray-200/80 rounded-full px-4 py-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#8ba4ff]" />
            <span className="text-sm font-medium text-gray-600">
              SmartByte Web Development Agency
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
          </span>
        </motion.div>

        {/* Giant heading with inline media */}
        <HeroHeading />

        {/* Description + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-10 md:mt-14 max-w-xl"
        >
          <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-8">
            We help startups and businesses transform their ideas into powerful
            digital products, custom software, and scalable web experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <motion.button
              type="button"
              onClick={() => (window.location.href = "/contact")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 py-4 font-semibold text-sm transition-colors duration-300 shadow-lg shadow-gray-900/10"
            >
              <Calendar className="w-4 h-4" />
              Book Free Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.button>

            <a
              href="#work"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300 px-4 py-4"
            >
              View Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Client logo ticker */}
      <ClientTicker />
    </section>
  )
}
