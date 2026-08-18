"use client"

import { SafeSlideUp } from "@/components/common/SafeMotion"
import { ArrowRight } from "lucide-react"
import { useQuoteModal } from "@/components/quote/QuoteModalContext"

function PanelContent({ node }) {
  const Icon = node.icon
  const { openQuoteModal } = useQuoteModal()

  return (
    <SafeSlideUp className="flex flex-col" key={node.id}>
      {/* Icon + Label */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/15 to-accent-secondary/15 border border-border/25 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <span className="text-xs font-semibold tracking-label uppercase text-accent">
          {node.label}
        </span>
      </div>

      {/* Headline */}
      <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-4">
        {node.headline}
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">
        {node.description}
      </p>

      {/* Deliverables */}
      <div className="mb-6">
        <span className="text-xs font-semibold tracking-label uppercase text-foreground/60 mb-3 block">
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
                  stroke="#00F0FF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-muted">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3.5 rounded-xl bg-accent/[0.06] border border-accent/15">
          <span className="text-[10px] font-semibold tracking-label uppercase text-muted/60 block mb-1">
            Timeline
          </span>
          <span className="text-sm font-semibold text-foreground">
            {node.timeline}
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-accent/[0.06] border border-accent/15">
          <span className="text-[10px] font-semibold tracking-label uppercase text-muted/60 block mb-1">
            Starting Price
          </span>
          <span className="text-sm font-semibold text-foreground">
            {node.startingPrice}
          </span>
        </div>
      </div>

      {/* Recommended for */}
      <p className="text-xs text-muted/60 leading-relaxed mb-6">
        <span className="text-foreground/60 font-semibold">Recommended for </span>
        {node.recommendedFor}
      </p>

      {/* CTA */}
      <button
        type="button"
        onClick={() =>
          openQuoteModal({
            source: "home",
            heading: "Explore This Service",
            subtitle: node.description,
          })
        }
        className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors duration-300 cursor-pointer"
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
