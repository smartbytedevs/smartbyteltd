"use client"

import { useState, useCallback } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import Link from "next/link"
import { Logo } from "./Logo"
import { DesktopNav } from "./DesktopNav"
import { MobileNav } from "./MobileNav"
import { navLinks } from "@/data/navigation"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const handleCloseMobile = useCallback(() => {
    setMobileOpen(false)
  }, [])

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 pt-6 px-6 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          <Logo />
          <DesktopNav links={navLinks} activeHref={pathname} />
        </div>
      </header>

      {/* Mobile Floating Pill Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 p-4">
        <div className="bg-white/90 backdrop-blur-md rounded-full px-5 py-2.5 flex items-center justify-between border border-neutral-200/80 shadow-sm">
          <Link
            href="/"
            aria-label="SmartByte home"
            className="text-xl font-extrabold tracking-widest text-neutral-900 uppercase"
          >
            SMARTBYTE
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="bg-[#8ba4ff] text-black font-semibold text-xs px-4 py-2 rounded-full hover:bg-[#a0b8ff] transition-colors"
            >
              Contact
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="bg-black text-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4 text-[#8ba4ff]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Over Drawer */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={handleCloseMobile}
        links={navLinks}
        activeHref={pathname}
      />
    </>
  )
}
