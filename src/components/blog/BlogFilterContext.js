"use client"

import { createContext, useContext, useState, useCallback } from "react"

const BlogFilterContext = createContext(null)

export function BlogFilterProvider({ children }) {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    sort: "newest",
    topic: "",
  })

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({ search: "", category: "all", sort: "newest", topic: "" })
  }, [])

  const activeCount = useCallback(() => {
    const f = filters
    let count = 0
    if (f.search) count++
    if (f.category !== "all") count++
    if (f.sort !== "newest") count++
    if (f.topic) count++
    return count
  }, [filters])

  return (
    <BlogFilterContext.Provider value={{ filters, updateFilter, clearFilters, activeCount }}>
      {children}
    </BlogFilterContext.Provider>
  )
}

export function useBlogFilters() {
  const ctx = useContext(BlogFilterContext)
  if (!ctx) throw new Error("useBlogFilters must be used within BlogFilterProvider")
  return ctx
}
