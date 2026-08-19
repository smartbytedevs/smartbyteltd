"use client"

import { useRef, useEffect, useState } from "react"
import { animate } from "motion/react"
import Link from "next/link"

export function Logo({ scale }) {
  const ref = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const el = ref.current
    if (!el) return

    const glow = animate(
      el,
      { filter: ["brightness(1)", "brightness(1.05)", "brightness(1)"] },
      { duration: 4, repeat: Infinity, ease: "easeInOut" }
    )

    return () => glow?.cancel()
  }, [])

  return (
    <Link
      href="/"
      aria-label="SmartByte home"
      className="relative block outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 rounded-md"
      style={{ height: 40 }}
    >
      <span
        ref={ref}
        className="flex items-center h-full tracking-[-0.03em] leading-none"
        style={{ scale }}
      >
        <span className="font-display text-[20px] sm:text-[24px] lg:text-[28px] font-bold text-gray-900">
          Smart
        </span>
        <span
          className="font-display text-[20px] sm:text-[24px] lg:text-[28px] font-bold text-gray-900"
          style={{
            transition: "filter 0.25s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(0.7)" }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)" }}
        >
          Byte
        </span>
      </span>
    </Link>
  )
}
