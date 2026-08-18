"use client"

import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { services, categoryServiceIds, serviceCategories } from "@/data/services"
import { cn } from "@/lib/utils"
import { Clock, DollarSign, CheckCircle, ArrowRight, Sparkles, ChevronDown } from "lucide-react"

const metaInfo = [
  { key: "timeline", icon: Clock, label: "Timeline", field: "timeline" },
  { key: "startingPrice", icon: DollarSign, label: "Starting From", field: "startingPrice" },
  { key: "perfectFor", icon: CheckCircle, label: "Perfect For", field: "perfectFor" },
]

function CategoryPills({ categories, active, onChange }) {
  const scrollRef = useRef(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!scrollRef.current) return
    const activeEl = scrollRef.current.querySelector(`[data-active="true"]`)
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "nearest", inline: "center" })
    }
  }, [active, prefersReduced])

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 -mx-4 sm:-mx-6 lg:-mx-0 px-4 sm:px-6 lg:px-0 lg:flex-wrap lg:overflow-visible lg:snap-none lg:pb-0"
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          data-active={active === cat.id}
          onClick={() => onChange(cat.id)}
          className={cn(
            "snap-start shrink-0 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 border outline-none",
            "min-h-[44px] flex items-center",
            "focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
            active === cat.id
              ? "bg-gradient-to-r from-accent to-accent-secondary text-white border-transparent shadow-lg shadow-accent/20"
              : "bg-accent/[0.06] border-accent/15 text-muted-foreground hover:bg-accent/[0.12] hover:text-foreground hover:border-border/50"
          )}
          aria-selected={active === cat.id}
          role="tab"
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

