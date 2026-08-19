"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowUpRight, Plus } from "lucide-react"
import { projects } from "@/data/works"
import { cn } from "@/lib/utils"

/* ── Card data (use first 3 projects) ── */

const galleryCards = projects.slice(0, 3)

const accentColors = ["#38BDF8", "#A78BFA", "#50FFAF"]

/* ────────────────────────────────────────────
   Card 1 — Vertical Typography Poster Style
   ──────────────────────────────────────────── */

function PosterCard({ project, accent, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const src = project.thumbnail || project.coverImage

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.15,
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl overflow-hidden bg-[#0a0a0c] border border-white/[0.06] cursor-pointer aspect-[3/4]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {src ? (
          <Image
            src={src}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#141418] to-[#0a0a0c]">
            <span className="font-display text-6xl font-bold text-white/10">
              {project.title?.charAt(0)}
            </span>
          </div>
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      </div>

      {/* Accent glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${accent}15, transparent 70%)`,
        }}
      />

      {/* Vertical title — left edge */}
      <div className="absolute top-8 left-5 z-10">
        <motion.span
          animate={{ rotate: isHovered ? -2 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="block origin-bottom-left font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[0.85] tracking-tight [writing-mode:vertical-rl] [text-orientation:mixed]"
        >
          {project.title}
        </motion.span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
        <div className="flex items-end justify-between">
          <div>
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3"
              style={{
                backgroundColor: `${accent}20`,
                color: accent,
                border: `1px solid ${accent}30`,
              }}
            >
              {project.industry || project.category}
            </span>
            <p className="text-xs text-gray-400 max-w-[200px] line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          <Link
            href={`/works/${project.slug}`}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black"
          >
            <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

/* ────────────────────────────────────────────
   Card 2 — Modular Tech / Dashboard Grid
   ──────────────────────────────────────────── */

function DashboardCard({ project, accent, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const src = project.thumbnail || project.coverImage
  const metrics = Array.isArray(project.metrics) ? project.metrics.slice(0, 3) : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.15,
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl overflow-hidden bg-[#0B0F19] border border-white/[0.06] cursor-pointer aspect-[3/4]"
    >
      <div className="absolute inset-0 p-5 flex flex-col">
        {/* Main preview */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-white/[0.06] relative">
          {src ? (
            <Image
              src={src}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#141418] to-[#0B0F19] flex items-center justify-center">
              <span className="font-display text-4xl font-bold text-white/10">
                {project.title?.charAt(0)}
              </span>
            </div>
          )}

          {/* AI overlay badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="text-[10px] font-semibold text-white/80">
              AI Powered
            </span>
          </div>

          {/* Neon glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${accent}10, transparent 60%)`,
            }}
          />
        </div>

        {/* Bottom tiles grid */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
              className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center"
            >
              <span
                className="font-display text-lg font-bold block leading-none"
                style={{ color: accent }}
              >
                {metric.value}
                {metric.suffix || ""}
              </span>
              <span className="text-[9px] text-gray-500 mt-1 block leading-tight">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Title + link */}
        <div className="mt-3 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-white leading-tight">
              {project.title}
            </h3>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">
              {project.category}
            </span>
          </div>
          <Link
            href={`/works/${project.slug}`}
            className="flex-shrink-0 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/5"
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

/* ────────────────────────────────────────────
   Card 3 — Interactive Product Hotspot Style
   ──────────────────────────────────────────── */

function HotspotCard({ project, accent, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const src = project.thumbnail || project.coverImage

  const hotspots = [
    { x: "20%", y: "30%", label: "Custom UI Architecture" },
    { x: "70%", y: "55%", label: "Design System" },
    { x: "45%", y: "80%", label: "Performance Optimized" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.15,
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl overflow-hidden bg-[#0a0a0c] border border-white/[0.06] cursor-pointer aspect-[3/4]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {src ? (
          <Image
            src={src}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#141418] to-[#0a0a0c]">
            <span className="font-display text-4xl font-bold text-white/10">
              {project.title?.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Hotspot indicators */}
      {hotspots.map((spot, i) => (
        <motion.div
          key={spot.label}
          className="absolute z-10"
          style={{ left: spot.x, top: spot.y }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + i * 0.12, type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Pulsing halo */}
          <motion.div
            className="absolute -inset-2 rounded-full"
            style={{ backgroundColor: `${accent}15` }}
            animate={
              isHovered
                ? { scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }
                : { scale: 1, opacity: 0.3 }
            }
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />

          {/* Plus button */}
          <div
            className="relative w-7 h-7 rounded-full border-2 flex items-center justify-center backdrop-blur-sm transition-all duration-300"
            style={{
              borderColor: accent,
              backgroundColor: `${accent}20`,
            }}
          >
            <Plus className="w-3.5 h-3.5" style={{ color: accent }} />
          </div>

          {/* Label — visible on hover */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
            transition={{ duration: 0.3, delay: isHovered ? i * 0.05 : 0 }}
            className="absolute left-9 top-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-px w-6"
                style={{ backgroundColor: `${accent}60` }}
              />
              <span className="text-[10px] font-semibold text-white/80 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10">
                {spot.label}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Bottom gradient + info */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="flex items-end justify-between">
          <div>
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2"
              style={{
                backgroundColor: `${accent}20`,
                color: accent,
                border: `1px solid ${accent}30`,
              }}
            >
              {project.category}
            </span>
            <h3 className="font-display text-xl font-bold text-white leading-tight">
              {project.title}
            </h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2 max-w-[240px]">
              {project.description}
            </p>
          </div>
          <Link
            href={`/works/${project.slug}`}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black"
          >
            <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

/* ────────────────────────────────────────────
   Main Section
   ──────────────────────────────────────────── */

const cardComponents = [PosterCard, DashboardCard, HotspotCard]

export function Works() {
  return (
    <section id="work" className="relative bg-black overflow-hidden">
      {/* ── Header Typography ── */}
      <div className="px-6 md:px-12 lg:px-16 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
        <div className="mx-auto max-w-[1400px]">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase text-[#50FFAF] mb-6"
          >
            Our Work
          </motion.span>

          {/* Giant inline heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 md:gap-x-6 lg:gap-x-8"
          >
            <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-none">
              WE ARE
            </span>

            {/* Inline brand badge */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-flex items-center bg-white rounded-lg sm:rounded-xl px-5 py-2 sm:px-7 sm:py-3 md:px-8 md:py-3.5"
            >
              <span className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight leading-none">
                SMARTBYTE
              </span>
            </motion.div>

            <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-none">
              PROUD
            </span>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.25,
            }}
            className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-500 max-w-xl leading-relaxed"
          >
            From business websites to complex SaaS platforms — we design and
            develop digital experiences that help businesses grow.
          </motion.p>
        </div>
      </div>

      {/* ── Gallery Cards ── */}
      <div className="px-6 md:px-12 lg:px-16 pb-20 sm:pb-24 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          {/* Desktop: 3-col grid | Tablet: horizontal scroll | Mobile: stacked */}
          <div
            className={cn(
              "flex flex-col gap-6",
              "md:flex-row md:overflow-x-auto md:snap-x md:snap-mandatory md:gap-5 md:pb-4",
              "lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0"
            )}
          >
            {galleryCards.map((project, i) => {
              const CardComponent = cardComponents[i % cardComponents.length]
              return (
                <div
                  key={project.id}
                  className={cn(
                    "flex-shrink-0 snap-start",
                    "w-full md:w-[85vw] sm md:w-[400px] lg:w-auto"
                  )}
                >
                  <CardComponent
                    project={project}
                    accent={accentColors[i % accentColors.length]}
                    index={i}
                  />
                </div>
              )
            })}
          </div>

          {/* Bottom blur gradient */}
          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.4,
            }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
          >
            <Link
              href="/works"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white hover:bg-gray-100 text-[#111111] text-sm font-bold rounded-lg transition-colors duration-200"
            >
              View All Projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={() => (window.location.href = "/contact")}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/15 hover:border-white/30 hover:bg-white/5 text-white text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer"
            >
              Start Your Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
