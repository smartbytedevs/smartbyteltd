"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { useWorksFilters } from "./WorksFilterContext"
import { WorksFilterDrawer } from "./WorksFilterDrawer"
import { projects, categories, industryOptions, technologyOptions, sortOptions } from "@/data/works"
import { Search, X, Eye, ArrowUpRight, SlidersHorizontal, RotateCcw, Star, Clock, CheckCircle } from "lucide-react"
import { SafeSlideUp } from "@/components/common/SafeMotion"

const statusColors = {
  Live: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  "In Progress": "bg-amber-500/10 text-amber-700 border-amber-500/20",
  Completed: "bg-accent/10 text-accent border-accent/20",
}

const sortFunctions = {
  newest: (a, b) => (a.id > b.id ? -1 : 1),
  popular: (a, b) => b.metrics[0].value - a.metrics[0].value,
  rating: (a, b) => b.rating - a.rating,
  alpha: (a, b) => a.title.localeCompare(b.title),
}

const categoryGradients = {
  restaurant: "from-emerald-500/30 to-green-600/30",
  medical: "from-sky-500/30 to-blue-600/30",
  education: "from-violet-500/30 to-purple-600/30",
  corporate: "from-indigo-500/30 to-violet-600/30",
  portfolio: "from-pink-500/30 to-rose-600/30",
  ecommerce: "from-amber-500/30 to-orange-600/30",
  agency: "from-indigo-500/30 to-blue-600/30",
  realestate: "from-teal-500/30 to-cyan-600/30",
  default: "from-accent/20 to-accent-secondary/20",
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
  "Search projects, industries, technologies...",
  "Search by business type...",
  "Search by technology...",
  "Search by project name...",
]

