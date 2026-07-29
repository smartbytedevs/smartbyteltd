"use client"

import { motion, AnimatePresence } from "motion/react"

function BrowserFrame({ children }) {
  return (
    <div className="w-full h-full rounded-lg bg-[#0a0d14] border border-white/[0.06] overflow-hidden flex flex-col">
      <div className="h-5 bg-[#111827] flex items-center px-3 gap-1.5 shrink-0 border-b border-white/[0.04]">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
        <div className="ml-auto w-16 h-2 rounded bg-white/[0.04]" />
      </div>
      <div className="flex-1 p-2.5 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

function WebsitePreview() {
  return (
    <div className="w-full space-y-1.5">
      <div className="flex gap-2">
        <div className="h-1 w-6 rounded-full bg-white/5" />
        <div className="h-1 w-6 rounded-full bg-white/5" />
        <div className="h-1 w-6 rounded-full bg-white/5" />
        <div className="h-1 w-8 rounded-full bg-accent/15 ml-auto" />
      </div>
      <div className="flex flex-col items-center pt-2 space-y-1.5">
        <div className="h-1.5 w-20 rounded-full bg-white/10" />
        <div className="h-1 w-14 rounded-full bg-white/5" />
        <div className="h-4 w-12 rounded-full bg-accent/20 mt-1" />
      </div>
    </div>
  )
}

function DashboardPreview() {
  return (
    <div className="w-full flex gap-1.5">
      <div className="w-4 bg-white/[0.03] rounded" />
      <div className="flex-1 space-y-1">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 h-4 rounded bg-white/[0.04]" />
          ))}
        </div>
        <div className="h-5 rounded bg-white/[0.03]" />
      </div>
    </div>
  )
}

function SaaSPreview() {
  return (
    <div className="w-full space-y-1.5">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 h-5 rounded bg-white/[0.04] p-1">
            <div className="h-0.5 w-4 rounded-full bg-white/5 mb-0.5" />
            <motion.div
              className="h-1 rounded-full bg-gradient-to-r from-accent to-accent-secondary"
              animate={{ width: ["40%", "80%", "40%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {[0, 1].map((i) => (
          <div key={i} className="flex-1 h-5 rounded bg-white/[0.03] p-1 flex items-end gap-0.5">
            {[30, 50, 40].map((h, j) => (
              <motion.div
                key={j}
                className="w-1 rounded-t bg-accent/30"
                style={{ height: h * 0.25 + "%" }}
                animate={{ height: [h * 0.15 + "%", h * 0.35 + "%", h * 0.15 + "%"] }}
                transition={{ duration: 2, repeat: Infinity, delay: j * 0.2 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function AIPreview() {
  return (
    <div className="w-full flex items-center justify-center relative h-full">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full border border-accent/25"
          style={{ left: `${30 + i * 20}%`, top: `${35 + (i % 2) * 30}%` }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2 + i, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      <div className="z-10 px-2 py-1 rounded bg-white/5 border border-white/5">
        <motion.div
          className="h-1 w-12 rounded-full bg-gradient-to-r from-accent to-accent-secondary"
          animate={{ width: ["30%", "100%", "30%"] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </div>
  )
}

function EcommercePreview() {
  return (
    <div className="w-full flex gap-1.5">
      <div className="flex-1 rounded bg-white/[0.04] p-1.5 space-y-1">
        <div className="h-3 rounded bg-white/[0.04]" />
        <div className="h-0.5 w-8 rounded-full bg-white/5" />
        <motion.div
          className="h-1 w-6 rounded-full bg-accent/25"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className="flex-1 rounded bg-white/[0.04] p-1.5 space-y-1">
        <div className="h-3 rounded bg-white/[0.04]" />
        <div className="h-0.5 w-6 rounded-full bg-white/5" />
        <motion.div
          className="h-1 w-8 rounded-full bg-accent-secondary/25"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  )
}

function InventoryPreview() {
  return (
    <div className="w-full space-y-1">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 h-4 rounded bg-white/[0.04] p-1">
            <div className="h-0.5 w-4 rounded-full bg-white/5 mb-0.5" />
            <motion.div
              className="h-0.5 w-6 rounded-full bg-accent/20"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
            />
          </div>
        ))}
      </div>
      <div className="h-8 rounded bg-white/[0.03] p-1 space-y-0.5">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-1">
            <div className="w-2 h-1 rounded bg-white/5" />
            <div className="w-8 h-1 rounded bg-white/5" />
            <div className="w-4 h-1 rounded bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  )
}

function RestaurantPreview() {
  return (
    <div className="w-full flex gap-1">
      <div className="w-2/5 space-y-0.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-3 rounded bg-white/[0.04] p-0.5 flex items-center">
            <div className="h-0.5 w-8 rounded-full bg-white/5" />
            <motion.div
              className="h-1 w-3 rounded-full bg-accent/20 ml-auto"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-0.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1 h-3 rounded bg-white/[0.03] p-0.5">
            <div className="w-2 h-2 rounded bg-white/5" />
            <div className="h-0.5 w-6 rounded-full bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  )
}

function MobilePreview() {
  return (
    <div className="w-auto h-[80%] aspect-[9/19] rounded-md border border-white/[0.08] bg-[#0d1117] overflow-hidden flex flex-col">
      <div className="h-3 bg-[#161b22] flex items-center justify-center">
        <div className="w-5 h-0.5 rounded-full bg-white/10" />
      </div>
      <div className="flex-1 p-1 space-y-0.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded bg-white/[0.04] p-0.5 space-y-0.5">
            <div className="h-0.5 w-6 rounded-full bg-white/10" />
            <div className="h-0.5 w-4 rounded-full bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  )
}

const previews = {
  website: WebsitePreview,
  dashboard: DashboardPreview,
  saas: SaaSPreview,
  ai: AIPreview,
  ecommerce: EcommercePreview,
  inventory: InventoryPreview,
  restaurant: RestaurantPreview,
  mobile: MobilePreview,
}

export function CardPreview({ type = "dashboard" }) {
  const Preview = previews[type] || previews.dashboard

  return (
    <div className="w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={type}
          className="w-full h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <BrowserFrame>
            <Preview />
          </BrowserFrame>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
