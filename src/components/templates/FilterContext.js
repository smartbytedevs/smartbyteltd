"use client"

import { createContext, useContext, useState, useCallback } from "react"

const FilterContext = createContext(null)

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    industry: "all",
    priceRange: "all",
    timeline: "all",
    sort: "popular",
    solutionType: null,
    technologies: [],
    features: [],
  })

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const toggleArrayFilter = useCallback((key, value) => {
    setFilters((prev) => {
      const arr = prev[key]
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
      return { ...prev, [key]: next }
    })
  }, [])

  const applySolution = useCallback((type) => {
    setFilters((prev) => ({
      ...prev,
      solutionType: type,
      category: type === "other" ? "all" : type,
      search: "",
    }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      category: "all",
      industry: "all",
      priceRange: "all",
      timeline: "all",
      sort: "popular",
      solutionType: null,
      technologies: [],
      features: [],
    })
  }, [])

  const activeCount = useCallback(() => {
    const f = filters
    let count = 0
    if (f.category !== "all") count++
    if (f.industry !== "all") count++
    if (f.priceRange !== "all") count++
    if (f.timeline !== "all") count++
    if (f.sort !== "popular") count++
    if (f.search) count++
    if (f.technologies.length > 0) count += f.technologies.length
    if (f.features.length > 0) count += f.features.length
    return count
  }, [filters])

  return (
    <FilterContext.Provider value={{ filters, updateFilter, toggleArrayFilter, applySolution, clearFilters, activeCount }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error("useFilters must be used within FilterProvider")
  return ctx
}
