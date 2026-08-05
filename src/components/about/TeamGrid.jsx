"use client"

import { useRef, useEffect, useState } from "react"
import React from "react"
import { TeamCard } from "./TeamCard"

function ConnectionLines({ cardRefs, containerRef }) {
  const [paths, setPaths] = useState([])

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const containerRect = containerRef.current.getBoundingClientRect()
      const centers = cardRefs
        .map((ref) => ref.current?.getBoundingClientRect())
        .filter(Boolean)
        .map((rect) => ({
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        }))

      if (centers.length < 2) return

      const newPaths = []
      for (let i = 0; i < centers.length; i++) {
        for (let j = i + 1; j < centers.length; j++) {
          const midX = (centers[i].x + centers[j].x) / 2
          const midY = (centers[i].y + centers[j].y) / 2 - 20
          newPaths.push({
            key: `${i}-${j}`,
            d: `M ${centers[i].x} ${centers[i].y} Q ${midX} ${midY}, ${centers[j].x} ${centers[j].y}`,
          })
        }
      }
      setPaths(newPaths)
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [cardRefs, containerRef])

  if (paths.length === 0) return null

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {paths.map((p) => (
        <path
          key={p.key}
          d={p.d}
          fill="none"
          stroke="rgba(15, 118, 110, 0.04)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}
    </svg>
  )
}

export function TeamGrid({ team }) {
  const containerRef = useRef(null)
  const cardRefs = useRef(team.map(() => React.createRef()))

  useEffect(() => {
    cardRefs.current = team.map(() => React.createRef())
  }, [team])

  const founder = team[0]
  const rest = team.slice(1)

  return (
    <div ref={containerRef} className="relative">
      <ConnectionLines cardRefs={cardRefs.current} containerRef={containerRef} />

      {/* Desktop: featured founder + 2-col grid */}
      <div className="hidden md:block">
        {/* Founder — spans full width, visually larger */}
        <div ref={cardRefs.current[0]} className="mb-5">
          <TeamCard member={founder} index={0} featured />
        </div>

        {/* Rest — 2-column grid */}
        <div className="grid grid-cols-2 gap-5">
          {rest.map((member, i) => (
            <div key={member.id} ref={cardRefs.current[i + 1]}>
              <TeamCard member={member} index={i + 1} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: horizontal snap-scroll */}
      <div
        className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar"
        style={{ scrollPaddingLeft: "1rem" }}
      >
        {team.map((member) => (
          <div key={member.id} className="snap-start shrink-0 w-[80vw] max-w-[340px]">
            <TeamCard member={member} index={0} />
          </div>
        ))}
      </div>
    </div>
  )
}
