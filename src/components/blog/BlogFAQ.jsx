"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { faqItems } from "@/data/blog"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

function AccordionItem({ item, isOpen, onToggle, index }) {
  return (
    <SafeSlideUp delay={index * 0.05}>
      <div className={cn(
        "rounded-2xl border transition-all duration-300 overflow-hidden",
        isOpen
          ? "border-accent/20 bg-accent/[0.02]"
          : "border-accent/15 bg-accent/[0.06] hover:bg-accent/[0.12]"
      )}>
        <button
          type="button"
          onClick={onToggle}
          className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-2xl"
          aria-expanded={isOpen}
        >
          <h3 className={cn(
            "text-sm sm:text-base font-semibold transition-colors",
            isOpen ? "text-accent" : "text-foreground"
          )}>
            {item.question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors",
              isOpen ? "bg-accent/10 border-accent/20 text-accent" : "bg-accent/[0.08] border-accent/15 text-muted-foreground"
            )}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-6 pb-5">
                <p className="text-sm text-muted leading-relaxed">{item.answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SafeSlideUp>
  )
}

export function BlogFAQ() {
  const [openId, setOpenId] = useState(null)

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[900px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about the SmartByte blog."
          align="center"
          className="mb-12"
        />

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              index={i}
              isOpen={openId === i}
              onToggle={() => setOpenId(openId === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
