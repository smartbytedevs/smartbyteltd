"use client"

import { motion, useReducedMotion } from "motion/react"

const EASE = [0.16, 1, 0.3, 1]

export function EcosystemGrid({ activeNodeId, onNodeSelect, nodes }) {
  const reduced = useReducedMotion()

  return (
    <div
      role="group"
      aria-label="SmartByte business solutions"
      className="max-w-[1100px] mx-auto"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {nodes.map((node, i) => {
          const Icon = node.icon
          const isActive = activeNodeId === node.id

          return (
            <motion.div
              key={node.id}
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 4) * 0.06, duration: 0.5, ease: EASE }}
            >
              <motion.button
                type="button"
                onClick={() => onNodeSelect(node.id)}
                onMouseEnter={() => onNodeSelect(node.id)}
                aria-pressed={isActive}
                whileHover={reduced ? undefined : { y: -4 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative w-full flex flex-col items-center gap-3 rounded-2xl border px-4 py-5 text-center outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 transition-colors duration-300"
                style={{
                  borderColor: isActive ? "rgba(0, 194, 168, 0.45)" : "rgba(255, 255, 255, 0.06)",
                  background: isActive ? "rgba(0, 194, 168, 0.07)" : "rgba(255, 255, 255, 0.03)",
                  boxShadow: isActive
                    ? "0 0 30px rgba(0, 194, 168, 0.12), inset 0 0 20px rgba(0, 194, 168, 0.03)"
                    : "none",
                }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-300"
                  style={{
                    background: isActive ? "rgba(0, 194, 168, 0.15)" : "rgba(0, 194, 168, 0.08)",
                    border: `1px solid ${
                      isActive ? "rgba(0, 194, 168, 0.3)" : "rgba(255, 255, 255, 0.06)"
                    }`,
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: isActive ? "#00C2A8" : "rgba(0, 194, 168, 0.8)" }}
                  />
                </span>
                <span
                  className="text-xs sm:text-sm font-medium leading-snug transition-colors duration-300"
                  style={{ color: isActive ? "#00C2A8" : "rgba(255, 255, 255, 0.85)" }}
                >
                  {node.label}
                </span>
              </motion.button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
