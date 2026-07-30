"use client"

import { createContext, useContext, useState, useCallback } from "react"

const FilterContext = createContext(null)

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    industry: "all",
    priceRange: "all",
    sort: "popular",
    solutionType: null,
  })

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
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
      sort: "popular",
      solutionType: null,
    })
  }, [])

  return (
    <FilterContext.Provider value={{ filters, updateFilter, applySolution, clearFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error("useFilters must be used within FilterProvider")
  return ctx
}
