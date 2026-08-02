"use client"

import { motion } from "motion/react"

const gradients = {
  Restaurant:
    "linear-gradient(135deg, #1a0a00, #4a1800, #8b4513, #2d0a00)",
  Inventory:
    "linear-gradient(135deg, #020617, #0f172a, #1e3a5f, #0a1628)",
  SaaS:
    "linear-gradient(135deg, #001a1a, #003d3d, #0a5c5c, #002a2a)",
  Agency:
    "linear-gradient(135deg, #1a0000, #3d0000, #5c1e1e, #2a0000)",
  "Real Estate":
    "linear-gradient(135deg, #1a0a00, #3d1f00, #5c3a1e, #2a1500)",
  Healthcare:
    "linear-gradient(135deg, #020b1a, #0a1f3d, #143d5c, #081a2d)",
  "E-Commerce":
    "linear-gradient(135deg, #0f001a, #2a003d, #4a1e5c, #1a002a)",
  Portfolio:
    "linear-gradient(135deg, #0f0c29, #302b63, #24243e, #1a1740)",
  Corporate:
    "linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e, #0d0d1a)",
  Education:
    "linear-gradient(135deg, #001a0a, #003d1a, #005c3a, #002a10)",
  Travel:
    "linear-gradient(135deg, #1a0f00, #3d2a00, #5c4a1e, #2a1a00)",
  "Landing Page":
    "linear-gradient(135deg, #0d0d0d, #1a1a1a, #2a2a2a, #111111)",
}

function DecorativeGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    />
  )
}

function MockContent({ gradient }) {
  return (
    <div className="relative w-full h-full flex flex-col p-5 sm:p-6">
      {/* Nav bar mockup */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="w-6 h-3 rounded-sm bg-white/10" />
          <div className="hidden sm:flex gap-3">
            <div className="w-10 h-2 rounded-full bg-white/8" />
            <div className="w-10 h-2 rounded-full bg-white/8" />
            <div className="w-10 h-2 rounded-full bg-white/8" />
          </div>
        </div>
        <div className="w-6 h-2 rounded-full bg-white/10" />
      </div>

      {/* Hero area */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <div className="w-24 h-3 rounded-full bg-white/10 mb-4" />
        <div className="w-40 h-4 rounded-full bg-white/10 mb-3" />
        <div className="w-32 h-3 rounded-full bg-white/6 mb-6" />
        <div className="w-20 h-6 rounded-full bg-white/8" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-[20%] right-[10%] w-16 h-16 rounded-full bg-white/[0.03]" />
      <div className="absolute bottom-[25%] left-[8%] w-12 h-12 rounded-full bg-white/[0.02]" />
    </div>
  )
}

export function PreviewWindow({ category }) {
  const gradient = gradients[category] || gradients["Landing Page"]

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-black/40">
      {/* Browser top bar */}
      <div className="relative h-8 bg-zinc-800/90 flex items-center px-4 gap-2 border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <div className="ml-4 flex-1 max-w-[160px] h-4 rounded-md bg-white/5 mx-auto" />
      </div>

      {/* Content area */}
      <div
        className="relative h-[calc(100%-32px)] overflow-hidden"
        style={{ background: gradient }}
      >
        <DecorativeGrid />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3), transparent 60%)",
          }}
        />
        <MockContent gradient={gradient} />
      </div>
    </div>
  )
}
