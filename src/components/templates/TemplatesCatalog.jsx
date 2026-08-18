"use client"

import { useMemo, useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { fadeUpSimple } from "@/lib/animations"
import { useFilters } from "./FilterContext"
import { FilterDrawer } from "./FilterDrawer"
import { templates, industries, sortOptions, categories, technologyOptions, matchFeature, matchTechnology } from "@/data/templates"
import {
  Search, X, Eye, ShoppingCart, Check, Clock, Layout, ChevronDown, SlidersHorizontal, RotateCcw,
} from "lucide-react"
import { SafeSlideUp } from "@/components/common/SafeMotion"

const categoryGradients = {
  restaurant: "from-emerald-500/30 to-green-600/30",
  medical: "from-sky-500/30 to-blue-600/30",
  education: "from-violet-500/30 to-purple-600/30",
  corporate: "from-indigo-500/30 to-violet-600/30",
  portfolio: "from-pink-500/30 to-rose-600/30",
  ecommerce: "from-amber-500/30 to-orange-600/30",
  agency: "from-indigo-500/30 to-blue-600/30",
  realestate: "from-teal-500/30 to-cyan-600/30",
  startup: "from-fuchsia-500/30 to-pink-600/30",
  landing: "from-cyan-500/30 to-sky-600/30",
  default: "from-accent/20 to-accent-secondary/20",
}

const sortFunctions = {
  popular: (a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0),
  newest: (a, b) => (b.newest ? 1 : 0) - (a.newest ? 1 : 0),
  "price-low": (a, b) => a.price - b.price,
  "price-high": (a, b) => b.price - a.price,
}

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

const placeholders = [
  "Search templates, industries, technologies...",
  "Search by business type...",
  "Search by technology...",
  "Search by feature...",
]

function SearchBar({ value, onChange, onFocus, onBlur, focused }) {
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const [isMac, setIsMac] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    setIsMac(typeof navigator !== "undefined" && navigator.platform.includes("Mac"))
  }, [])

  useEffect(() => {
    if (focused) return
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % placeholders.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [focused])

  return (
    <div className={cn(
      "relative flex-1 rounded-2xl border transition-all duration-500",
        focused
        ? "bg-accent/[0.08] border-accent/40 shadow-lg shadow-accent/10"
        : "bg-accent/[0.06] border-accent/15 hover:bg-accent/[0.08] hover:border-border/50"
    )}>
      <div className="relative flex items-center">
        <Search className={cn(
          "absolute left-4 w-4 h-4 transition-colors duration-300 pointer-events-none",
          focused ? "text-accent" : "text-muted-foreground"
        )} />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholders[placeholderIdx]}
          className="w-full bg-transparent pl-10 pr-20 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none rounded-2xl"
          aria-label="Search templates"
        />
        <span className="absolute right-4 text-[10px] font-medium text-muted-foreground/40 bg-accent/[0.08] px-1.5 py-0.5 rounded border border-accent/15 pointer-events-none">
          {isMac ? "⌘K" : "Ctrl+K"}
        </span>
      </div>
    </div>
  )
}

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = sortOptions.find((o) => o.value === value)

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300",
          "bg-accent/[0.06] border border-accent/15 hover:bg-accent/[0.12] hover:border-border/50",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
          open && "border-accent/30"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Sort by"
      >
        <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
        <span className="text-muted-foreground hidden sm:inline">Sort</span>
        <span className="text-foreground">{selected?.label || "Popular"}</span>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 z-30 w-56 rounded-2xl border border-border/30 bg-card shadow-2xl overflow-hidden"
            role="listbox"
          >
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={value === opt.value}
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={cn(
                  "w-full text-left px-4 py-3 text-sm transition-colors hover:bg-white/55 flex items-center justify-between",
                  value === opt.value ? "text-accent" : "text-muted-foreground"
                )}
              >
                {opt.label}
                {value === opt.value && <Check className="w-3.5 h-3.5 text-accent" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TemplateCard({ template, index, highlight }) {
  const gradient = categoryGradients[template.category] || categoryGradients.default

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative rounded-2xl overflow-hidden transition-all duration-500",
        "bg-accent/[0.08] border-accent/15",
        "hover:bg-accent/[0.12] hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5",
        "hover:-translate-y-1",
        highlight && "ring-2 ring-accent/50 shadow-lg shadow-accent/10"
      )}
    >
      {template.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className={cn(
            "inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-label uppercase",
            template.badge === "BEST SELLER" && "bg-amber-500/20 text-amber-700 border border-amber-500/30",
            template.badge === "POPULAR" && "bg-accent/20 text-accent border border-accent/30",
            template.badge === "NEW" && "bg-sky-500/20 text-sky-700 border border-sky-500/30",
            template.badge === "TRENDING" && "bg-purple-500/20 text-purple-700 border border-purple-500/30",
          )}>
            {template.badge}
          </span>
        </div>
      )}

      <div className={cn("relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br", gradient)}>
        {template.thumbnail ? (
          <img
            src={template.thumbnail}
            alt={template.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-white/45 border border-border/40 flex items-center justify-center">
              <Layout className="w-8 h-8 text-foreground/40" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 flex items-center justify-center">
          <div className="flex gap-3">
            <Link href={`/templates/${template.slug}`} className="p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-white/60 text-foreground shadow-lg hover:bg-white transition-all hover:scale-105" aria-label={`Preview ${template.name} template`}>
              <Eye className="w-4 h-4" />
            </Link>
            <Link href={`/templates/${template.slug}`} className="p-3 rounded-xl bg-accent text-white hover:bg-accent-hover transition-all hover:scale-105" aria-label={`Get ${template.name} template`}>
              <ShoppingCart className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold tracking-label uppercase px-2 py-0.5 rounded-full bg-accent/[0.08] text-muted-foreground border border-accent/15">
            {categories.find((c) => c.id === template.category)?.label || template.category}
          </span>
          <span className="text-[10px] font-bold tracking-label uppercase px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
            {industries.find((i) => i.value === template.industry)?.label || template.industry}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors">{template.name}</h3>
        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">{template.description}</p>

        <div className="mt-4 space-y-1.5">
          {template.features.slice(0, 3).map((feat) => (
            <div key={feat} className="flex items-start gap-2 text-xs text-muted-foreground">
              <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {template.techStack.map((tech) => (
            <span key={tech} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-accent/[0.08] text-muted-foreground border border-accent/15">{tech}</span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{template.delivery}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">From</span>
            <div className="text-lg font-bold text-foreground">${template.price.toLocaleString()}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link href={`/templates/${template.slug}`} className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all bg-accent/[0.08] border border-accent/15 text-muted-foreground hover:bg-white/60 hover:text-foreground hover:border-border/55 group-hover:scale-[1.02]">
            <Eye className="w-3.5 h-3.5" /> Preview
          </Link>
          <Link href={`/templates/${template.slug}`} className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all bg-gradient-to-r from-accent to-accent-secondary text-white shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98]">
            <ShoppingCart className="w-3.5 h-3.5" /> Get Template
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export function TemplatesCatalog() {
  const { filters, updateFilter, clearFilters, activeCount } = useFilters()
  const [searchInput, setSearchInput] = useState(filters.search)
  const [searchFocused, setSearchFocused] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const debouncedSearch = useDebounce(searchInput, 300)
  const searchRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => { updateFilter("search", debouncedSearch) }, [debouncedSearch, updateFilter])
  useEffect(() => { setSearchInput(filters.search) }, [filters.search])

  const filtered = useMemo(() => {
    let result = [...templates]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter((t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.techStack.some((tech) => tech.toLowerCase().includes(q)) ||
        t.features.some((f) => f.toLowerCase().includes(q))
      )
    }

    if (filters.solutionType && filters.solutionType !== "other") {
      result = result.filter((t) => t.category === filters.solutionType || t.industry === filters.solutionType)
    } else {
      if (filters.category !== "all") result = result.filter((t) => t.category === filters.category)
      if (filters.industry !== "all") result = result.filter((t) => t.industry === filters.industry)
    }

    if (filters.priceRange !== "all") {
      result = result.filter((t) => {
        if (filters.priceRange === "starter") return t.price < 999
        if (filters.priceRange === "growing") return t.price >= 999 && t.price <= 2499
        if (filters.priceRange === "enterprise") return t.price > 2499
        return true
      })
    }

    if (filters.technologies.length > 0) {
      result = result.filter((t) =>
        filters.technologies.some((techId) => {
          const opt = technologyOptions.find((o) => o.value === techId)
          return opt && matchTechnology(opt, t.techStack)
        })
      )
    }

    if (filters.features.length > 0) {
      result = result.filter((t) =>
        filters.features.some((featId) => matchFeature(featId, t.features))
      )
    }

    const sortFn = sortFunctions[filters.sort] || sortFunctions.popular
    result.sort(sortFn)

    return result
  }, [filters])

  const highlightMap = useMemo(() => {
    if (!filters.solutionType || filters.solutionType === "other") return {}
    const map = {}
    filtered.forEach((t) => {
      if (t.category === filters.solutionType || t.industry === filters.solutionType) map[t.id] = true
    })
    return map
  }, [filtered, filters.solutionType])

  const activeFilters = useMemo(() => {
    const chips = []
    if (filters.category !== "all") chips.push({ key: "category", label: categories.find((c) => c.id === filters.category)?.label || filters.category })
    if (filters.industry !== "all") chips.push({ key: "industry", label: industries.find((i) => i.value === filters.industry)?.label || filters.industry })
    if (filters.priceRange !== "all") {
      const labels = { starter: "Under $999", growing: "$999-$2,499", enterprise: "$2,500+" }
      chips.push({ key: "priceRange", label: labels[filters.priceRange] || filters.priceRange })
    }
    if (filters.timeline !== "all") chips.push({ key: "timeline", label: filters.timeline })
    filters.technologies.forEach((t) => chips.push({ key: `tech-${t}`, label: t }))
    filters.features.forEach((f) => chips.push({ key: `feat-${f}`, label: f }))
    return chips
  }, [filters])

  const count = activeCount()

  return (
    <>
      <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <section id="templates-grid" className="relative py-24 md:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
          <div className="absolute top-[20%] -left-48 w-[500px] h-[500px] rounded-full opacity-10" style={{
            background: "radial-gradient(circle, rgba(0, 240, 255, 0.04), transparent 70%)",
            filter: "blur(120px)",
          }} />
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px",
          }} />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* ── Toolbar ── */}
          <SafeSlideUp delay={0.1}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
              <SearchBar
                value={searchInput}
                onChange={setSearchInput}
                focused={searchFocused}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />

              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 shrink-0",
          "bg-accent/[0.06] border border-accent/15 hover:bg-accent/[0.12] hover:border-border/50",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                  count > 0 && "border-accent/30 text-accent"
                )}
                aria-label="Open filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {count > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-r from-accent to-accent-secondary text-white text-[10px] font-bold">
                    {count}
                  </span>
                )}
              </button>

              <SortDropdown value={filters.sort} onChange={(v) => updateFilter("sort", v)} />
            </div>
          </SafeSlideUp>

          {/* ── Active Filter Chips ── */}
          <AnimatePresence>
            {activeFilters.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-wrap items-center gap-2 mb-6"
              >
                {activeFilters.map((chip) => (
                  <motion.span
                    key={chip.key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20"
                  >
                    {chip.label}
                    <button
                      type="button"
                      onClick={() => {
                        if (chip.key.startsWith("tech-")) {
                          updateFilter("technologies", filters.technologies.filter((t) => t !== chip.key.replace("tech-", "")))
                        } else if (chip.key.startsWith("feat-")) {
                          updateFilter("features", filters.features.filter((f) => f !== chip.key.replace("feat-", "")))
                        } else {
                          updateFilter(chip.key, "all")
                        }
                      }}
                      className="hover:text-foreground transition-colors"
                      aria-label={`Remove ${chip.label} filter`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                ))}
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground border border-border/30 hover:border-border/55 transition-all"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear All
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Result Count ── */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted">
              Showing{' '}
              <motion.span
                key={filtered.length}
                initial={{ opacity: 0, y: -8, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-foreground font-semibold tabular-nums"
              >
                {filtered.length}
              </motion.span>{' '}
              template{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* ── Grid ── */}
          {filtered.length > 0 ? (
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((template, i) => (
                <TemplateCard key={template.id} template={template} index={i} highlight={highlightMap[template.id]} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 rounded-2xl bg-accent/[0.07] border border-accent/15 flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">No templates found</h3>
              <p className="text-sm text-muted mb-6">Try changing your filters to discover more solutions.</p>
              <button
                type="button"
                onClick={clearFilters}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                  "bg-gradient-to-r from-accent to-accent-secondary text-white",
                  "shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30",
                  "hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                <RotateCcw className="w-4 h-4" />
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
