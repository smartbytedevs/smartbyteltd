"use client"

import { useRef, useEffect, useState, useCallback } from "react"

// ── SSR-safe animation hook ──

function useSSRSafeAnimation({ delay = 0, viewportMargin = "-50px", threshold = 0 } = {}) {
  const [play, setPlay] = useState(false)
  const ref = useRef(null)
  const playedRef = useRef(false)

  useEffect(() => {
    if (playedRef.current) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playedRef.current = true
          const timer = setTimeout(() => setPlay(true), delay * 1000)
          observer.disconnect()
          return () => clearTimeout(timer)
        }
      },
      { rootMargin: viewportMargin, threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, viewportMargin, threshold])

  return { ref, play }
}

// ── Safe wrapper that animates via CSS transitions (no SSR inline styles) ──

function useEntranceAnimation({ delay = 0, viewportMargin = "-50px", from = {} }) {
  const { ref, play } = useSSRSafeAnimation({ delay, viewportMargin })
  const initialisedRef = useRef(false)

  useEffect(() => {
    if (!play) return
    const el = ref.current
    if (!el) return

    const fromOpacity = from.opacity ?? 1
    const fromY = from.y ?? 0
    const fromX = from.x ?? 0
    const fromScale = from.scale ?? 1
    const fromBlur = from.blur ?? 0

    el.style.transition = "none"
    el.style.opacity = String(fromOpacity)
    el.style.transform = `translateX(${fromX}px) translateY(${fromY}px) scale(${fromScale})`
    el.style.filter = fromBlur ? `blur(${fromBlur}px)` : "blur(0px)"
    el.style.willChange = "transform, opacity, filter"

    void el.offsetHeight

    el.style.transition = "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s cubic-bezier(0.16,1,0.3,1)"
    el.style.opacity = "1"
    el.style.transform = "translateX(0px) translateY(0px) scale(1)"
    el.style.filter = "blur(0px)"

    initialisedRef.current = true

    const cleanup = setTimeout(() => {
      el.style.transition = ""
      el.style.willChange = ""
    }, 800)

    return () => clearTimeout(cleanup)
  }, [play])

  return ref
}

// ── Exported components ──

export function SafeFade({ children, className, delay = 0, viewportMargin = "-50px", ...rest }) {
  const ref = useEntranceAnimation({ delay, viewportMargin, from: { opacity: 0 } })
  return <div ref={ref} className={className} {...rest}>{children}</div>
}

export function SafeSlideUp({ children, className, delay = 0, viewportMargin = "-50px", ...rest }) {
  const ref = useEntranceAnimation({ delay, viewportMargin, from: { opacity: 0, y: 40 } })
  return <div ref={ref} className={className} {...rest}>{children}</div>
}

export function SafeScale({ children, className, delay = 0, viewportMargin = "-50px", ...rest }) {
  const ref = useEntranceAnimation({ delay, viewportMargin, from: { opacity: 0, scale: 0.95 } })
  return <div ref={ref} className={className} {...rest}>{children}</div>
}

export function SafeReveal({ children, className, delay = 0, viewportMargin = "-50px", ...rest }) {
  const ref = useEntranceAnimation({ delay, viewportMargin, from: { opacity: 0, y: 40, blur: 8 } })
  return <div ref={ref} className={className} {...rest}>{children}</div>
}

// ── Safe Counter (SSR renders final value, animates after mount + viewport) ──

export function SafeCounter({ value, suffix = "", className = "" }) {
  const ref = useRef(null)
  const [displayed, setDisplayed] = useState(value)
  const [ready, setReady] = useState(false)
  const playedRef = useRef(false)

  useEffect(() => {
    if (playedRef.current) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playedRef.current = true

          const start = 0
          const end = value
          const duration = 1500
          const startTime = performance.now()

          function step(now) {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            const current = Math.round(start + (end - start) * ease)
            setDisplayed(current)
            if (progress < 1) requestAnimationFrame(step)
          }

          requestAnimationFrame(step)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: "-50px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className={className}>
      {displayed}{suffix}
    </span>
  )
}

// ── Safe section wrapper (scroll-aware entrance) ──

export function SafeSection({ children, className, ...rest }) {
  return <div className={className} {...rest}>{children}</div>
}
