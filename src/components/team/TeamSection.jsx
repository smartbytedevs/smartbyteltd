"use client"

import { motion } from "motion/react"
import { team } from "./teamData"
import { TeamCard } from "./TeamCard"

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export function TeamSection() {
  return (
    <section className="relative w-full bg-black py-16 md:py-24 lg:py-32">
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[10%] -right-40 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, rgba(255, 59, 92, 0.15), transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-[20%] -left-40 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[33%_1fr] lg:gap-12 xl:gap-16">
          {/* Left Column — Sticky heading & copy */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-white/40 mb-6">
                Our People
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-extrabold uppercase tracking-tight text-white leading-[0.9] mb-6 lg:mb-8 font-display">
                THE
                <br />
                TEAM
              </h2>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-md mb-8 lg:mb-10">
                You want a team of digital experts that proactively comes with
                solutions, not problems. That lighten your load and save you
                time. Meet your new team. Our collective experience is at your
                disposal.
              </p>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#f5efab] hover:bg-[#f3f0d0] text-black text-sm font-semibold px-7 py-3.5 rounded-full transition-colors duration-300"
              >
                Get Started
                <ArrowIcon />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column — Team cards grid */}
          <div className="mt-12 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {team.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
