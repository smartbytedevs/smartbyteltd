"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { useBlogFilters } from "./BlogFilterContext"
import { BlogFilterDrawer } from "./BlogFilterDrawer"
import { sortOptions } from "@/data/blog"
import { Search, SlidersHorizontal, CheckCircle, ChevronDown } from "lucide-react"

const placeholders = [
  "Search articles...",
  "Search AI...",
  "Search SEO...",
  "Search Next.js...",
  "Search UI Design...",
]

export function BlogToolbar() {
  const { filters, updateFilter } = useBlogFilters()
  const [searchInput, setSearchInput] = useState(filters.search)
  const [searchFocused, setSearchFocused] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(typeof navigator !== "undefined" && navigator.platform.includes("Mac"))
  }, [])

  useEffect(() => {
    if (searchFocused) return
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % placeholders.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [searchFocused])

  useEffect(() => {
    const timer = setTimeout(() => updateFilter("search", searchInput), 300)
    return () => clearTimeout(timer)
  }, [searchInput, updateFilter])

  return (
    <>
      <BlogFilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className={cn(
          "relative flex-1 rounded-2xl border transition-all duration-500",
          searchFocused
            ? "bg-white/45 border-accent/40 shadow-lg shadow-accent/10"
            : "bg-white/30 border-border/30 hover:bg-white/45 hover:border-border/50"
        )}>
          <div className="relative flex items-center">
            <Search className={cn(
              "absolute left-4 w-4 h-4 transition-colors duration-300 pointer-events-none",
              searchFocused ? "text-accent" : "text-muted-foreground"
            )} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder={placeholders[placeholderIdx]}
              className="w-full bg-transparent pl-10 pr-20 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none rounded-2xl"
              aria-label="Search articles"
            />
            <span className="absolute right-4 text-[10px] font-medium text-muted-foreground/40 bg-white/45 px-1.5 py-0.5 rounded border border-border/30 pointer-events-none">
              {isMac ? "\u2318K" : "Ctrl+K"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className={cn(
              "flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300",
              "bg-white/30 border border-border/30 hover:bg-white/55 hover:border-border/50",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            )}
            aria-label="Open categories"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Categories</span>
          </button>

          <SortDropdown value={filters.sort} onChange={(v) => updateFilter("sort", v)} />
        </div>
      </div>
    </>
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
          "bg-white/30 border border-border/30 hover:bg-white/55 hover:border-border/50",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
          open && "border-accent/30"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Sort by"
      >
        <span className="text-foreground hidden sm:inline">{selected?.label || "Newest"}</span>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 z-30 w-40 rounded-2xl border border-border/30 bg-card shadow-2xl overflow-hidden"
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
                {value === opt.value && <CheckCircle className="w-3.5 h-3.5 text-accent" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
