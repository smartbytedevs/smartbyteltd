"use client"

import { useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { useBlogFilters } from "./BlogFilterContext"
import { categories } from "@/data/blog"
import { X, Check } from "lucide-react"

function FilterChip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 h-11 px-5 rounded-full text-sm font-medium transition-all duration-300 outline-none",
        "focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        selected
          ? "bg-gradient-to-r from-accent to-accent-secondary text-background shadow-md shadow-accent/20"
          : "bg-white/[0.04] border border-white/[0.08] text-muted-foreground hover:bg-white/[0.08] hover:text-foreground hover:border-accent/30"
      )}
      aria-pressed={selected}
    >
      {selected && <Check className="w-3.5 h-3.5" />}
      {label}
    </button>
  )
}

export function BlogFilterDrawer({ open, onClose }) {
  const { filters, updateFilter, clearFilters, activeCount } = useBlogFilters()
  const panelRef = useRef(null)

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onClose()
  }, [onClose])

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, handleKeyDown])

  const handleCategorySelect = (value) => {
    updateFilter("category", value === filters.category ? "all" : value)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(5,8,20,0.65)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            ref={panelRef}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 z-50 h-full w-[400px] max-w-[90vw] bg-background border-r border-white/[0.06] shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Filter articles"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] shrink-0">
              <h3 className="font-display text-lg font-bold text-foreground">Categories</h3>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="mb-6">
                <p className="text-xs text-muted-foreground mb-4">Select a category to filter articles.</p>
                <div className="flex flex-wrap gap-2">
                  <FilterChip
                    label="All Categories"
                    selected={filters.category === "all"}
                    onClick={() => updateFilter("category", "all")}
                  />
                  {categories.map((cat) => (
                    <FilterChip
                      key={cat.id}
                      label={cat.label}
                      selected={filters.category === cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-white/[0.06] bg-background/80 backdrop-blur-xl px-6 py-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex-1 px-5 py-2.5 rounded-xl text-sm font-medium border border-white/[0.08] text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-accent to-accent-secondary text-background shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
