"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { useFilters } from "./FilterContext"
import { businessTypes, budgetOptions, timelineOptions } from "@/data/templates"
import { ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"

function SelectBox({ label, options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false)
  const selected = options.find((o) => o.value === value)

  return (
    <div className="relative">
      <label className="text-xs font-semibold tracking-label uppercase text-muted-foreground mb-2 block">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-sm text-left transition-colors",
          "bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
          value ? "text-foreground" : "text-muted-foreground"
        )}
      >
        <span>{value ? selected?.label : placeholder}</span>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute z-20 mt-2 w-full rounded-xl border border-white/[0.06] bg-card shadow-2xl overflow-hidden"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={cn(
                  "w-full text-left px-4 py-3 text-sm transition-colors hover:bg-white/[0.04]",
                  value === opt.value ? "text-accent bg-white/[0.03]" : "text-muted-foreground"
                )}
              >
                {opt.desc ? (
                  <div>
                    <span className="text-foreground">{opt.label}</span>
                    <span className="block text-xs text-muted-foreground mt-0.5">{opt.desc}</span>
                  </div>
                ) : (
                  opt.label
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SolutionFinder({ onFindSolution }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({ type: "", budget: "", timeline: "" })
  const { updateFilter, applySolution } = useFilters()

  const questions = [
    {
      label: "What type of business?",
      key: "type",
      options: businessTypes,
      render: (opt) => opt.label,
    },
    {
      label: "Budget",
      key: "budget",
      options: budgetOptions,
      render: (opt) => (
        <div>
          <span className="text-foreground">{opt.label}</span>
          <span className="block text-xs text-muted-foreground mt-0.5">{opt.desc}</span>
        </div>
      ),
    },
    {
      label: "Timeline",
      key: "timeline",
      options: timelineOptions,
      render: (opt) => (
        <div>
          <span className="text-foreground">{opt.label}</span>
          <span className="block text-xs text-muted-foreground mt-0.5">{opt.desc}</span>
        </div>
      ),
    },
  ]

  const handleSelect = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    if (step < 2) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleFind = () => {
    if (answers.type) applySolution(answers.type)
    onFindSolution?.()
  }

  const currentQ = questions[step]
  const isComplete = answers.type && answers.budget && answers.timeline

  return (
    <section id="solution-finder" className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SafeSlideUp>
          <div className="text-center mb-12">
            <span className="text-xs sm:text-sm font-semibold tracking-label uppercase bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-5 block">
              Not Sure Where to Start?
            </span>
            <h2 className="font-display text-section-title font-bold leading-[1]">
              Find the Right Solution
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                for Your Business
              </span>
            </h2>
          </div>
        </SafeSlideUp>

        <SafeSlideUp delay={0.1}>
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-6 md:p-10">
              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i < step ? "w-8 bg-accent" : i === step ? "w-8 bg-accent" : "w-4 bg-white/[0.08]"
                    )}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <SelectBox
                    label={currentQ.label}
                    options={currentQ.options}
                    value={answers[currentQ.key]}
                    onChange={(v) => handleSelect(currentQ.key, v)}
                    placeholder="Select an option..."
                  />
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className={cn(
                    "text-sm text-muted-foreground hover:text-foreground transition-colors",
                    step === 0 && "invisible"
                  )}
                >
                  Back
                </button>

                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <button
                      type="button"
                      onClick={handleFind}
                      className={cn(
                        "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                        "bg-gradient-to-r from-accent to-accent-secondary text-background",
                        "shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30",
                        "hover:scale-[1.02] active:scale-[0.98]",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                      )}
                    >
                      <Search className="w-4 h-4" />
                      Find My Solution
                    </button>
                  </motion.div>
                )}

                {!isComplete && step === 2 && (
                  <p className="text-xs text-muted-foreground">Select an option to continue</p>
                )}
              </div>
            </div>
          </div>
        </SafeSlideUp>
      </div>
    </section>
  )
}
