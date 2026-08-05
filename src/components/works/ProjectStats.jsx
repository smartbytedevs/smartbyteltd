"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { stats } from "@/data/works"

function AnimatedStat({ value, suffix, label, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="relative group">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.03] to-accent-secondary/[0.02] border border-border/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative rounded-2xl p-8 text-center">
        <div className="font-display text-5xl md:text-6xl font-bold mb-3">
          {isInView && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <CountUp end={value} delay={delay + 0.5} />
            </motion.span>
          )}
          <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">{suffix}</span>
        </div>
        <p className="text-muted text-lg">{label}</p>
      </div>
    </div>
  )
}

function CountUp({ end, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <span ref={ref}>
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay }}
        >
          <CountingNumber end={end} />
        </motion.span>
      ) : (
        <span>0</span>
      )}
    </span>
  )
}

function CountingNumber({ end }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const display = useRef(0)

  if (isInView && typeof window !== "undefined") {
    const start = performance.now()
    const duration = 1500
    function step(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      display.current = Math.round(end * ease)
      if (ref.current) ref.current.textContent = display.current
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  return <span ref={ref}>0</span>
}

export function ProjectStats() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(28,25,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,25,23,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[20%] -left-48 w-[500px] h-[500px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(15, 118, 110, 0.04), transparent 70%)",
          filter: "blur(120px)",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <SafeSlideUp key={stat.label} delay={i * 0.1}>
              <AnimatedStat value={stat.value} suffix={stat.suffix} label={stat.label} delay={i * 0.1} />
            </SafeSlideUp>
          ))}
        </div>
      </div>
    </section>
  )
}
