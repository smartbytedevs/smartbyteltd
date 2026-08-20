"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TemplateCard } from "./TemplateCard"

const navEase = [0.16, 1, 0.3, 1]

function NavArrow({ direction, onClick, disabled }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight

  return (
    <motion.button
      className="relative w-[52px] h-[52px] rounded-2xl flex items-center justify-center bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-[#8ba4ff]/50"
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: disabled ? 0 : 1,
        scale: disabled ? 0.9 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.93, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      aria-label={direction === "left" ? "Previous templates" : "Next templates"}
    >
      <motion.div whileHover={{ x: direction === "left" ? -2 : 2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        <Icon className="w-4 h-4 text-gray-500" />
      </motion.div>
    </motion.button>
  )
}

export function TemplateCarousel({ templates }) {
  const regionRef = useRef(null)
  const rowRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [offsets, setOffsets] = useState([])

  const goTo = useCallback(
    (index) => {
      setActiveIndex((current) => {
        const next = Math.max(0, Math.min(templates.length - 1, index))
        return next === current ? current : next
      })
    },
    [templates.length]
  )

  const prev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex])
  const next = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex])

  /* ── Measure the natural layout offsets so the row can slide without scrolling ── */
  const measureOffsets = useCallback(() => {
    const row = rowRef.current
    if (!row) return
    const cards = [...row.querySelectorAll("[data-card-root]")]
    if (cards.length !== templates.length) return
    setOffsets((current) => {
      const next = cards.map((card) => card.offsetLeft)
      if (current.length === next.length && current.every((v, i) => v === next[i])) return current
      return next
    })
  }, [templates.length])

  useEffect(() => {
    measureOffsets()
    const region = regionRef.current
    if (!region) return
    const observer = new ResizeObserver(measureOffsets)
    observer.observe(region)
    window.addEventListener("resize", measureOffsets)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measureOffsets)
    }
  }, [measureOffsets])

  /* ── Keyboard navigation (button-equivalent) ── */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        prev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        next()
      }
    },
    [prev, next]
  )

  /* Row transform — the active card always lands in the first card's slot.
     Purely transform-based, so the user can never scroll this section. */
  const rowX = offsets.length ? offsets[0] - offsets[activeIndex] : 0
  const navTransition = { duration: 0.55, ease: navEase }

  const hasPrev = activeIndex > 0
  const hasNext = activeIndex < templates.length - 1

  return (
    <div
      ref={regionRef}
      className="relative"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Template showcase"
      aria-roledescription="carousel"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F7F7F8] to-transparent z-10 pointer-events-none" aria-hidden="true" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F7F7F8] to-transparent z-10 pointer-events-none" aria-hidden="true" />

      {/* Showcase row — clipped, no overflow scrolling */}
      <div className="overflow-hidden">
        <motion.div
          ref={rowRef}
          className="flex gap-4 md:gap-14 px-8"
          animate={{ x: rowX }}
          transition={navTransition}
        >
          {templates.map((template, i) => (
            <TemplateCard
              key={template.id}
              template={template}
              index={i}
              isActive={activeIndex === i}
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows — overlaid on sides */}
      <div className="absolute inset-y-0 left-4 md:left-6 flex items-center z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <NavArrow direction="left" onClick={prev} disabled={!hasPrev} />
        </div>
      </div>
      <div className="absolute inset-y-0 right-4 md:right-6 flex items-center z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <NavArrow direction="right" onClick={next} disabled={!hasNext} />
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {templates.map((_, i) => (
          <button
            key={i}
            className={`h-1 rounded-full transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-[#8ba4ff]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F7F8] ${
              i === activeIndex
                ? "w-8 bg-[#8ba4ff]"
                : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => goTo(i)}
            aria-label={`Go to template ${i + 1}`}
            aria-current={i === activeIndex}
          />
        ))}
      </div>
    </div>
  )
}
