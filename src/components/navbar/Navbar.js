"use client"

import { useState, useCallback } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react"
import { usePathname } from "next/navigation"
import { Logo } from "./Logo"
import { DesktopNav } from "./DesktopNav"
import { CTAButton } from "./CTAButton"
import { MobileNav } from "./MobileNav"
import { navLinks } from "@/data/navigation"

function MobileToggle({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px] outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 rounded-lg"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-[2px] rounded-full bg-gray-900"
          style={{
            width: i === 1 ? "60%" : "100%",
            transformOrigin: "center",
          }}
          animate={
            isOpen
              ? {
                  rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                  y: i === 0 ? 7 : i === 2 ? -7 : 0,
                  opacity: i === 1 ? 0 : 1,
                  width: i === 1 ? "0%" : i === 0 || i === 2 ? "80%" : "60%",
                }
              : {
                  rotate: 0,
                  y: 0,
                  opacity: 1,
                  width: i === 1 ? "60%" : "100%",
                }
          }
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 22,
            mass: 0.6,
          }}
        />
      ))}
    </button>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const { scrollY } = useScroll()

  const scrolled = useTransform(scrollY, [0, 100], [0, 1])

  const h = useSpring(useTransform(scrolled, [0, 1], [72, 60]), {
    stiffness: 200,
    damping: 30,
  })
  const logoScale = useTransform(scrolled, [0, 1], [1, 0.85])
  const bgOpacity = useTransform(scrolled, [0, 1], [0.8, 0.95])
  const shadowBlur = useSpring(useTransform(scrolled, [0, 1], [8, 24]), {
    stiffness: 200,
    damping: 30,
  })
  const shadow = useTransform(shadowBlur, (v) => `0 ${v}px ${v * 2}px rgba(0,0,0,0.08)`)

  const handleCloseMobile = useCallback(() => {
    setMobileOpen(false)
  }, [])

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-1/2 -translate-x-1/2 z-50"
        style={{
          top: 12,
          width: "min(92%, 1200px)",
          height: h,
          borderRadius: 999,
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border border-gray-200/60"
          style={{
            opacity: bgOpacity,
            WebkitBackdropFilter: "blur(16px) saturate(1.4)",
            backdropFilter: "blur(16px) saturate(1.4)",
            background: "rgba(255, 255, 255, 0.82)",
            boxShadow: shadow,
          }}
        />

        <div className="relative z-10 flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
          <Logo scale={logoScale} />

          <DesktopNav links={navLinks} activeHref={pathname} />

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <CTAButton />
            </div>
            <MobileToggle
              isOpen={mobileOpen}
              onClick={() => setMobileOpen((p) => !p)}
            />
          </div>
        </div>
      </motion.header>

      <MobileNav
        isOpen={mobileOpen}
        onClose={handleCloseMobile}
        links={navLinks}
        activeHref={pathname}
      />
    </>
  )
}
