"use client"

import React, { useMemo, useState, useEffect, useCallback } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { fadeUpSimple } from "@/lib/animations"
import { useFilters } from "./FilterContext"
import { templates, industries, priceRanges, sortOptions, categories } from "@/data/templates"
import {
  Search,
  ChevronDown,
  Eye,
  ShoppingCart,
  Check,
  Clock,
  Layout,
} from "lucide-react"

const categoryGradients = {
  restaurant: "from-emerald-500/30 to-green-600/30",
  medical: "from-sky-500/30 to-blue-600/30",
  education: "from-violet-500/30 to-purple-600/30",
  corporate: "from-slate-500/30 to-gray-600/30",
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

function TemplateCard({ template, index, highlight }) {
  const gradient = categoryGradients[template.category] || categoryGradients.default

  return (
    <motion.div
      {...fadeUpSimple(index * 0.05)}
      className={cn(
        "group relative rounded-2xl overflow-hidden transition-all duration-500",
        "bg-white/[0.02] border border-white/[0.06]",
        "hover:bg-white/[0.04] hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5",
        "hover:-translate-y-1",
        highlight && "ring-2 ring-accent/50 shadow-lg shadow-accent/10"
      )}
    >
      {template.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className={cn(
            "inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-label uppercase",
            template.badge === "BEST SELLER" && "bg-amber-500/20 text-amber-300 border border-amber-500/30",
            template.badge === "POPULAR" && "bg-accent/20 text-accent border border-accent/30",
            template.badge === "NEW" && "bg-sky-500/20 text-sky-300 border border-sky-500/30",
            template.badge === "TRENDING" && "bg-purple-500/20 text-purple-300 border border-purple-500/30",
          )}>
            {template.badge}
          </span>
        </div>
      )}

      <div className={cn(
        "relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br",
        gradient
      )}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Layout className="w-8 h-8 text-white/40" />
          </div>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 flex items-center justify-center">
          <div className="flex gap-3">
            <button
              type="button"
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105"
              aria-label="Preview template"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-3 rounded-xl bg-accent text-background hover:bg-accent-hover transition-all hover:scale-105"
              aria-label="Get this template"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold tracking-label uppercase px-2 py-0.5 rounded-full bg-white/[0.06] text-muted-foreground border border-white/[0.06]">
            {categories.find((c) => c.id === template.category)?.label || template.category}
          </span>
          <span className="text-[10px] font-bold tracking-label uppercase px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
            {industries.find((i) => i.value === template.industry)?.label || template.industry}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors">
          {template.name}
        </h3>

        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
          {template.description}
        </p>

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
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-white/[0.04] text-muted-foreground border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {template.delivery}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">From</span>
            <div className="text-lg font-bold text-foreground">
              ${template.price.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all",
              "bg-white/[0.04] border border-white/[0.08] text-muted-foreground",
              "hover:bg-white/[0.08] hover:text-foreground hover:border-white/[0.15]",
              "group-hover:scale-[1.02]"
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all",
              "bg-gradient-to-r from-accent to-accent-secondary text-background",
              "shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30",
              "hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Get Template
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function Select({ label, options, value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full appearance-none px-4 py-2.5 rounded-xl text-sm transition-colors cursor-pointer",
          "bg-white/[0.03] border border-white/[0.06] text-foreground",
          "hover:border-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
          "pr-10"
        )}
        aria-label={label}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
    </div>
  )
}

export function TemplatesCatalog() {
  const { filters, updateFilter } = useFilters()
  const [searchInput, setSearchInput] = useState(filters.search)
  const debouncedSearch = useDebounce(searchInput, 300)

  useEffect(() => {
    updateFilter("search", debouncedSearch)
  }, [debouncedSearch, updateFilter])

  useEffect(() => {
    setSearchInput(filters.search)
  }, [filters.search])

  const filtered = useMemo(() => {
    let result = [...templates]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter((t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.techStack.some((tech) => tech.toLowerCase().includes(q))
      )
    }

    if (filters.solutionType && filters.solutionType !== "other") {
      result = result.filter((t) => t.category === filters.solutionType || t.industry === filters.solutionType)
    } else {
      if (filters.category !== "all") {
        result = result.filter((t) => t.category === filters.category)
      }
      if (filters.industry !== "all") {
        result = result.filter((t) => t.industry === filters.industry)
      }
    }

    if (filters.priceRange !== "all") {
      result = result.filter((t) => {
        if (filters.priceRange === "starter") return t.price < 999
        if (filters.priceRange === "growing") return t.price >= 999 && t.price <= 2499
        if (filters.priceRange === "enterprise") return t.price > 2499
        return true
      })
    }

    const sortFn = sortFunctions[filters.sort] || sortFunctions.popular
    result.sort(sortFn)

    return result
  }, [filters])

  const highlightMap = useMemo(() => {
    if (!filters.solutionType || filters.solutionType === "other") return {}
    const map = {}
    filtered.forEach((t) => {
      if (t.category === filters.solutionType || t.industry === filters.solutionType) {
        map[t.id] = true
      }
    })
    return map
  }, [filtered, filters.solutionType])

  return (
    <section id="templates-grid" className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-[20%] -left-48 w-[500px] h-[500px] rounded-full opacity-10" style={{
          background: "radial-gradient(circle, rgba(0, 194, 168, 0.04), transparent 70%)",
          filter: "blur(120px)",
        }} />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Filter Toolbar */}
        <div className="glass rounded-2xl p-4 md:p-6 mb-10">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-end">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search templates..."
                className={cn(
                  "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-colors",
                  "bg-white/[0.03] border border-white/[0.06] text-foreground placeholder:text-muted-foreground",
                  "hover:border-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                )}
                aria-label="Search templates"
              />
            </div>

            <Select
              label="Category"
              options={[{ value: "all", label: "All Categories" }, ...categories.map((c) => ({ value: c.id, label: c.label }))]}
              value={filters.category}
              onChange={(v) => updateFilter("category", v)}
            />

            <Select
              label="Industry"
              options={industries}
              value={filters.industry}
              onChange={(v) => updateFilter("industry", v)}
            />

            <Select
              label="Price Range"
              options={priceRanges}
              value={filters.priceRange}
              onChange={(v) => updateFilter("priceRange", v)}
            />

            <Select
              label="Sort By"
              options={sortOptions}
              value={filters.sort}
              onChange={(v) => updateFilter("sort", v)}
            />
          </div>

          {/* Results count */}
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing <span className="text-foreground font-medium">{filtered.length}</span> template{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((template, i) => (
              <TemplateCard
                key={template.id}
                template={template}
                index={i}
                highlight={highlightMap[template.id]}
              />
            ))}
          </div>
        ) : (
          <motion.div
            {...fadeUpSimple(0.2)}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-lg text-muted-foreground">No templates match your criteria.</p>
            <button
              type="button"
              onClick={() => updateFilter("solutionType", null)}
              className="mt-4 text-sm text-accent hover:text-accent-hover transition-colors underline underline-offset-4"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
