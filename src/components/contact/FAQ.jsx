"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"
import { faqItems } from "./contactData"

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-500 ${
        isOpen
          ? "border-accent/20 bg-white/45"
          : "border-white/[0.05] bg-white/30"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm font-medium text-foreground sm:text-base">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/45"
        >
          <ChevronDown className="h-4 w-4 text-accent" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-muted">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="mx-auto mt-20 max-w-3xl lg:mt-24">
      <div className="mb-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 block text-xs font-semibold uppercase tracking-label text-accent sm:text-sm"
        >
          FAQ
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-2xl font-bold sm:text-3xl lg:text-4xl"
        >
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
            Questions
          </span>
        </motion.h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        {faqItems.map((item, i) => (
          <FAQItem
            key={i}
            item={item}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </motion.div>
    </div>
  )
}
