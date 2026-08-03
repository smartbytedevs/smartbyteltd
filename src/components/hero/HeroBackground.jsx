"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

export function HeroBackground() {
  const ref = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 })

  useEffect(() => {
    const handleMouse = (e) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x * 20)
      mouseY.set(y * 20)
    }

    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="hero-orb" />
      <div className="hero-orb" />
      <div className="hero-orb" />
      <div className="hero-curve" />
      <div className="hero-curve" />

      <motion.div
        className="absolute inset-0 bg-grid"
        style={{
          x: springX,
          y: springY,
        }}
      />

      <motion.div
        className="absolute top-1/4 left-1/3 w-[800px] h-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(180, 83, 9, 0.1) 0%, transparent 70%)",
          x: springX,
          y: springY,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(160, 58, 30, 0.08) 0%, transparent 70%)",
          x: springX,
          y: springY,
        }}
      />
    </div>
  )
}
