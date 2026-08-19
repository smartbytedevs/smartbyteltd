"use client"

import { motion } from "motion/react"

const EASE = [0.16, 1, 0.3, 1]

export function EcosystemGrid({ activeNodeId, onNodeSelect, nodes }) {
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 4) * 0.06, duration: 0.5, ease: EASE }}
            >
              <motion.button
                type="button"
                onClick={() => onNodeSelect(node.id)}
                onMouseEnter={() => onNodeSelect(node.id)}
                aria-pressed={isActive}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group relative w-full flex flex-col items-center gap-3 rounded-2xl border px-4 py-5 text-center outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#50FFAF]/60 transition-all duration-300 ${
                  isActive
                    ? "border-[#50FFAF]/40 bg-[#50FFAF]/5 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-300 ${
                    isActive
                      ? "bg-[#50FFAF]/15 border border-[#50FFAF]/30"
                      : "bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? "text-[#50FFAF]" : "text-gray-400"
                    }`}
                  />
                </span>
                <span
                  className={`text-xs sm:text-sm font-medium leading-snug transition-colors duration-300 ${
                    isActive ? "text-gray-900" : "text-gray-500"
                  }`}
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
