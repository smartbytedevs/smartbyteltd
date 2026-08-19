"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Zap, DollarSign, Sparkles, ArrowRight, Play } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Zap,
    title: "Build & Grow Your Brand",
    description:
      "Get a complete brand identity, high-converting design, and custom web architecture.",
  },
  {
    icon: DollarSign,
    title: "Engineered for Performance",
    description:
      "High-speed code, optimized user flows, and scalable web solutions built to convert.",
  },
  {
    icon: Sparkles,
    title: "Rank & Stand Out Everywhere",
    description:
      "SEO-optimized structure ensuring top search visibility across Google and modern AI platforms.",
  },
]

function FeatureItem({ feature, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3 + index * 0.12,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group flex items-start gap-5 p-5 -mx-5 rounded-2xl cursor-default transition-colors duration-300",
        isHovered ? "bg-white/[0.04]" : "bg-transparent"
      )}
    >
      {/* Icon */}
      <motion.div
        animate={{
          scale: isHovered ? 1.08 : 1,
          rotate: isHovered ? -5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#50FFAF]/10 border border-[#50FFAF]/20 flex items-center justify-center"
      >
        <Icon className="w-5 h-5 text-[#50FFAF]" />
      </motion.div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
          {feature.title}
        </h3>
        <motion.p
          animate={{ y: isHovered ? -2 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm text-gray-400 leading-relaxed mt-1.5"
        >
          {feature.description}
        </motion.p>
      </div>
    </motion.div>
  )
}

function ShowcaseVisual() {
  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1a1f] via-[#141418] to-[#0d0d10] border border-white/[0.06]">
      {/* Inner glow */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, #50FFAF, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, #818cf8, transparent 70%)",
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
        {/* Abstract browser mockup */}
        <div className="w-full max-w-[280px] rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden backdrop-blur-sm">
          <div className="h-8 flex items-center gap-1.5 px-3 border-b border-white/[0.06]">
            <div className="w-2 h-2 rounded-full bg-red-400/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
            <div className="w-2 h-2 rounded-full bg-green-400/50" />
          </div>
          <div className="p-4 space-y-3">
            <div className="h-2 w-3/4 rounded-full bg-white/[0.08]" />
            <div className="h-2 w-1/2 rounded-full bg-white/[0.05]" />
            <div className="flex gap-2 mt-4">
              <div className="h-12 flex-1 rounded-lg bg-[#50FFAF]/[0.08] border border-[#50FFAF]/[0.12]" />
              <div className="h-12 flex-1 rounded-lg bg-white/[0.04] border border-white/[0.06]" />
            </div>
            <div className="h-16 rounded-lg bg-white/[0.03] border border-white/[0.05]" />
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4">
          {[
            { label: "Performance", value: "98%" },
            { label: "SEO Score", value: "100" },
            { label: "Uptime", value: "99.9%" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              className="text-center px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06]"
            >
              <div className="text-base sm:text-lg font-bold text-[#50FFAF] font-display">
                {stat.value}
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Badge — Top Right: Starburst */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 -right-3 sm:top-4 sm:right-4"
      >
        <div className="relative">
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            className="drop-shadow-lg"
          >
            <path
              d="M36 0L42.2 14.8L56 8L49.8 22.8L64 24L52.4 33.2L64 42.8L49.8 42.4L56 57.2L42.2 50.8L36 66L29.8 50.8L16 57.2L22.2 42.4L8 42.8L19.6 33.2L8 24L22.2 22.8L16 8L29.8 14.8L36 0Z"
              fill="#FF6B00"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold leading-none mt-0.5">
              TOP
              <br />
              RATED
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating Badge — Bottom Left: Play Circle */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-6 left-6"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[2.5px] border-[#50FFAF] flex items-center justify-center bg-[#50FFAF]/[0.08] backdrop-blur-sm">
          <Play className="w-5 h-5 sm:w-6 sm:h-6 text-[#50FFAF] ml-0.5" />
        </div>
      </motion.div>
    </div>
  )
}

export function WhySmartByte() {
  return (
    <section
      id="why-smartbyte"
      className="relative bg-[#121214] py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #50FFAF, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-20 items-center">
          {/* ── Left Column: Value Proposition ── */}
          <div className="w-full lg:max-w-xl">
            {/* Section Label */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase text-[#50FFAF] mb-5"
            >
              Why SmartByte
            </motion.span>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.05] tracking-tight"
            >
              Why Businesses
              <br />
              Trust{" "}
              <span className="text-[#50FFAF]">SmartByte.</span>
            </motion.h2>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              className="text-base sm:text-lg text-gray-400 leading-relaxed mt-5 max-w-md"
            >
              We combine deep technical expertise with genuine business
              understanding — delivering software that doesn&apos;t just work, but
              drives real growth.
            </motion.p>

            {/* Feature List */}
            <div className="mt-10 space-y-1">
              {features.map((feature, index) => (
                <FeatureItem
                  key={feature.title}
                  feature={feature}
                  index={index}
                />
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.6,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => (window.location.href = "/contact")}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 bg-[#50FFAF] hover:bg-[#45E69D] text-[#111111] text-sm sm:text-base font-bold rounded-lg transition-colors duration-200 cursor-pointer shadow-[0_0_24px_rgba(80,255,175,0.15)] hover:shadow-[0_0_32px_rgba(80,255,175,0.25)]"
              >
                <span>Partner With Us</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>

          {/* ── Right Column: Media Showcase ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.25,
            }}
            className="w-full mt-14 lg:mt-0"
          >
            <ShowcaseVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
