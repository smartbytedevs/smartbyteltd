"use client"

import { useRef, useState, useCallback } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

function ProjectThumb({ project, priority }) {
  const src = project.thumbnail || project.coverImage

  if (!src) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 rounded-[18px] bg-[#1C1917] border border-border/30 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(15, 118, 110, 0.05), rgba(14, 116, 144, 0.03))",
          }}
        />
        <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/45 border border-border/35 flex items-center justify-center font-display text-2xl font-bold text-accent/70">
          {project.title?.charAt(0)}
        </div>
        <span className="relative z-10 text-xs font-semibold text-muted/70 uppercase tracking-label">
          {project.title}
        </span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={`${project.title} project screenshot`}
      fill
      priority={priority}
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="object-cover"
    />
  )
}

export function ProjectImage({ project, index }) {
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
          background: "linear-gradient(135deg, rgba(15, 118, 110, 0.12), rgba(14, 116, 144, 0.06))",
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
            isHovered ? "border-accent/25" : "border-border/30"
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
          <ProjectThumb project={project} priority={index === 0} />

          {/* Dark overlay on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: isHovered ? 0.4 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: "linear-gradient(135deg, rgba(15, 118, 110, 0.08), rgba(11, 16, 32, 0.5))",
            }}
          />
        </motion.div>

        {/* Hover overlay text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/60 backdrop-blur-md border border-border/35">
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
