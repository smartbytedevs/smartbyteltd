"use client"

import { useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, ArrowUpRight, Clock, CheckCircle, Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function CaseStudyModal({ project, open, onClose }) {
  const modalRef = useRef(null)
  const previousFocusRef = useRef(null)

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onClose()
    if (e.key === "Tab" && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
  }, [onClose])

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
      setTimeout(() => {
        const firstFocusable = modalRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        firstFocusable?.focus()
      }, 100)
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
      previousFocusRef.current?.focus()
    }
  }, [open, handleKeyDown])

  if (!project) return null

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0"
            style={{ backgroundColor: "rgba(5,8,20,0.8)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Case study: ${project.title}`}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl mx-4 my-12 md:my-20 rounded-3xl border border-white/[0.06] bg-card shadow-2xl"
          >
            {/* Close button */}
            <div className="sticky top-0 z-20 flex justify-end p-4">
              <button
                type="button"
                onClick={onClose}
                className="p-2.5 rounded-xl bg-background/60 backdrop-blur-md border border-white/[0.08] text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                aria-label="Close case study"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 md:px-10 pb-10 -mt-12">
              {/* Hero section */}
              <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-accent/10 to-accent-secondary/10 border border-white/[0.06] mb-10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Star className="w-12 h-12 text-accent/40 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Featured Project</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
              </div>

              {/* Title & metadata */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold tracking-label uppercase px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                    {project.industry}
                  </span>
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-label uppercase border",
                    project.status === "Live" && "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                  )}>
                    <CheckCircle className="w-3 h-3" />
                    {project.status}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="w-3 h-3" /> {project.timeline}
                  </span>
                </div>

                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {project.title}
                </h2>

                <p className="text-base text-muted leading-relaxed max-w-3xl">
                  {project.summary}
                </p>
              </div>

              {/* Challenge / Solution / Result */}
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="relative rounded-xl p-5 border border-white/[0.06] bg-white/[0.02]">
                  <h4 className="text-xs font-semibold tracking-label uppercase text-accent mb-2">Challenge</h4>
                  <p className="text-sm text-muted leading-relaxed">{project.challenge}</p>
                </div>
                {project.solution && (
                  <div className="relative rounded-xl p-5 border border-white/[0.06] bg-white/[0.02]">
                    <h4 className="text-xs font-semibold tracking-label uppercase text-accent mb-2">Solution</h4>
                    <p className="text-sm text-muted leading-relaxed">{project.solution}</p>
                  </div>
                )}
                <div className="relative rounded-xl p-5 border border-white/[0.06] bg-white/[0.02]">
                  <h4 className="text-xs font-semibold tracking-label uppercase text-accent mb-2">Result</h4>
                  <p className="text-sm text-muted leading-relaxed">{project.result}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="relative rounded-xl p-4 text-center group/metric"
                  >
                    <div
                      className="absolute inset-0 rounded-xl border border-white/[0.06] transition-colors duration-300 group-hover/metric:border-accent/15"
                      style={{
                        background: "rgba(15, 23, 42, 0.3)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                      }}
                    />
                    <div className="relative z-10">
                      <span className="font-display text-2xl md:text-3xl font-bold text-accent block">
                        {metric.value}{metric.suffix}
                      </span>
                      <span className="text-xs text-muted mt-1 block">{metric.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features / Tech Stack */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {project.features && (
                  <div>
                    <h4 className="text-xs font-semibold tracking-label uppercase text-muted-foreground mb-3">Key Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feat) => (
                        <span key={feat} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.06] text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-accent" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-semibold tracking-label uppercase text-muted-foreground mb-3">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.06] text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              {project.testimonial && (
                <div className="relative rounded-2xl p-6 md:p-8 border border-white/[0.06] bg-gradient-to-br from-accent/[0.02] to-accent-secondary/[0.02] mb-10">
                  <svg className="w-8 h-8 text-accent/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                  </svg>
                  <blockquote className="text-base md:text-lg text-muted italic leading-relaxed mb-6">
                    &ldquo;{project.testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-background font-bold text-lg">
                      {project.testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{project.testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{project.testimonial.role}</p>
                    </div>
                    {project.rating && (
                      <div className="ml-auto flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-semibold text-foreground">{project.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="text-center pt-6 border-t border-white/[0.06]">
                <p className="font-display text-xl font-bold text-foreground mb-4">
                  Want Similar Results?
                </p>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium bg-gradient-to-r from-accent to-accent-secondary text-background shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Let&rsquo;s Build Yours
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
