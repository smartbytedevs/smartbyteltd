"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"

export function NavItem({ href, label, isActive, onClick }) {
  const [isHovered, setIsHovered] = useState(false)
  const prefersReduced = useReducedMotion()

  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-md"
      aria-current={isActive ? "page" : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background fade */}
      <motion.div
        className="absolute inset-0 rounded-md"
        animate={{
          background:
            isHovered || isActive
              ? "rgba(255,255,255,0.04)"
              : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glowing dot */}
      <motion.span
        className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
        animate={
          prefersReduced
            ? {}
            : {
                opacity: isHovered || isActive ? 1 : 0,
                scale: isHovered || isActive ? 1 : 0,
                background:
                  isActive
                    ? "#00C2A8"
                    : "linear-gradient(135deg, #00C2A8, #38BDF8)",
                boxShadow:
                  isHovered || isActive
                    ? "0 0 6px rgba(0, 194, 168, 0.4)"
                    : "0 0 0px transparent",
              }
        }
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
        }}
      />

      {/* Label */}
      <motion.span
        className={`relative inline-block text-xs font-semibold tracking-label uppercase ${
          isActive
            ? "text-white"
            : "text-muted-foreground"
        }`}
        animate={
          prefersReduced
            ? {}
            : {
                y: isHovered ? -1 : 0,
              }
        }
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Gradient text on hover */}
        <motion.span
          className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text"
          animate={
            prefersReduced
              ? { color: isActive ? "white" : "rgb(161 161 170)" }
              : {
                  WebkitTextFillColor:
                    isHovered ? "transparent" : isActive ? "white" : "rgb(161 161 170)",
                  color:
                    isHovered ? "transparent" : isActive ? "white" : "rgb(161 161 170)",
                }
          }
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.span>
      </motion.span>

      {/* Underline — grows from center */}
      <span className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-0 h-[2px] overflow-hidden">
        <motion.span
          className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-secondary"
          animate={
            prefersReduced
              ? { width: isActive ? "100%" : "0%" }
              : {
                  width: isHovered || isActive ? "100%" : "0%",
                }
          }
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25,
          }}
        />
      </span>

      {/* Active indicator — cyan line */}
      {isActive && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute -bottom-[2px] left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-accent to-accent-secondary"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  )
}
