"use client"

import { useState, useRef, useCallback } from "react"
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
      className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px] outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-lg"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-[2px] rounded-full bg-foreground"
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
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const navbarRef = useRef(null)
  const pathname = usePathname()

  const { scrollY } = useScroll()

  const scrolled = useTransform(scrollY, [0, 100], [0, 1])

  const h = useSpring(useTransform(scrolled, [0, 1], [80, 60]), {
    stiffness: 200,
    damping: 30,
  })
  const logoScale = useTransform(scrolled, [0, 1], [1, 0.85])
  const go = useTransform(scrolled, [0, 1], [0, 1])
  const bl = useSpring(useTransform(scrolled, [0, 1], [0, 24]), {
    stiffness: 200,
    damping: 30,
  })
  const backDrop = useTransform(bl, (v) => `blur(${v}px) saturate(1.3)`)
  const si = useTransform(scrolled, [0, 1], [0, 0.3])

  const handleMouseMove = useCallback((e) => {
    const rect = navbarRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }, [])

  const handleCloseMobile = useCallback(() => {
    setMobileOpen(false)
  }, [])

  return (
    <>
      <motion.header
        ref={navbarRef}
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-1/2 -translate-x-1/2 z-50"
        style={{
          top: 16,
          width: "min(92%, 1440px)",
          height: h,
          borderRadius: 16,
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Glass background */}
        <motion.div
          className="absolute inset-0"
          style={{
            borderRadius: "inherit",
            opacity: go,
            WebkitBackdropFilter: backDrop,
            backdropFilter: backDrop,
            background: "rgba(13, 13, 24, 0.78)",
          }}
        />

        {/* Subtle noise texture */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: "inherit",
            opacity: useTransform(scrolled, [0, 1], [0, 0.5]),
          }}
          aria-hidden="true"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "128px 128px",
              opacity: 0.04,
            }}
          />
        </motion.div>

        {/* Animated gradient reflection */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ borderRadius: "inherit", opacity: useTransform(scrolled, [0, 1], [0, 0.6]) }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(135deg, transparent, rgba(0,240,255,0.06), transparent)",
                "linear-gradient(135deg, transparent, rgba(139,92,246,0.06), transparent)",
                "linear-gradient(135deg, transparent, rgba(0,240,255,0.06), transparent)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Mouse spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: "inherit",
            opacity: useTransform(
              [go, scrolled],
              ([o, s]) => o * s * 0.6
            ),
          }}
          aria-hidden="true"
        >
          <div
            className="w-full h-full"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(0, 240, 255, 0.08), transparent 60%)`,
            }}
          />
        </motion.div>

        {/* Border + shadow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: "inherit",
            opacity: scrolled,
            boxShadow: useTransform(si, (v) =>
              `inset 0 0 0 1px rgba(255,255,255,${v * 0.1}), 0 8px 40px rgba(255,255,255,${v * 0.16})`
            ),
          }}
        />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-[15%] right-[15%] h-px pointer-events-none overflow-hidden"
          style={{ opacity: scrolled }}
          aria-hidden="true"
        >
          <motion.div
            className="w-full h-full bg-gradient-to-r from-transparent via-accent/15 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* ── Content ── */}
        <div className="relative z-10 flex items-center justify-between h-full px-5 sm:px-6 lg:px-8">
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
