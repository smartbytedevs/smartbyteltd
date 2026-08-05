"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Sparkles } from "lucide-react"
import { ContactForm } from "@/components/contact/ContactForm"

const defaultInitialValues = {
  projectType: undefined,
  description: undefined,
}

function buildHeading(data) {
  if (data?.heading) return data.heading
  if (data?.template) return `Order the ${data.template} Template`
  if (data?.projectType) return `Start Your ${data.projectType}`
  return "Start Your Project"
}

function buildSubtitle(data) {
  if (data?.subtitle) return data.subtitle
  return "Fill in the details below and we\u2019ll get back to you within 24 hours with a plan and quote."
}

function buildInitialValues(data) {
  const values = { ...defaultInitialValues }
  if (data?.projectType) values.projectType = data.projectType
  if (data?.description) {
    values.description = data.description
  } else if (data?.template) {
    values.description = `I\u2019d like to order the ${data.template} template. Please share the details, customization options, and pricing.`
  }
  return values
}

export function QuoteModal({ isOpen, data, onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const focusTimer = setTimeout(() => closeButtonRef.current?.focus(), 50)
    const handleKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      clearTimeout(focusTimer)
      window.removeEventListener("keydown", handleKey)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-[6px]"
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={buildHeading(data)}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.9 }}
            className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-border/35 bg-[rgba(255,253,246,0.97)] shadow-2xl backdrop-blur-2xl"
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-10"
              style={{
                background:
                  "radial-gradient(circle, rgba(15, 118, 110, 0.15), transparent 70%)",
                filter: "blur(60px)",
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full opacity-10"
              style={{
                background:
                  "radial-gradient(circle, rgba(14, 116, 144, 0.12), transparent 70%)",
                filter: "blur(60px)",
              }}
              aria-hidden="true"
            />

            <div className="relative max-h-[calc(100vh-48px)] overflow-y-auto p-6 sm:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-secondary shadow-lg shadow-accent/20">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                      {buildHeading(data)}
                    </h3>
                    <p className="mt-1 text-xs text-muted sm:text-sm">
                      {buildSubtitle(data)}
                    </p>
                  </div>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close order form"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/35 bg-white/40 text-muted backdrop-blur-xl transition-all duration-300 hover:rotate-90 hover:border-accent/30 hover:text-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <ContactForm
                idPrefix="quote"
                initialValues={buildInitialValues(data)}
                onSuccess={() => setTimeout(onClose, 1800)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
