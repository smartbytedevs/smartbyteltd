"use client"

import Link from "next/link"
import { motion } from "motion/react"

export function NavItem({ href, label, isActive, isFirst, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 ${
        isActive
          ? "text-black font-semibold"
          : "text-neutral-600 hover:text-black"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute inset-0 bg-[#8ba4ff] rounded-full shadow-xs"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">
        {isActive && <span className="text-xs">{isFirst ? "←" : "→"}</span>}
        {label}
      </span>
    </Link>
  )
}