function ServiceNav({ services, activeId, onSelect, layout }) {
  if (layout === "mobile") {
    return (
      <div className="space-y-2">
        {services.map((s) => {
          if (!s) return null
          const isActive = activeId === s.id
          return (
            <div key={s.id} className="rounded-xl border border-border/30 overflow-hidden transition-all duration-300">
              <button
                type="button"
                onClick={() => onSelect(s.id)}
                className={cn(
                  "w-full text-left px-5 py-4 flex items-center justify-between gap-3 transition-all duration-200 outline-none min-h-[52px]",
                  "focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-inset",
                  isActive ? "bg-accent/[0.03]" : "hover:bg-accent/[0.06]"
                )}
                aria-expanded={isActive}
                aria-selected={isActive}
                role="tab"
              >
                <div className="min-w-0 flex-1">
                  <p className={cn(
                    "text-sm font-semibold transition-colors",
                    isActive ? "text-accent" : "text-foreground"
                  )}>
                    {s.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{s.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-muted-foreground">{s.startingPrice}</span>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-300",
                    isActive && "rotate-180"
                  )} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ServiceDetailCard service={s} compact />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {services.map((s) => {
        if (!s) return null
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className={cn(
              "w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 outline-none min-h-[44px]",
              "focus-visible:ring-2 focus-visible:ring-accent/50",
              activeId === s.id
                ? "text-accent bg-accent/5 border-l-2 border-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/[0.06] border-l-2 border-transparent"
            )}
            aria-selected={activeId === s.id}
            role="tab"
          >
            {s.title}
          </button>
        )
      })}
    </div>
  )
}

function ServiceDetailCard({ service, compact }) {
  const animProps = compact ? {} : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  }

  return (
    <motion.div {...(!compact ? animProps : {})}>
      <div className={cn(
        "relative border border-accent/15 bg-accent/[0.06]",
        compact ? "rounded-b-xl border-t-0 p-5" : "rounded-2xl p-6 md:p-10"
      )}>
        {!compact && (
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-5 pointer-events-none" style={{
            background: "radial-gradient(circle, rgba(0, 240, 255, 0.1), transparent 70%)",
            filter: "blur(60px)",
          }} />
        )}

        <div className="relative">
          {!compact && (
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-base text-muted leading-relaxed max-w-2xl">{service.overview}</p>
              </div>
              <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-medium text-accent">Premium</span>
              </div>
            </div>
          )}

          {compact && (
            <div className="mb-6">
              <p className="text-sm text-muted leading-relaxed">{service.overview}</p>
            </div>
          )}

          <div className={cn("grid gap-3 mb-6", compact ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-3")}>
            {metaInfo.map((item) => {
              const Icon = item.icon
              const value = service[item.field]
              return (
                <div key={item.key} className="rounded-xl bg-accent/[0.07] border border-accent/15 p-3 md:p-4">
                  <Icon className="w-4 h-4 text-accent mb-2" />
                  <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5">{item.label}</p>
                  <p className={cn(
                    "font-semibold text-foreground",
                    compact ? "text-xs" : "text-sm"
                  )}>
                    {value === service.perfectFor ? (
                      <span className="line-clamp-1">{value}</span>
                    ) : value}
                  </p>
                </div>
              )
            })}
          </div>

          {!compact && (
            <>
              <div className="mb-6">
                <h4 className="text-xs font-semibold tracking-label uppercase text-muted-foreground mb-3">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feat, i) => (
                    <motion.span
                      key={feat}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-accent/[0.08] border border-accent/15 text-muted-foreground"
                    >
                      <CheckCircle className="w-3 h-3 text-accent" />
                      {feat}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-semibold tracking-label uppercase text-muted-foreground mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-full text-xs font-medium bg-accent/[0.08] border border-accent/15 text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-semibold tracking-label uppercase text-muted-foreground mb-3">Deliverables</h4>
                <div className="flex flex-wrap gap-2">
                  {service.deliverables.split(", ").map((d) => (
                    <span key={d} className="px-3 py-1.5 rounded-full text-xs font-medium bg-accent/5 border border-accent/10 text-accent">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          <a
            href="#request-quote"
            className={cn(
              "group inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-300",
              "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30",
              "hover:scale-[1.02] active:scale-[0.98]",
              compact ? "w-full px-5 py-3" : "px-6 py-3 md:w-auto w-full"
            )}
          >
            Request Custom Quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function InteractiveServiceDetails() {
  const [activeCategory, setActiveCategory] = useState("website")
  const [activeServiceId, setActiveServiceId] = useState(categoryServiceIds.website[0])
  const [layout, setLayout] = useState("desktop")

  const activeService = useMemo(() => services.find((s) => s.id === activeServiceId), [activeServiceId])
  const categoryServiceList = useMemo(
    () => (categoryServiceIds[activeCategory] || []).map((id) => services.find((s) => s.id === id)).filter(Boolean),
    [activeCategory]
  )

  const handleCategoryChange = useCallback((catId) => {
    setActiveCategory(catId)
    const first = categoryServiceIds[catId]?.[0]
    if (first) setActiveServiceId(first)
  }, [])

  const handleServiceSelect = useCallback((id) => {
    setActiveServiceId(id)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const handler = (e) => setLayout(e.matches ? "mobile" : "desktop")
    handler(mq)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return (
    <section id="service-details" className="relative py-24 md:py-32 overflow-hidden bg-background pb-32 md:pb-40">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[40%] -right-48 w-[500px] h-[500px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.04), transparent 70%)",
          filter: "blur(120px)",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SafeSlideUp>
          <span className="text-xs sm:text-sm font-semibold tracking-label uppercase bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-4 block text-center">
            Service Details
          </span>
        </SafeSlideUp>

        <SafeSlideUp delay={0.1}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-3">
            Explore Our Services
          </h2>
          <p className="text-sm sm:text-base text-muted text-center max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12">
            Click through categories to explore the full range of what we build.
          </p>
        </SafeSlideUp>

        <div className="mb-6 sm:mb-8">
          <SafeSlideUp delay={0.15}>
            <CategoryPills
              categories={serviceCategories}
              active={activeCategory}
              onChange={handleCategoryChange}
            />
          </SafeSlideUp>
        </div>

        {layout === "mobile" ? (
          <div className="max-w-2xl mx-auto">
            <SafeSlideUp delay={0.2}>
              <ServiceNav
                services={categoryServiceList}
                activeId={activeServiceId}
                onSelect={handleServiceSelect}
                layout="mobile"
              />
            </SafeSlideUp>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[220px_1fr] xl:grid-cols-[260px_1fr] gap-6 lg:gap-8 xl:gap-12">
            <SafeSlideUp delay={0.2}>
              <div className="lg:sticky lg:top-24">
                <ServiceNav
                  services={categoryServiceList}
                  activeId={activeServiceId}
                  onSelect={handleServiceSelect}
                  layout="desktop"
                />
              </div>
            </SafeSlideUp>

            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeService && (
                  <SafeSlideUp key={activeService.id} delay={0.1}>
                    <ServiceDetailCard service={activeService} />
                  </SafeSlideUp>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
