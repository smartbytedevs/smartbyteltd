"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"

export function NavItem({ href, label, isActive, onClick }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 rounded-lg"
    >
      <motion.span
        className="relative z-10"
        animate={{ color: isActive ? "#111827" : hovered ? "#111827" : "#4B5563" }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>

      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute inset-0 rounded-lg bg-gray-100"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}

      {!isActive && hovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute inset-0 rounded-lg bg-gray-50"
          transition={{ duration: 0.15 }}
        />
      )}
    </Link>
  )
}
