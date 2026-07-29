"use client"

import { useRef, useState, useCallback } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

function BrowserMockup({ accent }) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-[18px] bg-[#0D1117] border border-white/[0.06]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#0D1117]/80">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-6 rounded-md bg-white/[0.04] border border-white/[0.04] flex items-center px-3">
            <span className="text-[9px] text-white/20 truncate">
              https://smartbyte.agency/project
            </span>
          </div>
        </div>
      </div>

      {/* Page content — gradient + UI mockup */}
      <div className="flex-1 relative overflow-hidden">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${accent.includes("accent") ? "rgba(0, 194, 168, 0.04)" : "rgba(56, 189, 248, 0.04)"}, rgba(11, 16, 32, 0.6))`,
          }}
        />

        {/* Decorative shapes */}
        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col gap-3">
          {/* Header bar */}
          <div className="flex items-center gap-3">
            <div className="h-3 w-20 rounded-full bg-white/[0.04]" />
            <div className="h-3 w-14 rounded-full bg-white/[0.02]" />
            <div className="flex-1" />
            <div className="h-6 w-16 rounded-md border border-white/[0.04]" />
          </div>

          {/* Hero area */}
          <div className="flex-1 grid grid-cols-5 gap-3">
            {/* Main content area */}
            <div className="col-span-3 flex flex-col gap-3">
              <div className="h-5 w-3/4 rounded-full bg-white/[0.04]" />
              <div className="h-5 w-1/2 rounded-full bg-white/[0.03]" />
              <div className="flex-1 grid grid-cols-2 gap-2 mt-2">
                <div className="rounded-lg bg-white/[0.03] border border-white/[0.04] p-2 flex flex-col gap-1.5">
                  <div className="h-2 w-12 rounded-full bg-white/[0.04]" />
                  <div className="h-5 w-full rounded-md bg-gradient-to-r from-accent/10 to-accent-secondary/10" />
                </div>
                <div className="rounded-lg bg-white/[0.03] border border-white/[0.04] p-2 flex flex-col gap-1.5">
                  <div className="h-2 w-12 rounded-full bg-white/[0.04]" />
                  <div className="h-5 w-full rounded-md bg-gradient-to-r from-accent-secondary/10 to-blue-400/10" />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-span-2 flex flex-col gap-2">
              <div className="flex-1 rounded-lg bg-white/[0.02] border border-white/[0.04] p-3 flex flex-col gap-2">
                <div className="h-2 w-16 rounded-full bg-white/[0.04]" />
                <div className="h-2 w-12 rounded-full bg-white/[0.03]" />
                <div className="h-2 w-14 rounded-full bg-white/[0.03]" />
                <div className="flex-1" />
                <div className="h-6 rounded-md bg-gradient-to-r from-accent/15 to-accent-secondary/15" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[rgba(11,16,32,0.5)] to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

export function ProjectImage({ accent, index }) {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setMousePos({ x: 0.5, y: 0.5 })
  }, [])

  const parallaxX = (mousePos.x - 0.5) * 8
  const parallaxY = (mousePos.y - 0.5) * 8

  return (
    <div className="relative w-full">
      {/* Glass border glow behind */}
      <div
        className={`absolute -inset-[2px] rounded-[28px] opacity-0 transition-opacity duration-500 pointer-events-none ${
          isHovered ? "opacity-100" : ""
        }`}
        style={{
          background: "linear-gradient(135deg, rgba(0, 194, 168, 0.12), rgba(56, 189, 248, 0.06))",
          filter: "blur(8px)",
        }}
      />

      {/* Main container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-[28px] overflow-hidden cursor-pointer"
        style={{
          aspectRatio: "16/10",
        }}
      >
        {/* Border */}
        <div
          className={`absolute inset-0 rounded-[28px] border transition-colors duration-500 z-10 pointer-events-none ${
            isHovered ? "border-accent/25" : "border-white/[0.06]"
          }`}
        />

        {/* Image container with zoom */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.08 : 1,
            x: parallaxX,
            y: parallaxY,
          }}
          transition={{
            scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            x: { type: "spring", stiffness: 80, damping: 25, mass: 0.5 },
            y: { type: "spring", stiffness: 80, damping: 25, mass: 0.5 },
          }}
        >
          <BrowserMockup accent={accent} />

          {/* Dark overlay on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: isHovered ? 0.4 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: "linear-gradient(135deg, rgba(0, 194, 168, 0.08), rgba(11, 16, 32, 0.5))",
            }}
          />
        </motion.div>

        {/* Hover overlay text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/60 backdrop-blur-md border border-white/[0.08]">
            <span className="text-xs font-semibold text-foreground">View Project</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent" />
          </div>
        </motion.div>

        {/* Floating animation */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 5 + (index % 3) * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  )
}
