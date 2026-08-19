"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight } from "lucide-react"
import { services } from "./services"
import { CardPreview } from "./CardPreview"
import { cn } from "@/lib/utils"

const ACCENT_COLORS = [
  "bg-purple-200",
  "bg-blue-200",
  "bg-emerald-200",
  "bg-amber-200",
  "bg-rose-200",
  "bg-cyan-200",
  "bg-indigo-200",
  "bg-orange-200",
]

const ACCENT_COLORS_HOVER = [
  "bg-purple-400",
  "bg-blue-400",
  "bg-emerald-400",
  "bg-amber-400",
  "bg-rose-400",
  "bg-cyan-400",
  "bg-indigo-400",
  "bg-orange-400",
]

function ServiceRow({ service, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length]
  const accentHover = ACCENT_COLORS_HOVER[index % ACCENT_COLORS_HOVER.length]

  const rowVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      },
    },
  }

  const handleOpen = () => {
    const params = new URLSearchParams()
    params.set("source", "home")
    params.set("heading", service.ctaText)
    params.set("subtitle", `Let's discuss your ${service.title.toLowerCase()} project.`)
    window.location.href = `/contact?${params.toString()}`
  }

  return (
    <motion.div
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative flex flex-col md:flex-row items-stretch md:items-center gap-4",
          "px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10",
          "rounded-2xl cursor-pointer transition-colors duration-300",
          isHovered ? "bg-white/80" : "bg-transparent"
        )}
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleOpen()
          }
        }}
      >
        {/* ── Preview Thumbnail (Desktop / Tablet) ── */}
        <div className="hidden md:block flex-shrink-0 overflow-hidden">
          <motion.div
            initial={false}
            animate={{
              width: isHovered ? 300 : 0,
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="rounded-2xl overflow-hidden border border-gray-200 bg-white"
            style={{ height: 100 }}
          >
            <CardPreview type={service.previewType} />
          </motion.div>
        </div>

        {/* ── Text Content ── */}
        <div className="flex-1 min-w-0">
          {/* Title Row */}
          <div className="flex items-center gap-3 mb-1">
            <motion.span
              className={cn(
                "w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors duration-300",
                isHovered ? accentHover : accentColor
              )}
              animate={{ scale: isHovered ? 1.3 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            />
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#111111] tracking-tight leading-tight">
              {service.title}
            </h3>
          </div>

          {/* Benefits — bullet style */}
          <div className="hidden sm:flex flex-wrap gap-x-1 gap-y-1 mt-2.5">
            {service.benefits.slice(0, 3).map((benefit) => (
              <span key={benefit} className="text-sm text-gray-500">
                <span className="text-gray-300 mr-1">•</span>
                {benefit}
              </span>
            ))}
          </div>

          {/* Description — mobile only */}
          <p className="md:hidden text-sm text-gray-500 leading-relaxed mt-2 line-clamp-2">
            {service.description}
          </p>

          {/* Tech Stack + Price — hover reveal */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:flex items-center gap-2 mt-3"
              >
                {service.techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-100 text-gray-600 border border-gray-200"
                  >
                    {tech}
                  </motion.span>
                ))}
                <span className="ml-2 text-sm font-semibold text-gray-900">
                  {service.price}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Right Arrow CTA (Desktop) ── */}
        <div className="hidden md:flex flex-shrink-0 items-center gap-2.5">
          <AnimatePresence mode="wait">
            {isHovered ? (
              <motion.span
                key="more-info"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium text-[#111111] whitespace-nowrap"
              >
                More Info
              </motion.span>
            ) : (
              <motion.span
                key="learn-more"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-sm text-gray-400 whitespace-nowrap"
              >
                Learn more
              </motion.span>
            )}
          </AnimatePresence>
          <motion.div
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(
              "transition-colors duration-300",
              isHovered ? "text-[#111111]" : "text-gray-400"
            )}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>

        {/* ── Mobile CTA ── */}
        <div className="md:hidden flex items-center gap-2 text-sm text-gray-500">
          <span>More Info</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  )
}

export function WhatWeBuild() {
  return (
    <section
      id="what-we-build"
      className="relative py-24 md:py-32 bg-[#F7F7F8]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium text-[#111111] shadow-sm">
            <span className="text-gray-400">→</span>
            Our Services
          </span>
        </motion.div>

        {/* Service List */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <div key={service.id}>
              <ServiceRow service={service} index={index} />
              {index < services.length - 1 && (
                <div className="border-b border-gray-200 mx-4 sm:mx-6 lg:mx-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
