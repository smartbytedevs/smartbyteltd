"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { processSteps } from "@/data/works"
import { Search, BookOpen, Palette, Code, CheckCircle, Rocket, HeadphonesIcon } from "lucide-react"

const iconMap = {
  Search, BookOpen, Palette, Code, CheckCircle, Rocket, HeadphonesIcon,
}

function TimelineStep({ step, index, isLast }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const Icon = iconMap[step.icon]

  return (
    <div ref={ref} className="relative flex items-start gap-6 group">
      {/* Desktop horizontal line connector */}
      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-8 w-full h-px bg-gradient-to-r from-accent/20 to-transparent pointer-events-none" style={{ width: "calc(100% + 2rem)" }} />
      )}

      {/* Circle + vertical line */}
      <div className="relative flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-lg shadow-accent/20"
        >
          {Icon && <Icon className="w-6 h-6 text-white" />}
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-background border border-accent/30 flex items-center justify-center text-[10px] font-bold text-accent">
            {step.step}
          </span>
        </motion.div>

        {/* Vertical line (mobile) */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-px bg-gradient-to-b from-accent/30 to-transparent lg:hidden"
            style={{ minHeight: "40px" }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 pb-12 lg:pb-0"
      >
        <h3 className="font-display text-lg font-bold text-foreground mb-2">
          {step.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed">
          {step.description}
        </p>
      </motion.div>
    </div>
  )
}

export function DevProcessTimeline() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Process"
          title="How We Bring Ideas to Life"
          description="A battle-tested 7-step process that delivers exceptional results, every time."
          align="center"
          className="mb-16"
        />

        {/* Desktop horizontal */}
        <div className="hidden lg:block relative">
          {/* Horizontal connector line */}
          <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-accent/10 via-accent/30 to-accent/10" />

          <div className="grid grid-cols-7 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.step} className="text-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-lg shadow-accent/20 mx-auto mb-4"
                >
                  {(() => {
                    const Icon = iconMap[step.icon]
                    return Icon && <Icon className="w-6 h-6 text-white" />
                  })()}
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-background border border-accent/30 flex items-center justify-center text-[10px] font-bold text-accent">
                    {step.step}
                  </span>
                </motion.div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="lg:hidden max-w-lg mx-auto">
          {processSteps.map((step, i) => (
            <TimelineStep key={step.step} step={step} index={i} isLast={i === processSteps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
