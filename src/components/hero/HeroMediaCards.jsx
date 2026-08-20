"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"

export function HeroMediaCard({ src, alt, className = "", delay = 0 }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      className={`relative inline-block overflow-hidden rounded-2xl shadow-lg shadow-black/5 border border-gray-200/80 ${className}`}
    >
      <div className="relative w-full h-full">
        {!imgError ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 120px, 180px"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs font-medium">{alt}</span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
    </motion.div>
  )
}

export function HeroFloatingBadge({ children, className = "", delay = 0, color = "mint" }) {
  const colorClasses = {
    mint: "bg-[#8ba4ff] text-gray-900",
    pink: "bg-[#FF3B5C] text-white",
    dark: "bg-gray-900 text-white",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center ${colorClasses[color]} px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function HeroFloatingBadgeFloat({ children, className = "", delay = 0, color = "mint" }) {
  const colorClasses = {
    mint: "bg-[#8ba4ff] text-gray-900",
    pink: "bg-[#FF3B5C] text-white",
    dark: "bg-gray-900 text-white",
    purple: "bg-[#f5efab] text-black",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: [0, -8, 0],
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 },
        scale: { duration: 0.5, delay },
      }}
      whileHover={{ scale: 1.08 }}
      className={`inline-flex items-center ${colorClasses[color]} px-4 py-1.5 rounded-full text-sm font-semibold shadow-md ${className}`}
    >
      {children}
    </motion.div>
  )
}