function SearchBar({ value, onChange, onFocus, onBlur, focused }) {
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const [isMac, setIsMac] = useState(false)

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
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholders[placeholderIdx]}
          className="w-full bg-transparent pl-10 pr-20 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none rounded-2xl"
          aria-label="Search projects"
        />
        <span className="absolute right-4 text-[10px] font-medium text-muted-foreground/40 bg-accent/[0.08] px-1.5 py-0.5 rounded border border-accent/15 pointer-events-none">
          {isMac ? "\u2318K" : "Ctrl+K"}
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
        <span className="text-foreground">{selected?.label || "Newest"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 z-30 w-48 rounded-2xl border border-accent/15 bg-card shadow-2xl overflow-hidden"
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
                  "w-full text-left px-4 py-3 text-sm transition-colors hover:bg-accent/[0.12] flex items-center justify-between",
                  value === opt.value ? "text-accent" : "text-muted-foreground"
                )}
              >
                {opt.label}
                {value === opt.value && <CheckCircle className="w-3.5 h-3.5 text-accent" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const gradient = categoryGradients[project.category] || categoryGradients.default
  const liveHref = project.liveLink || ""
  const imageSrc = project.thumbnail || project.coverImage || ""

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative rounded-2xl overflow-hidden transition-all duration-500",
        "bg-accent/[0.06] border border-accent/15",
        "hover:bg-accent/[0.12] hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5",
        "hover:-translate-y-1"
      )}
    >
      <div className={cn("relative h-48 sm:h-56 overflow-hidden", imageSrc ? "bg-[#0D0D18]" : cn("bg-gradient-to-br", gradient))}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={`${project.title} project screenshot`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-accent/[0.08] border border-border/40 flex items-center justify-center">
              <Star className="w-8 h-8 text-foreground/40" />
            </div>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className={cn(
            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-label uppercase border",
            statusColors[project.status] || "bg-accent/[0.09] text-foreground border-border/50"
          )}>
            <CheckCircle className="w-3 h-3" />
            {project.status}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 border border-amber-500/20">
            <Star className="w-3 h-3 fill-amber-500" />
            {project.rating}
          </span>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 flex items-center justify-center">
          <Link
            href={`/works/${project.slug}`}
            className="p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-white/60 text-foreground shadow-lg hover:bg-white transition-all hover:scale-105"
            aria-label={`View case study for ${project.title}`}
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold tracking-label uppercase px-2 py-0.5 rounded-full bg-accent/[0.09] text-muted-foreground border border-accent/15">
            {project.industry}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock className="w-3 h-3" /> {project.timeline}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors">{project.title}</h3>
        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-accent/[0.08] text-muted-foreground border border-accent/15">{tech}</span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-accent/[0.08] text-muted">+{project.techStack.length - 4}</span>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-accent/15">
          <div className="grid grid-cols-3 gap-2">
            {project.metrics.slice(0, 3).map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-xs font-bold text-accent">{m.value}{m.suffix}</div>
                <div className="text-[9px] text-muted-foreground leading-tight">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href={`/works/${project.slug}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all bg-accent/[0.08] border border-accent/15 text-muted-foreground hover:bg-accent/[0.12] hover:text-foreground hover:border-border/55 group-hover:scale-[1.02]"
          >
            <Eye className="w-3.5 h-3.5" /> Case Study
          </Link>
          {liveHref ? (
            <a
              href={liveHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all bg-gradient-to-r from-accent to-accent-secondary text-white shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <ArrowUpRight className="w-3.5 h-3.5" /> Live Preview
            </a>
          ) : (
            <span className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium bg-accent/[0.06] border border-accent/15 text-muted-foreground/60 cursor-not-allowed">
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function PortfolioGrid() {
  const { filters, updateFilter, clearFilters, activeCount } = useWorksFilters()
  const [searchInput, setSearchInput] = useState(filters.search)
  const [searchFocused, setSearchFocused] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const debouncedSearch = useDebounce(searchInput, 300)

  useEffect(() => { updateFilter("search", debouncedSearch) }, [debouncedSearch, updateFilter])
  useEffect(() => { setSearchInput(filters.search) }, [filters.search])

  const filtered = useMemo(() => {
    let result = [...projects]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter((t) =>
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.industry.toLowerCase().includes(q) ||
        t.techStack.some((tech) => tech.toLowerCase().includes(q)) ||
        t.features.some((f) => f.toLowerCase().includes(q))
      )
    }

    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category)
    }

    if (filters.industry !== "all") {
      result = result.filter((t) => t.industry === filters.industry)
    }

    if (filters.technology !== "all") {
      const techOption = technologyOptions.find((o) => o.value === filters.technology)
      if (techOption) {
        result = result.filter((t) =>
          t.techStack.some((tech) => tech.toLowerCase() === techOption.match.toLowerCase())
        )
      }
    }

    const sortFn = sortFunctions[filters.sort] || sortFunctions.newest
    result.sort(sortFn)

    return result
  }, [filters])

  const activeFilters = useMemo(() => {
    const chips = []
    if (filters.category !== "all") chips.push({ key: "category", label: categories.find((c) => c.id === filters.category)?.label || filters.category })
    if (filters.industry !== "all") chips.push({ key: "industry", label: industryOptions.find((i) => i.value === filters.industry)?.label || filters.industry })
    if (filters.technology !== "all") chips.push({ key: "technology", label: technologyOptions.find((t) => t.value === filters.technology)?.label || filters.technology })
    return chips
  }, [filters])

  const count = activeCount()

  return (
    <>
      <WorksFilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <section id="portfolio-grid" className="relative py-24 md:py-32 overflow-hidden bg-background">
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
                      onClick={() => updateFilter(chip.key, "all")}
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
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground border border-accent/15 hover:border-border/55 transition-all"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear All
                </button>
              </motion.div>
            )}
          </AnimatePresence>

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
              project{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
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
              <h3 className="font-display text-xl font-bold text-foreground mb-2">No projects found</h3>
              <p className="text-sm text-muted mb-6">Try changing your filters to discover more work.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 bg-gradient-to-r from-accent to-accent-secondary text-white shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98]"
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
