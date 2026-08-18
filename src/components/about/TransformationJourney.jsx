"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { BrainCircuit, Code2, Compass, Palette, TrendingUp } from "lucide-react"
import { SafeReveal } from "@/components/common/SafeMotion"
import { cn } from "@/lib/utils"

const stages = [
  {
    id: "discover",
    number: "01",
    icon: Compass,
    title: "Discover & Strategize",
    short: "We map your business model, goals and customers before a single line of code.",
    description:
      "It starts with understanding your revenue drivers, operations and customer journey — then turning that insight into a clear, measurable digital roadmap.",
    tags: ["Business Audit", "Growth Roadmap", "Positioning"],
  },
  {
    id: "presence",
    number: "02",
    icon: Palette,
    title: "Brand & Digital Presence",
    short: "Positioning, identity and websites that turn visitors into customers.",
    description:
      "Brand strategy, visual identity and high-performance websites that make your business impossible to ignore online.",
    tags: ["Brand Identity", "Business Website", "E-Commerce"],
  },
  {
    id: "software",
    number: "03",
    icon: Code2,
    title: "Software & Systems",
    short: "Custom software, inventory, restaurant platforms and SaaS built to scale.",
    description:
      "We engineer the systems behind your business — inventory management, restaurant platforms and full SaaS products designed to grow with you.",
    tags: ["Custom Software", "Inventory Systems", "SaaS Products"],
  },
  {
    id: "automation",
    number: "04",
    icon: BrainCircuit,
    title: "AI & Automation",
    short: "Automate workflows and conversations so your team can focus on growth.",
    description:
      "AI assistants, chatbots and workflow automation that cut manual work, speed up response times and unlock new efficiencies.",
    tags: ["AI Assistants", "Workflow Automation", "Chatbots"],
  },
  {
    id: "scale",
    number: "05",
    icon: TrendingUp,
    title: "Grow & Scale",
    short: "Ongoing optimization and long-term partnership as your business expands.",
    description:
      "Performance tuning, strategic support and continuous optimization — we stay with you as your long-term technology partner.",
    tags: ["Growth Strategy", "Optimization", "Long-Term Support"],
  },
]

export function TransformationJourney() {
  const [active, setActive] = useState(0)
  const spineRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ["start 0.9", "end 0.45"],
  })
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  const activeStage = stages[active]
  const ActiveIcon = activeStage.icon

  return (
    <div ref={spineRef} className="relative">
      {/* ═══ Heading ═══ */}
      <SafeReveal viewportMargin="-40px">
        <span className="text-xs font-semibold tracking-label uppercase bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-4 block">
          Our Approach
        </span>
        <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-[-0.03em] leading-[1.1] text-foreground">
          A Complete Digital
          <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
            {" "}Transformation.
          </span>
        </h3>
        <p className="text-sm sm:text-base text-muted leading-relaxed mt-3">
          Every engagement follows a connected journey — from your first digital impression to fully automated, scalable operations.
        </p>
      </SafeReveal>

      {/* ═══ Connected Flow ═══ */}
      <div className="relative mt-12">
        {/* Spine */}
        <div className="absolute left-[27px] top-1 bottom-1 w-px bg-white/50" aria-hidden="true">
          <motion.div
            className="w-full origin-top bg-gradient-to-b from-accent via-accent-secondary to-accent"
            style={{ scaleY: spineScale, height: "100%" }}
          />
        </div>

        <div className="space-y-6 sm:space-y-7">
          {stages.map((stage, i) => {
            const Icon = stage.icon
            const isActive = i === active

            return (
              <SafeReveal
                key={stage.id}
                delay={i * 0.08}
                viewportMargin="-60px"
                className="relative"
              >
                <div className="relative flex items-stretch pl-20">
                  {/* Connector stub */}
                  <motion.div
                    className="absolute left-[27px] top-[27px] w-[52px] h-px origin-left bg-gradient-to-r from-accent to-transparent"
                    animate={{
                      scaleX: isActive ? 1 : 0.25,
                      opacity: isActive ? 1 : 0.35,
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden="true"
                  />

                  {/* Marker */}
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-pressed={isActive}
                    aria-label={`Stage ${stage.number}: ${stage.title}`}
                    className="absolute left-0 top-0 w-[54px] h-[54px] flex items-center justify-center outline-none"
                  >
                    <span className="absolute inset-0 rounded-full focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background" />
                    {isActive && (
                      <motion.span
                        className="absolute w-[18px] h-[18px] rounded-full border border-accent/40"
                        animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        aria-hidden="true"
                      />
                    )}
                    <motion.span
                      className="relative w-[11px] h-[11px] rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #00F0FF, #8B5CF6)",
                        boxShadow: isActive
                          ? "0 0 18px rgba(0, 240, 255, 0.55)"
                          : "0 0 10px rgba(0, 240, 255, 0.3)",
                      }}
                      animate={{ scale: isActive ? 1.25 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  </button>

                  {/* Card */}
                  <div
                    className={cn(
                      "group relative flex-1 min-w-0 rounded-2xl border p-5 sm:p-6 transition-all duration-500 overflow-hidden",
                      isActive
                        ? "border-accent/40 bg-accent/[0.06] shadow-[0_0_40px_rgba(0,240,255,0.08)]"
                        : "border-accent/15 bg-accent/[0.04] hover:bg-accent/[0.08]"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 pointer-events-none transition-opacity duration-500",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                      style={{
                        background:
                          "radial-gradient(circle at 0% 0%, rgba(0, 240, 255, 0.06), transparent 70%)",
                      }}
                    />

                    <div className="relative z-10 flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-lg shadow-accent/20 flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-display text-lg font-bold tracking-[-0.02em] text-foreground">
                            {stage.title}
                          </h4>
                          <span className="font-display text-xl font-bold leading-none text-foreground/15 flex-shrink-0 select-none">
                            {stage.number}
                          </span>
                        </div>
                        <p className="text-sm text-muted leading-relaxed mt-1.5">
                          {stage.short}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SafeReveal>
            )
          })}
        </div>
      </div>

      {/* ═══ Active Detail Panel ═══ */}
      <div className="mt-10 sm:mt-12 rounded-2xl border border-accent/15 bg-accent/[0.04] backdrop-blur-sm overflow-hidden">
        <div className="relative p-6 sm:p-7">
          <div
            className="absolute inset-0 opacity-[0.6] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.05), transparent 70%)",
            }}
          />
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            aria-live="polite"
            className="relative z-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
                <ActiveIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold tracking-label uppercase text-accent">
                Stage {activeStage.number}
              </span>
            </div>

            <h4 className="font-display text-xl sm:text-2xl font-bold text-foreground">
              {activeStage.title}
            </h4>
            <p className="text-sm sm:text-base text-muted leading-relaxed mt-2">
              {activeStage.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {activeStage.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-accent bg-accent/10 border border-accent/20 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
