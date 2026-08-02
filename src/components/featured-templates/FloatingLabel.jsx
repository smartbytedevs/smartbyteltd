"use client"

import { motion } from "motion/react"

const labelStyles = {
  "BEST SELLER": "bg-gradient-to-r from-amber-500 to-orange-500 text-black",
  POPULAR: "bg-gradient-to-r from-accent to-accent-secondary text-background",
  NEW: "bg-gradient-to-r from-blue-500 to-violet-500 text-white",
  TRENDING: "bg-gradient-to-r from-pink-500 to-rose-500 text-white",
  LIMITED: "bg-gradient-to-r from-red-500 to-rose-600 text-white",
}

export function FloatingLabel({ label, style }) {
  return (
    <motion.span
      className={`absolute text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full shadow-lg ${labelStyles[label] || labelStyles.NEW}`}
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={style}
    >
      {label}
    </motion.span>
  )
}
