"use client"

import { useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import Link from "next/link"
import { CTAButton } from "./CTAButton"

export function MobileNav({ isOpen, onClose, links, activeHref }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-40"
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Dark overlay with blur */}
          <div className="absolute inset-0 bg-background/95 backdrop-blur-3xl" />

          {/* Menu content — slides downward */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 30,
              mass: 1,
            }}
            className="relative z-10 flex flex-col items-center justify-center h-full px-8"
          >
            {/* Navigation links */}
            <nav
              className="flex flex-col items-center gap-6 -mt-16"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {links.map((link, i) => {
                const isActive = link.href === activeHref
                return (
                  <SafeSlideUp
                    key={link.href}
                    delay={i * 0.06}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`block font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-md px-2 ${
                        isActive
                          ? "text-accent"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {isActive ? (
                        <motion.span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                          {link.label}
                        </motion.span>
                      ) : (
                        link.label
                      )}
                    </Link>
                  </SafeSlideUp>
                )
              })}
            </nav>

            {/* CTA fixed at bottom */}
            <SafeSlideUp
              delay={links.length * 0.06}
              className="absolute bottom-10 left-8 right-8"
            >
              <CTAButton onClick={onClose} mobile />
            </SafeSlideUp>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
