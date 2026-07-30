"use client"

import { createContext, useContext, useState, useCallback } from "react"

const WorksFilterContext = createContext(null)

export function WorksFilterProvider({ children }) {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    industry: "all",
    technology: "all",
    sort: "newest",
    technologies: [],
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

  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      category: "all",
      industry: "all",
      technology: "all",
      sort: "newest",
      technologies: [],
    })
  }, [])

  const activeCount = useCallback(() => {
    const f = filters
    let count = 0
    if (f.category !== "all") count++
    if (f.industry !== "all") count++
    if (f.technology !== "all") count++
    if (f.sort !== "newest") count++
    if (f.search) count++
    if (f.technologies.length > 0) count += f.technologies.length
    return count
  }, [filters])

  return (
    <WorksFilterContext.Provider value={{ filters, updateFilter, toggleArrayFilter, clearFilters, activeCount }}>
      {children}
    </WorksFilterContext.Provider>
  )
}

export function useWorksFilters() {
  const ctx = useContext(WorksFilterContext)
  if (!ctx) throw new Error("useWorksFilters must be used within WorksFilterProvider")
  return ctx
}
