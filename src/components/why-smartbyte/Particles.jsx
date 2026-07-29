"use client"

import { useMemo } from "react"
import { motion, useReducedMotion } from "motion/react"

const PARTICLE_COUNT = 20

function ParticleDot({ p, animate }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        opacity: p.opacity,
      }}
      {...(animate
        ? {
            animate: {
              y: [0, -30, 0, 20, 0],
              opacity: [p.opacity, p.opacity * 2, p.opacity, p.opacity * 0.5, p.opacity],
            },
            transition: {
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            },
          }
        : {})}
    />
  )
}

export function Particles() {
  const prefersReduced = useReducedMotion()

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: (i * 17 + 3) % 100,
      y: (i * 31 + 7) % 100,
      size: ((i * 13 + 5) % 3) + 1,
      duration: ((i * 7 + 11) % 20) + 15,
      delay: ((i * 19 + 3) % 10),
      opacity: ((i * 11 + 7) % 30) / 100 + 0.05,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <ParticleDot key={p.id} p={p} animate={!prefersReduced} />
      ))}
    </div>
  )
}
