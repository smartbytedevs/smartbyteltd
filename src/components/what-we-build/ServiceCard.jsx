"use client"

import { motion, AnimatePresence } from "motion/react"
import { Check, ArrowRight } from "lucide-react"
import { CardPreview } from "./CardPreview"

export function ServiceCard({ service }) {
  return (
    <div className="h-[540px] rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-sm overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={service.id}
          className="p-8 h-full flex flex-col"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Browser Preview */}
          <div className="h-24 shrink-0 rounded-xl overflow-hidden border border-white/[0.04]">
            <CardPreview type={service.previewType} />
          </div>

          {/* Service Name */}
          <h3 className="font-display text-xl font-semibold text-foreground mt-4 shrink-0">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted leading-relaxed mt-3 shrink-0">
            {service.description}
          </p>

          {/* Key Benefits */}
          <div className="mt-4 shrink-0">
            <p className="text-[10px] font-semibold tracking-label uppercase text-muted mb-2">
              Key Benefits
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {service.benefits.map((benefit, i) => (
                <motion.span
                  key={benefit}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.04 * i }}
                  className="flex items-center gap-2 text-xs text-muted"
                >
                  <span className="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-accent/15 flex items-center justify-center">
                    <Check className="w-2 h-2 text-accent" />
                  </span>
                  {benefit}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mt-3 shrink-0">
            <p className="text-[10px] font-semibold tracking-label uppercase text-muted mb-1.5">
              Technology Stack
            </p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {service.techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 * i }}
                  className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-white/[0.04] text-white/60 border border-white/[0.04]"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Delivery + Price row */}
          <div className="flex items-center gap-6 mt-3 shrink-0">
            <div>
              <p className="text-[10px] font-semibold tracking-label uppercase text-muted mb-0.5">
                Estimated Delivery
              </p>
              <span className="text-sm font-medium text-foreground">
                {service.delivery}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-label uppercase text-muted mb-0.5">
                Starting Price
              </p>
              <span className="text-sm font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                {service.price}
              </span>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1 min-h-0" />

          {/* CTA - always at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="shrink-0"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-accent text-background hover:bg-accent-hover transition-colors duration-300"
            >
              {service.ctaText}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
