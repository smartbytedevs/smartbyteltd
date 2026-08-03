"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { processSteps } from "@/data/services"
import { cn } from "@/lib/utils"
import { Search, BookOpen, ClipboardList, Palette, Code, CheckCircle, Rocket, HeadphonesIcon } from "lucide-react"

const iconMap = {
  Search, BookOpen, ClipboardList, Palette, Code, CheckCircle, Rocket, HeadphonesIcon,
}

function TimelineStep({ step, index, isLast }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const Icon = iconMap[step.icon]

  return (
    <div ref={ref} className="relative flex items-start gap-6 group">
      <div className="relative flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-lg shadow-accent/20"
        >
          {Icon && <Icon className="w-6 h-6 text-background" />}
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-background border border-accent/30 flex items-center justify-center text-[10px] font-bold text-accent">
            {step.step}
          </span>
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-px bg-gradient-to-b from-accent/30 via-accent/10 to-transparent"
            style={{ minHeight: "60px" }}
          />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "flex-1 pb-12",
          "relative rounded-2xl p-6 border border-border/30 bg-white/30",
          "hover:bg-white/4555 hover:border-accent/20 transition-all duration-300",
          "group-hover:shadow-lg group-hover:shadow-accent/5"
        )}
      >
        <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
        <p className="text-sm text-muted leading-relaxed">{step.description}</p>
      </motion.div>
    </div>
  )
}

export function DevProcessTimeline() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(43,33,24,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(43,33,24,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[40%] left-[20%] w-[400px] h-[400px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(180, 83, 9, 0.03), transparent 70%)",
          filter: "blur(100px)",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Process"
          title="How We Bring Ideas to Life"
          description="A proven 8-step process that delivers exceptional results, every time."
          align="center"
          className="mb-16"
        />

        <div className="max-w-3xl mx-auto">
          {processSteps.map((step, i) => (
            <TimelineStep key={step.step} step={step} index={i} isLast={i === processSteps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}