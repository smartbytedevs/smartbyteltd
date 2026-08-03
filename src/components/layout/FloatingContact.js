"use client"

import { useState, useEffect, useCallback, useSyncExternalStore } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useQuoteModal } from "@/components/quote/QuoteModalContext"
import {
  Rocket,
  Globe,
  Code2,
  ShoppingCart,
  Bot,
  Lightbulb,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  X,
} from "lucide-react"

const messages = [
  { text: "Launch Your Startup", icon: Rocket, keywords: ["Startup"] },
  { text: "Build Your Website", icon: Globe, keywords: ["Website"] },
  { text: "Need Custom Software?", icon: Code2, keywords: ["Custom Software"] },
  { text: "Grow Your Online Store", icon: ShoppingCart, keywords: ["Online Store"] },
  { text: "Automate Your Business", icon: Bot, keywords: ["Business"] },
  { text: "Free Consultation", icon: Lightbulb, keywords: ["Consultation"] },
]

const DISPLAY_DURATION = 6000

const getContactOptions = (openQuoteModal) => [
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
    action: () => openQuoteModal({ source: "floating" }),
    gradient: "from-[#8B5CF6]/20 to-[#6366F1]/10",
    iconColor: "text-[#8B5CF6]",
  },
]

function HighlightedText({ text, keywords }) {
  const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"))
  return (
    <>
      {parts.map((part, i) =>
        keywords.includes(part) ? (
          <span
            key={i}
            className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

function Orb({ icon: Icon, currentIndex, reducedMotion }) {
  return (
    <div className="relative h-[56px] w-[56px] shrink-0">
      <motion.div
        className="absolute inset-[-2px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #00C2A8, #38BDF8, #00C2A8, #38BDF8, #00C2A8)",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 0.5px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 0.5px))",
        }}
        animate={reducedMotion ? { rotate: 0 } : { rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[-6px] rounded-full"
        animate={{
          boxShadow: [
            "0 0 0px rgba(0,194,168,0)",
            "0 0 25px rgba(0,194,168,0.12)",
            "0 0 0px rgba(0,194,168,0)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 10,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-[-4px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(0,194,168,0.08), transparent 70%)",
        }}
        animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.08, 1] }}
        transition={{
          duration: 4,
          repeat: reducedMotion ? 0 : Infinity,
          repeatDelay: 4,
          ease: "easeInOut",
        }}
      />
      <motion.div
        key={currentIndex}
        initial={{ rotate: 0 }}
        animate={reducedMotion ? { rotate: 0 } : { rotate: [0, 8, -8, 0] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-secondary p-[1.5px] shadow-lg"
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0B1020]/90 backdrop-blur-sm">
          <motion.div
            key={currentIndex}
            initial={{ scale: 1, rotate: 0 }}
            animate={
              reducedMotion
                ? { scale: 1 }
                : { scale: [1, 1.15, 1], rotate: [0, 8, 0] }
            }
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Icon className="h-[22px] w-[22px] text-white" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function PanelContent({ onClose, openQuoteModal }) {
  const contactOptions = getContactOptions(openQuoteModal)

  return (
    <div className="relative p-5">
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-8"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 194, 168, 0.12), transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full opacity-8"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.1), transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Let&apos;s Build{" "}
              <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                Something Amazing
              </span>
            </h3>
            <p className="mt-1.5 text-xs text-muted">
              Choose how you&apos;d like to start your project.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-muted backdrop-blur-xl transition-all duration-300 hover:rotate-90 hover:border-accent/30 hover:text-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
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
              className="group relative w-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,194,168,0.03), rgba(56,189,248,0.03))",
                }}
              />
              <div className="relative flex items-center gap-3.5">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${opt.gradient} transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]`}
                >
                  <opt.icon className={`h-[18px] w-[18px] ${opt.iconColor}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {opt.title}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-muted">
                    {opt.subtitle}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
            </motion.button>
          ))}
        </div>
        <div className="mt-4 border-t border-white/[0.05] pt-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-[11px] font-medium text-accent">
              Online Now
            </span>
            <span className="ml-auto text-[11px] text-muted">
              Avg. response: under 30 min
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function useReducedMotion() {
  const subscribe = useCallback((callback) => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    mql.addEventListener("change", callback)
    return () => mql.removeEventListener("change", callback)
  }, [])

  const getSnapshot = useCallback(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  )

  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const reducedMotion = useReducedMotion()
  const { openQuoteModal } = useQuoteModal()

  const isPaused = isHovered || isOpen
  const currentMessage = messages[currentIndex]
  const DynamicIcon = currentMessage.icon

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const advanceMessage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % messages.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(advanceMessage, DISPLAY_DURATION)
    return () => clearInterval(timer)
  }, [isPaused, advanceMessage])

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
      <style>{`
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

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
            className="fixed inset-x-0 bottom-0 z-[9999] block overflow-hidden rounded-t-3xl border border-white/[0.08] bg-[rgba(12,18,34,0.92)] shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <PanelContent onClose={close} openQuoteModal={openQuoteModal} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-[20px] right-[16px] z-[9999] md:bottom-[32px] md:right-[32px]">
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
              className="hidden overflow-hidden rounded-3xl border border-white/[0.08] bg-[rgba(12,18,34,0.92)] shadow-2xl backdrop-blur-2xl md:block md:w-[380px]"
              style={{ marginBottom: "calc(56px + 16px)" }}
            >
              <PanelContent onClose={close} openQuoteModal={openQuoteModal} />
            </motion.div>
          ) : (
            <motion.button
              key="dock"
              layout
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                mass: 1,
              }}
              onClick={open}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.03, y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="group flex cursor-pointer items-center gap-0 border-none bg-transparent outline-none"
            >
              <motion.div
                animate={
                  reducedMotion
                    ? {}
                    : {
                        y: [0, -2, 3, -3, 1, -1, 2, -2, 0],
                      }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center"
              >
                <Orb
                  icon={DynamicIcon}
                  currentIndex={currentIndex}
                  reducedMotion={reducedMotion}
                />
              </motion.div>

              <div
                className="relative hidden h-[56px] items-center overflow-hidden rounded-full border border-white/[0.08] px-4 backdrop-blur-xl md:flex"
                style={{ background: "rgba(12,18,32,0.82)" }}
              >
                <motion.div
                  animate={
                    reducedMotion
                      ? {}
                      : {
                          y: [0, -2, 3, -3, 1, -1, 2, -2, 0],
                        }
                  }
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex w-[206px] flex-col justify-center"
                >
                  <div className="relative flex items-center gap-1.5">
                    <div className="relative h-[22px] flex-1 overflow-hidden">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={currentIndex}
                          initial={{ y: 22, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={
                            reducedMotion
                              ? { opacity: 0 }
                              : { y: -22, opacity: 0 }
                          }
                          transition={
                            reducedMotion
                              ? { duration: 0 }
                              : {
                                  type: "spring",
                                  stiffness: 180,
                                  damping: 22,
                                  mass: 1,
                                }
                          }
                          className="inline-block whitespace-nowrap text-[16px] font-semibold leading-none text-[#F8FAFC]"
                        >
                          <HighlightedText
                            text={currentMessage.text}
                            keywords={currentMessage.keywords}
                          />
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>

                <div className="absolute bottom-0 left-4 right-4 h-[2px] overflow-hidden rounded-full bg-white/[0.04]">
                  <div
                    key={currentIndex}
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary"
                    style={{
                      width: "0%",
                      animationName: "progress-fill",
                      animationDuration: `${DISPLAY_DURATION}ms`,
                      animationTimingFunction: "linear",
                      animationFillMode: "forwards",
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                  />
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
