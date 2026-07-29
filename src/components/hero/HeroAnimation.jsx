"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { Code2, Zap, Layers, Sparkles } from "lucide-react"

const floatingElements = [
  {
    icon: Code2,
    label: "</>",
    x: "15%",
    y: "15%",
    delay: 0,
    width: "w-16 h-16",
    size: "text-lg",
  },
  {
    icon: Zap,
    label: "",
    x: "65%",
    y: "25%",
    delay: 1,
    width: "w-14 h-14",
    size: "text-base",
  },
  {
    icon: Layers,
    label: "",
    x: "25%",
    y: "60%",
    delay: 2,
    width: "w-14 h-14",
    size: "text-base",
  },
  {
    icon: Sparkles,
    label: "",
    x: "70%",
    y: "65%",
    delay: 0.5,
    width: "w-12 h-12",
    size: "text-sm",
  },
]

const connectionLines = [
  { x1: "20%", y1: "20%", x2: "60%", y2: "30%", delay: 1.5 },
  { x1: "30%", y1: "55%", x2: "65%", y2: "60%", delay: 2 },
  { x1: "50%", y1: "15%", x2: "25%", y2: "55%", delay: 2.5 },
]

export function HeroAnimation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative w-full h-[500px] lg:h-[600px]" aria-hidden="true">
      {/* Grid background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.2 } : {}}
        transition={{ duration: 1.2, delay: 0.5 }}
      />

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ filter: "blur(1px)" }}>
        {connectionLines.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#lineGrad)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
            transition={{ duration: 1.5, delay: line.delay, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C2A8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Large blurred shape */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 194, 168, 0.08), transparent 70%)",
          filter: "blur(40px)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1 }
            : {}
        }
        transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Floating glass cards */}
      {floatingElements.map((el, i) => {
        const Icon = el.icon
        return (
          <motion.div
            key={i}
            className={`absolute ${el.width} rounded-xl border border-white/5 bg-card/40 backdrop-blur-sm flex items-center justify-center ${
              el.label ? "" : ""
            }`}
            style={{ left: el.x, top: el.y }}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: [0, -8, 0],
                    scale: 1,
                  }
                : {}
            }
            transition={{
              opacity: { duration: 0.6, delay: 1 + el.delay },
              y: {
                duration: 4 + el.delay,
                repeat: Infinity,
                ease: "easeInOut",
                delay: el.delay,
              },
              scale: { duration: 0.6, delay: 1 + el.delay },
            }}
          >
            {el.label ? (
              <span className={`${el.size} font-bold text-accent/80`}>{el.label}</span>
            ) : (
              <Icon className={`${el.size} text-accent-secondary/60`} />
            )}
          </motion.div>
        )
      })}

      {/* Central glass panel */}
      <motion.div
        className="absolute top-1/3 right-[10%] w-[180px] h-[100px] rounded-2xl border border-white/5 bg-card/30 backdrop-blur-sm p-4"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <div className="w-2 h-2 rounded-full bg-accent/30" />
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 w-3/4 rounded-full bg-white/5" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/5" />
        </div>
      </motion.div>

      {/* Right side pill */}
      <motion.div
        className="absolute bottom-[20%] right-[5%] px-4 py-2 rounded-full border border-white/5 bg-card/20 backdrop-blur-sm"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="flex items-center gap-2 text-xs text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          AI-Powered
        </span>
      </motion.div>
    </div>
  )
}
