"use client"

import { useState, useEffect } from "react"

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "")

  useEffect(() => {
    const observers = []
    const handleIntersect = (id) => (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(id)
          break
        }
      }
    }

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) {
        const observer = new IntersectionObserver(handleIntersect(id), {
          rootMargin: "-40% 0px -55% 0px",
          threshold: 0,
        })
        observer.observe(el)
        observers.push(observer)
      }
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect()
      }
    }
  }, [sectionIds])

  return activeId
}
