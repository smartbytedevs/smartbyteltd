"use client"

import { useState, useRef, useMemo, useCallback, useEffect } from "react"
import { motion } from "motion/react"

const NODE_COUNT = 16

function Node({ label, index, total, cx, cy, radius, isActive, isDimmed, onClick, onHover, onLeave, mouseX, mouseY }) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const baseX = cx + Math.cos(angle) * radius
  const baseY = cy + Math.sin(angle) * radius

  const parallaxX = (mouseX - 0.5) * 6
  const parallaxY = (mouseY - 0.5) * 6

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="absolute outline-none"
      style={{
        left: baseX - 60,
        top: baseY - 18,
        width: 120,
      }}
      animate={{
        x: parallaxX,
        y: parallaxY,
      }}
      transition={{ type: "spring", stiffness: 80, damping: 20, mass: 0.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="relative px-3 py-1.5 rounded-full border text-[11px] font-medium whitespace-nowrap text-center transition-colors duration-500"
        animate={{
          borderColor: isActive
            ? "rgba(0, 194, 168, 0.5)"
            : isDimmed
              ? "rgba(255,255,255,0.04)"
              : "rgba(255,255,255,0.08)",
          background: isActive
            ? "rgba(0, 194, 168, 0.1)"
            : isDimmed
              ? "rgba(255,255,255,0.02)"
              : "rgba(255,255,255,0.04)",
          color: isActive
            ? "#00C2A8"
            : isDimmed
              ? "rgba(255,255,255,0.25)"
              : "rgba(255,255,255,0.7)",
          boxShadow: isActive
            ? "0 0 20px rgba(0, 194, 168, 0.15), inset 0 0 20px rgba(0, 194, 168, 0.05)"
            : "none",
        }}
        transition={{ duration: 0.4 }}
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      >
        {label}
      </motion.div>
    </motion.button>
  )
}

function FloatingParticle({ index, total, cx, cy, radius }) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const endX = cx + Math.cos(angle) * radius
  const endY = cy + Math.sin(angle) * radius
  const duration = 3 + (index % 5) * 0.7

  return (
    <motion.circle
      r="1.5"
      fill="#00C2A8"
      cx={cx}
      cy={cy}
      initial={false}
      animate={{
        cx: [cx, endX, cx],
        cy: [cy, endY, cy],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay: (index / total) * duration,
      }}
    />
  )
}

export function EcosystemVisualization({ activeNodeId, onNodeSelect, nodes }) {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [hoveredId, setHoveredId] = useState(null)

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0.5, y: 0.5 })
  }, [])

  const [orbitSize, setOrbitSize] = useState(440)
  const cx = orbitSize / 2
  const cy = orbitSize / 2
  const radius = orbitSize * 0.38

  useEffect(() => {
    const update = () => {
      const w = containerRef.current?.offsetWidth || 440
      setOrbitSize(Math.min(480, w))
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const lineData = useMemo(() => {
    return Array.from({ length: NODE_COUNT }, (_, i) => {
      const angle = (i / NODE_COUNT) * Math.PI * 2 - Math.PI / 2
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
      }
    })
  }, [cx, cy, radius])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[480px] mx-auto select-none"
    >
      {/* ═══ SVG: Connection Lines + Particles ═══ */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${cx * 2} ${cy * 2}`}
      >
        {lineData.map((point, i) => (
          <g key={i}>
            {/* Base line */}
            <line
              x1={cx}
              y1={cy}
              x2={point.x}
              y2={point.y}
              stroke={
                activeNodeId === nodes[i]?.id
                  ? "rgba(0, 194, 168, 0.25)"
                  : "rgba(255,255,255,0.06)"
              }
              strokeWidth="1"
            />
            {/* Glow line — pulses */}
            <line
              x1={cx}
              y1={cy}
              x2={point.x}
              y2={point.y}
              stroke="rgba(0, 194, 168, 0.12)"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.1;0.3;0.1"
                dur={`${3 + (i % 4) * 0.5}s`}
                repeatCount="indefinite"
              />
            </line>
            {/* Floating particle */}
            <FloatingParticle
              index={i}
              total={NODE_COUNT}
              cx={cx}
              cy={cy}
              radius={radius}
            />
          </g>
        ))}
      </svg>

      {/* ═══ Center Hub ═══ */}
      <motion.div
        className="absolute rounded-full flex items-center justify-center pointer-events-none"
        style={{
          left: cx - 52,
          top: cy - 52,
          width: 104,
          height: 104,
        }}
        animate={{
          x: (mousePos.x - 0.5) * 8,
          y: (mousePos.y - 0.5) * 8,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 25, mass: 0.8 }}
      >
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(0, 194, 168, 0.15), transparent 70%)",
            filter: "blur(16px)",
          }}
        />
        {/* Border ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px solid rgba(0, 194, 168, 0.2)",
            background: "rgba(11, 16, 32, 0.8)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        />
        {/* Inner glow */}
        <div
          className="absolute inset-4 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 194, 168, 0.1), transparent 70%)",
          }}
        />
        {/* Text */}
        <div className="relative z-10 text-center">
          <span className="text-[10px] font-semibold tracking-label uppercase text-white/40 block leading-tight">
            Your
          </span>
          <span className="text-sm font-bold text-foreground block leading-tight">
            Business
          </span>
        </div>
      </motion.div>

      {/* ═══ Nodes ═══ */}
      {nodes.map((node, i) => (
        <Node
          key={node.id}
          label={node.label}
          index={i}
          total={NODE_COUNT}
          cx={cx}
          cy={cy}
          radius={radius}
          isActive={activeNodeId === node.id}
          isDimmed={hoveredId !== null && hoveredId !== node.id}
          onClick={() => onNodeSelect(node.id)}
          onHover={() => setHoveredId(node.id)}
          onLeave={() => setHoveredId(null)}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
        />
      ))}
    </div>
  )
}
