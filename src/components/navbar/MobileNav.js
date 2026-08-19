"use client"

import { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, ArrowRight } from "lucide-react"
import { NavItem } from "./NavItem"
export function MobileNav({ isOpen, onClose, links, activeHref }) {
  const handleQuote = useCallback(() => {
    onClose()
    setTimeout(() => (window.location.href = "/contact"), 300)
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-[9998] bg-white/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col items-center justify-center h-full px-6">
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="absolute top-20 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <nav className="flex flex-col items-center gap-2">
              {links.map((link) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: links.indexOf(link) * 0.05 }}
                >
                  <NavItem
                    href={link.href}
                    label={link.label}
                    isActive={activeHref === link.href}
                    onClick={onClose}
                  />
                </motion.div>
              ))}
            </nav>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={handleQuote}
              className="mt-10 inline-flex items-center gap-2 bg-[#50FFAF] hover:bg-[#40E69D] text-gray-900 text-base font-semibold px-8 py-4 rounded-full transition-colors duration-300 shadow-sm"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
