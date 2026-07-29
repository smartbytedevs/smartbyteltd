"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useReducedMotion, animate } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TemplateCard } from "./TemplateCard"

function NavArrow({ direction, onClick, disabled }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight

  return (
    <motion.button
      className="relative w-[52px] h-[52px] rounded-2xl flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
      style={{
        background: "rgba(11, 16, 32, 0.4)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
      }}
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: disabled ? 0 : 1,
        scale: disabled ? 0.9 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{
        y: -3,
        borderColor: "rgba(0, 194, 168, 0.3)",
        boxShadow: "0 0 24px rgba(0, 194, 168, 0.1)",
        background: "rgba(11, 16, 32, 0.55)",
      }}
      whileTap={{ scale: 0.93, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      aria-label={direction === "left" ? "Previous templates" : "Next templates"}
    >
      {/* Glow behind arrow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        whileHover={{ boxShadow: "inset 0 0 20px rgba(0, 194, 168, 0.06)" }}
        transition={{ duration: 0.3 }}
      />

      <motion.div whileHover={{ x: direction === "left" ? -2 : 2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        <Icon className="w-4 h-4 text-muted group-hover:text-foreground" />
      </motion.div>
    </motion.button>
  )
}

function getCardTarget(container, index) {
  const cards = [...container.children[0].children].filter(
    (c) => c.getAttribute("role") === "button"
  )
  const card = cards[index]
  if (!card) return container.scrollLeft
  const cr = container.getBoundingClientRect()
  const cardRect = card.getBoundingClientRect()
  return container.scrollLeft + cardRect.left - cr.left
}

export function TemplateCarousel({ templates }) {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const prefersReduced = useReducedMotion()

  const touchStartX = useRef(0)
  const isSwiping = useRef(false)

  /* ── Scroll state ── */
  const updateScrollState = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 20)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20)
  }, [])

  const updateActiveIndex = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const cards = [...el.children[0].children].filter(
      (c) => c.getAttribute("role") === "button"
    )
    const cr = el.getBoundingClientRect()
    const center = cr.left + cr.width / 2
    for (let i = 0; i < cards.length; i++) {
      const r = cards[i].getBoundingClientRect()
      if (center >= r.left && center < r.right) {
        setActiveIndex(i)
        break
      }
    }
  }, [])

  /* ── Spring-powered scroll ── */
  const springScrollTo = useCallback(
    (target) => {
      const el = containerRef.current
      if (!el) return
      const start = el.scrollLeft
      if (Math.abs(target - start) < 2) return
      animate(start, target, {
        type: "spring",
        stiffness: 180,
        damping: 28,
        mass: 1,
        onUpdate: (v) => {
          el.scrollLeft = v
        },
      })
    },
    []
  )

  const scrollTo = useCallback(
    (direction) => {
      const idx = direction === "left" ? activeIndex - 1 : activeIndex + 1
      if (idx < 0 || idx >= templates.length) return
      const el = containerRef.current
      if (!el) return
      springScrollTo(getCardTarget(el, idx))
    },
    [activeIndex, templates.length, springScrollTo]
  )

  /* ── Wheel → horizontal scroll ── */
  const handleWheel = useCallback((e) => {
    const el = containerRef.current
    if (!el) return
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault()
      el.scrollBy({ left: e.deltaY, behavior: "auto" })
    }
  }, [])

  /* ── Swipe support ── */
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX
    isSwiping.current = false
  }, [])

  const handleTouchMove = useCallback((e) => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current)
    if (dx > 10) isSwiping.current = true
  }, [])

  const handleTouchEnd = useCallback(
    (e) => {
      if (!isSwiping.current) return
      const dx = e.changedTouches[0].clientX - touchStartX.current
      if (Math.abs(dx) < 50) return
      scrollTo(dx > 0 ? "left" : "right")
    },
    [scrollTo]
  )

  /* ── Keyboard navigation ── */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        scrollTo("left")
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        scrollTo("right")
      }
    },
    [scrollTo]
  )

  /* ── Event listeners ── */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onScroll = () => {
      updateScrollState()
      updateActiveIndex()
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    el.addEventListener("wheel", handleWheel, { passive: false })
    updateScrollState()

    return () => {
      el.removeEventListener("scroll", onScroll)
      el.removeEventListener("wheel", handleWheel)
    }
  }, [handleWheel, updateScrollState, updateActiveIndex])

  return (
    <div
      className="relative"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Template carousel"
      aria-roledescription="carousel"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Carousel */}
      <div
        ref={containerRef}
        className="overflow-x-auto no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex gap-4 md:gap-14 px-8">
          {templates.map((template, i) => (
            <TemplateCard
              key={template.id}
              template={template}
              index={i}
              isActive={activeIndex === i}
            />
          ))}
          <div className="flex-shrink-0 w-4" />
        </div>
      </div>

      {/* Navigation Arrows — overlaid on sides */}
      <div className="absolute inset-y-0 left-4 md:left-6 flex items-center z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <NavArrow direction="left" onClick={() => scrollTo("left")} disabled={!canScrollLeft} />
        </div>
      </div>
      <div className="absolute inset-y-0 right-4 md:right-6 flex items-center z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <NavArrow direction="right" onClick={() => scrollTo("right")} disabled={!canScrollRight} />
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {templates.map((_, i) => (
          <button
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === activeIndex
                ? "w-8 bg-gradient-to-r from-accent to-accent-secondary"
                : "w-2 bg-white/10 hover:bg-white/20"
            }`}
            onClick={() => {
              const el = containerRef.current
              if (!el) return
              springScrollTo(getCardTarget(el, i))
            }}
            aria-label={`Go to template ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
