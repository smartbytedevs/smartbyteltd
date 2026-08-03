"use client"

import { useRef, useEffect } from "react"
import { motion } from "motion/react"
import { useBlogFilters } from "./BlogFilterContext"
import { popularTopics } from "@/data/blog"
import { cn } from "@/lib/utils"

export function PopularTopics() {
  const { filters, updateFilter } = useBlogFilters()
  const scrollRef = useRef(null)

  const handleTopicClick = (topic) => {
    updateFilter("topic", filters.topic === topic ? "" : topic)
  }

  useEffect(() => {
    if (!scrollRef.current) return
    const activeEl = scrollRef.current.querySelector(`[data-active="true"]`)
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    }
  }, [filters.topic])

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 -mx-4 sm:-mx-6 lg:-mx-0 px-4 sm:px-6 lg:px-0 lg:flex-wrap lg:overflow-visible lg:snap-none lg:pb-0"
    >
      {popularTopics.map((topic) => (
        <button
          key={topic}
          type="button"
          data-active={filters.topic === topic}
          onClick={() => handleTopicClick(topic)}
          className={cn(
            "snap-start shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border outline-none min-h-[40px]",
            "focus-visible:ring-2 focus-visible:ring-accent/50",
            filters.topic === topic
              ? "bg-accent/10 text-accent border-accent/20 shadow-sm shadow-accent/10"
              : "bg-white/30 border-border/30 text-muted-foreground hover:bg-white/4555 hover:text-foreground hover:border-border/50"
          )}
          aria-pressed={filters.topic === topic}
        >
          {topic}
        </button>
      ))}
    </div>
  )
}
