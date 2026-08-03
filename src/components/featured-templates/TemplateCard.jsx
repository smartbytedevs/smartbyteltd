"use client"

import { memo, useState } from "react"
import { motion } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { Check, ArrowRight } from "lucide-react"
import { PreviewWindow } from "./PreviewWindow"
import { CategoryBadge } from "./CategoryBadge"

const techColors = {
  "Next.js": "bg-white/50 text-foreground",
  React: "bg-sky-500/20 text-sky-700",
  Tailwind: "bg-cyan-500/20 text-cyan-700",
  Stripe: "bg-purple-500/20 text-purple-700",
  Node: "bg-green-500/20 text-green-700",
  Postgres: "bg-blue-500/20 text-blue-700",
  Django: "bg-emerald-500/20 text-emerald-700",
  Vue: "bg-emerald-500/20 text-emerald-700",
  TypeScript: "bg-blue-500/20 text-blue-700",
  Prisma: "bg-indigo-500/20 text-indigo-700",
  Motion: "bg-pink-500/20 text-pink-700",
}

export const TemplateCard = memo(function TemplateCard({ template, index, isActive }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const rotateX = ((mousePos.y - 50) / 50) * -5
  const rotateY = ((mousePos.x - 50) / 50) * 5

  return (
    <SafeSlideUp
      data-card-root
      delay={index * 0.1}
      style={{
        width: `min(${template.width}px, calc(100dvw - 4rem))`,
        height: template.height,
        perspective: "1000px",
      }}
      className="relative flex-shrink-0"
    >
      {/* Active-card emphasis — fade + subtle scale while others recede */}
      <motion.div
        className="relative w-full h-full"
        style={{ zIndex: isActive ? 3 : 1 }}
        animate={{
          opacity: isActive ? 1 : 0.8,
          scale: isActive ? 1 : 0.97,
        }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="group relative w-full h-full outline-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            setMousePos({ x: 50, y: 50 })
          }}
          onMouseMove={handleMouseMove}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          tabIndex={0}
          role="button"
          aria-label={`${template.title} — ${template.category} template, starting at ${template.price}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
            }
          }}
        >
          {/* ── Card Body ── */}
          <motion.div
            className="relative w-full h-full rounded-2xl overflow-hidden bg-card border border-border/30"
            style={{ transformStyle: "preserve-3d" }}
            animate={{
              rotateX,
              rotateY,
              scale: isHovered ? 1.02 : 1,
              boxShadow: isHovered
                ? "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(180,83,9,0.06)"
                : "0 4px 20px rgba(0,0,0,0.2)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 0.8,
            }}
          >
            {/* Spotlight overlay */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none z-20"
              animate={{
                opacity: isHovered ? 1 : 0,
                background: isHovered
                  ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(180, 83, 9, 0.08), transparent 60%)`
                  : "transparent",
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Animated gradient border glow */}
            <motion.div
              className="absolute -inset-[1px] rounded-2xl pointer-events-none z-20"
              animate={{
                opacity: isHovered ? 1 : 0,
                background: isHovered
                  ? "linear-gradient(135deg, rgba(180,83,9,0.2), rgba(160,58,30,0.2), rgba(180,83,9,0.2))"
                  : "transparent",
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", WebkitMaskComposite: "xor", padding: "1px" }}
            />

            {/* ── Preview Image ── */}
            <div className="relative h-[45%] overflow-hidden">
              <motion.div
                className="w-full h-full"
                animate={{ scale: isHovered ? 1.06 : 1 }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 25,
                }}
              >
                <PreviewWindow category={template.category} />
              </motion.div>

              {/* Gradient fade overlay at bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent z-10" />

              {/* Category badge */}
              <div className="absolute top-3 left-3 z-10">
                <CategoryBadge category={template.category} />
              </div>

              {/* Badge label */}
              {template.badge && (
                <div className="absolute top-3 right-3 z-10">
                  <motion.span
                    className={`text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full shadow-lg block ${
                      template.badge === "BEST SELLER"
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black"
                        : template.badge === "POPULAR"
                          ? "bg-gradient-to-r from-accent to-accent-secondary text-background"
                          : template.badge === "NEW"
                            ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white"
                            : template.badge === "TRENDING"
                              ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                              : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
                    }`}
                    animate={
                      isHovered
                        ? { scale: [1, 1.08, 1] }
                        : { scale: 1 }
                    }
                    transition={{
                      duration: 1.2,
                      repeat: isHovered ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    {template.badge}
                  </motion.span>
                </div>
              )}
            </div>

            {/* ── Content ── */}
            <div className="relative h-[55%] p-5 sm:p-6 lg:p-7 flex flex-col z-10 overflow-hidden">
              {/* Title */}
              <motion.h3
                className="font-display text-base sm:text-lg lg:text-xl font-semibold tracking-tight text-foreground"
                animate={{ y: isHovered ? -2 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {template.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-xs sm:text-sm text-muted leading-relaxed mt-1.5 line-clamp-2"
                animate={{ y: isHovered ? -2 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {template.description}
              </motion.p>

              {/* Features — always visible */}
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
                {template.features?.slice(0, 5).map((f) => (
                  <span
                    key={f}
                    className="flex items-center gap-1 text-[10px] sm:text-xs text-muted"
                  >
                    <Check className="w-3 h-3 text-accent shrink-0" />
                    <span className="truncate max-w-[100px] sm:max-w-none">{f}</span>
                  </span>
                ))}
              </div>

              {/* Spacer */}
              <div className="flex-1 min-h-[4px]" />

              {/* Tech stack — always visible */}
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                {template.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold rounded-md ${
                      techColors[tech] || "bg-white/45 text-foreground/70"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-border/30 -mx-5 sm:-mx-6 lg:-mx-7 mb-2" />

              {/* Bottom row */}
              <div className="flex items-center justify-between">
                <div>
                  <motion.span
                    className="text-base sm:text-lg font-bold text-foreground"
                    animate={{
                      textShadow: isHovered
                        ? "0 0 20px rgba(180, 83, 9, 0.3)"
                        : "0 0 0px transparent",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {template.price}
                  </motion.span>
                  <span className="text-[9px] sm:text-[10px] text-muted ml-2 align-middle">
                    Delivery: {template.delivery}
                  </span>
                </div>

                {/* CTA */}
                <motion.span
                  className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-accent"
                  animate={{
                    opacity: isHovered ? 1 : 0.5,
                    x: isHovered ? 0 : 4,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                >
                  View Template
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </motion.span>
              </div>
            </div>

            {/* Focus ring */}
            <div className="absolute inset-0 rounded-2xl ring-2 ring-accent/50 opacity-0 focus-visible:opacity-100 transition-opacity pointer-events-none z-30" />
          </motion.div>
        </div>
      </motion.div>
    </SafeSlideUp>
  )
})
