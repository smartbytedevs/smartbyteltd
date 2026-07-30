"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { useFilters } from "./FilterContext"
import { businessTypes, budgetOptions, timelineOptions } from "@/data/templates"
import {
  UtensilsCrossed, Home, HeartPulse, GraduationCap, Building2, Sparkles,
  ShoppingCart, Briefcase, Rocket, MoreHorizontal, ChevronLeft, ChevronRight,
  Search, Check, X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const typeIcons = {
  restaurant: UtensilsCrossed, realestate: Home, healthcare: HeartPulse,
  education: GraduationCap, corporate: Building2, agency: Sparkles,
  ecommerce: ShoppingCart, portfolio: Briefcase, startup: Rocket, other: MoreHorizontal,
}

const budgetIcons = {
  starter: Rocket, growing: Briefcase, enterprise: Building2,
}

const timelineIcons = {
  asap: Search, month: ChevronRight, flexible: MoreHorizontal,
}

const loadingMessages = [
  "Finding the best solution...",
  "Analyzing your business...",
  "Matching templates...",
]

function SelectableCard({ icon: Icon, label, description, selected, onClick, size = "normal" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full text-left rounded-2xl border transition-all duration-300 outline-none",
        "focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected
          ? "bg-accent/[0.06] border-accent/40 shadow-lg shadow-accent/10"
          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.15] hover:shadow-md",
        size === "large" ? "p-5 md:p-6" : "p-4 md:p-5"
      )}
      aria-pressed={selected}
    >
      {selected && (
        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
          <Check className="w-3 h-3 text-background" />
        </span>
      )}

      <div className="flex items-start gap-4">
        <div className={cn(
          "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
          selected
            ? "bg-gradient-to-br from-accent to-accent-secondary shadow-md shadow-accent/20"
            : "bg-white/[0.04] border border-white/[0.08] group-hover:border-accent/30 group-hover:bg-accent/5"
        )}>
          <Icon className={cn(
            "w-5 h-5 transition-colors duration-300",
            selected ? "text-background" : "text-muted-foreground group-hover:text-accent"
          )} />
        </div>

        <div className="flex-1 min-w-0">
          <span className={cn(
            "text-sm font-medium transition-colors duration-300 block",
            selected ? "text-accent" : "text-foreground"
          )}>
            {label}
          </span>
          {description && (
            <span className="text-xs text-muted-foreground mt-1 block leading-relaxed">
              {description}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

function ProgressDots({ step, total }) {
  return (
    <div className="flex items-center gap-2" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={total} aria-label={`Step ${step + 1} of ${total}`}>
      <span className="text-xs font-medium text-muted-foreground mr-1">
        Step {step + 1} of {total}
      </span>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-500",
            i <= step ? "w-6 bg-gradient-to-r from-accent to-accent-secondary" : "w-1.5 bg-white/[0.08]"
          )}
        />
      ))}
    </div>
  )
}

