"use client"

import { motion } from "motion/react"

const backgrounds = {
  inventory: {
    color1: "rgba(0, 194, 168, 0.06)",
    color2: "rgba(56, 189, 248, 0.03)",
    label: "Inventory",
  },
  restaurant: {
    color1: "rgba(234, 88, 12, 0.05)",
    color2: "rgba(249, 115, 22, 0.03)",
    label: "Restaurant",
  },
  crm: {
    color1: "rgba(99, 102, 241, 0.05)",
    color2: "rgba(139, 92, 246, 0.03)",
    label: "CRM",
  },
  ai: {
    color1: "rgba(168, 85, 247, 0.05)",
    color2: "rgba(59, 130, 246, 0.03)",
    label: "AI",
  },
  saas: {
    color1: "rgba(0, 194, 168, 0.06)",
    color2: "rgba(56, 189, 248, 0.03)",
    label: "SaaS",
  },
  website: {
    color1: "rgba(59, 130, 246, 0.05)",
    color2: "rgba(99, 102, 241, 0.03)",
    label: "Website",
  },
  mobile: {
    color1: "rgba(34, 211, 238, 0.05)",
    color2: "rgba(14, 165, 233, 0.03)",
    label: "Mobile",
  },
  ecommerce: {
    color1: "rgba(168, 85, 247, 0.05)",
    color2: "rgba(236, 72, 153, 0.03)",
    label: "E-Commerce",
  },
  dashboard: {
    color1: "rgba(0, 194, 168, 0.06)",
    color2: "rgba(56, 189, 248, 0.03)",
    label: "Dashboard",
  },
}

export function BackgroundEffects({ activeType }) {
  const bg = backgrounds[activeType] || backgrounds.dashboard

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Reactive gradient blob */}
      <motion.div
        className="absolute top-1/3 right-[10%] w-[500px] h-[500px] rounded-full"
        animate={{
          opacity: activeType ? 0.25 : 0.08,
          background: `radial-gradient(circle, ${bg.color1}, transparent 70%)`,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ filter: "blur(100px)" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] rounded-full"
        animate={{
          opacity: activeType ? 0.2 : 0.05,
          background: `radial-gradient(circle, ${bg.color2}, transparent 70%)`,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ filter: "blur(100px)" }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  )
}
