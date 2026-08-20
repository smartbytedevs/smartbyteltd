"use client"

import { SafeSlideUp } from "@/components/common/SafeMotion"
import { ArrowRight } from "lucide-react"
function PanelContent({ node }) {
  const Icon = node.icon

  return (
    <SafeSlideUp className="flex flex-col" key={node.id}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#8ba4ff]/10 border border-[#8ba4ff]/20 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-[#8ba4ff]" />
        </div>
        <span className="text-xs font-semibold tracking-label uppercase text-[#8ba4ff]">
          {node.label}
        </span>
      </div>

      <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
        {node.headline}
      </h3>

      <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-6">
        {node.description}
      </p>

      <div className="mb-6">
        <span className="text-xs font-semibold tracking-label uppercase text-gray-400 mb-3 block">
          What&apos;s Included
        </span>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {node.deliverables.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M11.5 3.5L5.25 10.5L2.5 7.5"
                  stroke="#8ba4ff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
          <span className="text-[10px] font-semibold tracking-label uppercase text-gray-400 block mb-1">
            Timeline
          </span>
          <span className="text-sm font-semibold text-gray-900">
            {node.timeline}
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
          <span className="text-[10px] font-semibold tracking-label uppercase text-gray-400 block mb-1">
            Starting Price
          </span>
          <span className="text-sm font-semibold text-gray-900">
            {node.startingPrice}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed mb-6">
        <span className="text-gray-500 font-semibold">Recommended for </span>
        {node.recommendedFor}
      </p>

      <button
        type="button"
        onClick={() => {
          const params = new URLSearchParams()
          params.set("source", "home")
          params.set("heading", "Explore This Service")
          params.set("subtitle", node.description)
          window.location.href = `/contact?${params.toString()}`
        }}
        className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-[#8ba4ff] transition-colors duration-300 cursor-pointer"
      >
        Explore Service
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </SafeSlideUp>
  )
}

export function SolutionPanel({ activeNode }) {
  return (
    <div className="relative min-h-[400px] lg:min-h-[500px]">
      <PanelContent key={activeNode.id} node={activeNode} />
    </div>
  )
}
