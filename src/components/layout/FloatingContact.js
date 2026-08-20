"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  ArrowUpRight,
  X,
} from "lucide-react"

const circularText = "Say Hi • Hire Us • Contact Us • Drop a Line • "

const getContactOptions = () => [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    subtitle: "Instant reply",
    action: () => window.open("https://wa.me/8801234567890", "_blank"),
  },
  {
    icon: Phone,
    title: "Call Us",
    subtitle: "Direct phone line",
    action: () => {
      window.location.href = "tel:+8801234567890"
    },
  },
  {
    icon: Mail,
    title: "Email",
    subtitle: "Send project brief",
    action: () => {
      window.location.href = "mailto:hello@smartbyte.com"
    },
  },
  {
    icon: Calendar,
    title: "Book Consultation",
    subtitle: "Free 30-min strategy call",
    action: () => {
      window.location.href = "/contact"
    },
  },
]

function PanelContent({ onClose }) {
  const contactOptions = getContactOptions()

  return (
    <div className="relative p-6">
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">
              Let&apos;s Build{" "}
              <span className="text-[#8ba4ff]">Something Great</span>
            </h3>
            <p className="mt-1 text-xs text-neutral-400">
              Select your preferred way to reach out.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Options */}
        <div className="mt-5">
          {contactOptions.map((opt, idx) => (
            <motion.button
              key={opt.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + idx * 0.05,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => {
                onClose()
                setTimeout(opt.action, 300)
              }}
              whileTap={{ scale: 0.98 }}
              className="group w-full bg-[#161616] hover:bg-[#222222] border border-neutral-800/80 hover:border-neutral-700 rounded-2xl p-3.5 transition-all flex items-center justify-between cursor-pointer mb-2.5 last:mb-0 text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800 text-[#8ba4ff] group-hover:scale-105 transition-transform">
                  <opt.icon className="w-[18px] h-[18px]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {opt.title}
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {opt.subtitle}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 shrink-0 text-[#8ba4ff] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 mt-3 border-t border-neutral-900 flex items-center justify-between text-xs font-medium text-neutral-500">
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#8ba4ff] animate-pulse inline-block mr-2" />
            Available for new projects
          </div>
          <span>Avg reply: &lt; 15m</span>
        </div>
      </div>
    </div>
  )
}

function CircularBadge({ onClick, isVisible }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative flex h-24 w-24 md:h-32 md:w-32 cursor-pointer items-center justify-center outline-none"
      aria-label="Open contact menu"
    >
      {/* Outer ring — mint green */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "#8ba4ff",
          boxShadow:
            "0 0 40px rgba(139, 164, 255, 0.35), 0 8px 32px rgba(0,0,0,0.3)",
        }}
      />

      {/* Rotating SVG circular text */}
      <motion.div
        className="absolute inset-0 overflow-visible"
        animate={{ rotate: 360 }}
        transition={{
          duration: isHovered ? 6 : 12,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <path
              id="textPath"
              d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
              fill="none"
            />
          </defs>
          <text
            fill="#000000"
            fontSize="9"
            fontWeight="600"
            letterSpacing="3.5"
            className="uppercase"
          >
            <textPath href="#textPath" startOffset="0%">
              {circularText}
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Inner dark circle */}
      <div className="relative z-10 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#0D0D0D] shadow-lg">
        <motion.div
          animate={{ y: isHovered ? 3 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#8ba4ff]" />
        </motion.div>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute -inset-3 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 164, 255, 0.2), transparent 70%)",
        }}
      />
    </motion.button>
  )
}

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  // Scroll visibility: show after scrolling past ~400px
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, close])

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-panel"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 28,
              mass: 0.9,
            }}
            className="fixed inset-x-0 bottom-0 z-[9999] block overflow-hidden rounded-t-3xl border border-neutral-800 bg-[#0D0D0D] shadow-2xl md:hidden"
          >
            <PanelContent onClose={close} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed bottom-right anchor */}
      <div className="fixed bottom-6 right-6 z-[9999] md:bottom-8 md:right-8">
        <AnimatePresence mode="popLayout">
          {isOpen ? (
            <motion.div
              key="desktop-panel"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 28,
                mass: 0.9,
              }}
              className="hidden overflow-hidden rounded-3xl border border-neutral-800 bg-[#0D0D0D] shadow-2xl md:block md:w-[380px]"
              style={{ marginBottom: "calc(128px + 16px)" }}
            >
              <PanelContent onClose={close} />
            </motion.div>
          ) : (
            <motion.div
              key="badge"
              layout
              className="flex justify-end"
            >
              <CircularBadge onClick={open} isVisible={isVisible} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