export function SolutionFinder({ onFindSolution }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({ type: "", budget: "", timeline: "" })
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(0)
  const { applySolution } = useFilters()

  const handleSelect = useCallback((key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    if (step < 2) {
      setTimeout(() => setStep((s) => s + 1), 200)
    }
  }, [step])

  const handleBack = useCallback(() => {
    if (step > 0) setStep((s) => s - 1)
  }, [])

  const handleFind = useCallback(() => {
    setLoading(true)
    setShowResult(true)
    let msgIdx = 0
    const interval = setInterval(() => {
      msgIdx++
      if (msgIdx < loadingMessages.length) setLoadingMsg(msgIdx)
    }, 350)

    setTimeout(() => {
      clearInterval(interval)
      setLoading(false)
      if (answers.type) applySolution(answers.type)
      setTimeout(() => onFindSolution?.(), 300)
    }, 1200)
  }, [answers, applySolution, onFindSolution])

  const handleReset = useCallback(() => {
    setAnswers({ type: "", budget: "", timeline: "" })
    setStep(0)
    setShowResult(false)
    setLoading(false)
  }, [])

  const isComplete = answers.type && answers.budget && answers.timeline

  const questions = [
    {
      label: "What type of business do you run?",
      key: "type",
      options: businessTypes,
      iconKey: "type",
    },
    {
      label: "What's your budget?",
      key: "budget",
      options: budgetOptions,
      iconKey: "budget",
    },
    {
      label: "How soon do you need your website?",
      key: "timeline",
      options: timelineOptions,
      iconKey: "timeline",
    },
  ]

  if (showResult) {
    const business = businessTypes.find((b) => b.value === answers.type)
    const name = business?.label || "your"
    const budget = budgetOptions.find((b) => b.value === answers.budget)

    return (
      <section id="solution-finder" className="relative py-24 md:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
          <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] rounded-full opacity-15" style={{
            background: "radial-gradient(circle, rgba(0, 194, 168, 0.06), transparent 70%)",
            filter: "blur(120px)",
          }} />
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px",
          }} />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            {loading ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-12 md:p-16"
              >
                <div className="relative w-16 h-16 mx-auto mb-8">
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-accent/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-2 rounded-full border-2 border-t-accent border-r-transparent border-b-transparent border-l-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loadingMsg}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-base text-muted"
                  >
                    {loadingMessages[loadingMsg]}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-2xl p-8 md:p-12"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
                  <Search className="w-6 h-6 text-accent" />
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  We Found Your Match
                </h3>
                <p className="text-sm text-muted mb-6">
                  We found the perfect solutions for {name}.
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {answers.type && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                      {businessTypes.find((b) => b.value === answers.type)?.label}
                      <button type="button" onClick={handleReset} aria-label="Remove filter">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {answers.budget && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                      {budgetOptions.find((b) => b.value === answers.budget)?.label}
                      <button type="button" onClick={handleReset} aria-label="Remove filter">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {answers.timeline && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                      {timelineOptions.find((t) => t.value === answers.timeline)?.label}
                      <button type="button" onClick={handleReset} aria-label="Remove filter">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  Start Over
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="solution-finder" className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[10%] -left-48 w-[600px] h-[600px] rounded-full opacity-20" style={{
          background: "radial-gradient(circle, rgba(0, 194, 168, 0.06), transparent 70%)",
          filter: "blur(120px)",
        }} />
        <div className="absolute bottom-[20%] -right-48 w-[400px] h-[400px] rounded-full opacity-15" style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.04), transparent 70%)",
          filter: "blur(120px)",
        }} />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SafeSlideUp>
          <div className="text-center mb-10 md:mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-label uppercase bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-5 block">
              Business Consultation
            </span>
            <h2 className="font-display text-section-title font-bold leading-[1]">
              Find Your Perfect
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                Business Solution
              </span>
            </h2>
          </div>
        </SafeSlideUp>

        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-[1fr_1.2fr]">
              {/* Left — heading & progress */}
              <div className="relative p-8 md:p-10 md:pr-0 md:py-12 md:pl-12 flex flex-col justify-between min-h-[200px] md:min-h-[unset]">
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">
                    Tell Us About Your Project
                  </h3>
                  <p className="text-sm text-muted leading-relaxed max-w-xs">
                    Answer a few quick questions and we&apos;ll recommend the best website solution for your business.
                  </p>
                </div>

                <div className="mt-8 md:mt-0">
                  <ProgressDots step={step} total={3} />
                </div>
              </div>

              {/* Right — questions */}
              <div className="p-8 md:p-10 md:py-12 md:pr-12 border-t md:border-t-0 md:border-l border-white/[0.06]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-xs font-semibold tracking-label uppercase text-muted-foreground mb-4">
                      {questions[step].label}
                    </p>

                    <div className="space-y-2.5">
                      {questions[step].options.map((opt) => {
                        const q = questions[step]
                        const iconMap = q.iconKey === "type" ? typeIcons
                                     : q.iconKey === "budget" ? budgetIcons
                                     : timelineIcons
                        const Icon = iconMap[opt.value] || MoreHorizontal
                        return (
                          <SelectableCard
                            key={opt.value}
                            icon={Icon}
                            label={opt.label}
                            description={opt.sub || opt.desc}
                            selected={answers[q.key] === opt.value}
                            onClick={() => handleSelect(q.key, opt.value)}
                            size={q.iconKey === "type" ? "normal" : "large"}
                          />
                        )
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={handleBack}
                    className={cn(
                      "inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300",
                      "text-muted-foreground hover:text-foreground",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-lg px-3 py-2",
                      step === 0 && "invisible"
                    )}
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>

                  {isComplete ? (
                    <motion.button
                      type="button"
                      onClick={handleFind}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={cn(
                        "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                        "bg-gradient-to-r from-accent to-accent-secondary text-background",
                        "shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30",
                        "hover:scale-[1.02] active:scale-[0.98]",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                      )}
                    >
                      Find My Solution
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {step < 2 ? "Select an option to continue" : "Select a budget to continue"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
