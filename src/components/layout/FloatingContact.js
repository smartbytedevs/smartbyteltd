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
    subtitle: "Usually replies within 10 minutes.",
    action: () => window.open("https://wa.me/8801XXXXXXXXX", "_blank"),
    gradient: "from-[#25D366]/20 to-[#128C7E]/10",
    iconColor: "text-[#25D366]",
  },
  {
    icon: Phone,
    title: "Call Us",
    subtitle: "Speak directly with our team.",
    action: () => {
      window.location.href = "tel:+8801XXXXXXXXX"
    },
    gradient: "from-accent-secondary/20 to-accent-secondary/5",
    iconColor: "text-accent-secondary",
  },
  {
    icon: Mail,
    title: "Email",
    subtitle: "Send project details.",
    action: () => {
      window.location.href = "mailto:hello@smartbyte.dev"
    },
    gradient: "from-accent/20 to-accent-secondary/10",
    iconColor: "text-accent",
  },
  {
    icon: Calendar,
    title: "Book Consultation",
    subtitle: "Free 30-minute discussion.",
    action: () => { window.location.href = "/contact" },
    gradient: "from-accent-secondary/20 to-accent-secondary/10",
    iconColor: "text-accent-secondary",
  },
]

function PanelContent({ onClose }) {
  const contactOptions = getContactOptions()

  return (
    <div className="relative p-5">
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(80, 255, 175, 0.15), transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.12), transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold text-white">
              Let&apos;s Build{" "}
              <span className="text-[#50FFAF]">Something Amazing</span>
            </h3>
            <p className="mt-1.5 text-sm text-slate-400">
              Choose how you&apos;d like to start your project.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-all duration-300 hover:bg-slate-700 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Options */}
        <div className="mt-5 space-y-3">
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
              className="group relative w-full rounded-xl border border-slate-800 bg-slate-900 p-3.5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#50FFAF]/40 hover:bg-slate-800 hover:shadow-lg"
            >
              <div className="relative flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#50FFAF]/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
                  <opt.icon className="h-[18px] w-[18px] text-[#50FFAF]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold text-white">
                    {opt.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-400">
                    {opt.subtitle}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#50FFAF] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 border-t border-slate-800 pt-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-emerald-400">
              Online Now
            </span>
            <span className="ml-auto text-xs text-slate-400">
              Avg. response: under 30 min
            </span>
          </div>
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
      {/* Outer ring — dark purple */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "#40e69d",
          boxShadow:
            "0 0 40px rgba(76, 29, 149, 0.35), 0 8px 32px rgba(0,0,0,0.3)",
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
              SAY HI • HIRE US • CONTACT US • DROP A LINE •{" "}
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Inner white circle */}
      <div className="relative z-10 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white shadow-lg">
        <motion.div
          animate={{ y: isHovered ? 3 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#4C1D95]" />
        </motion.div>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute -inset-3 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(76, 29, 149, 0.2), transparent 70%)",
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
            className="fixed inset-x-0 bottom-0 z-[9999] block overflow-hidden rounded-t-3xl border border-slate-800 bg-slate-950 shadow-2xl md:hidden"
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
              className="hidden overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl md:block md:w-[380px]"
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
