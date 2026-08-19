"use client"

import { motion, AnimatePresence } from "motion/react"

function BrowserFrame({ children }) {
  return (
    <div className="w-full h-full rounded-lg bg-gray-50 border border-gray-200 overflow-hidden flex flex-col">
      <div className="h-5 bg-gray-100 flex items-center px-3 gap-1.5 shrink-0 border-b border-gray-200">
        <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
        <div className="ml-auto w-16 h-2 rounded bg-gray-200" />
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
        <div className="h-1 w-6 rounded-full bg-gray-300" />
        <div className="h-1 w-6 rounded-full bg-gray-300" />
        <div className="h-1 w-6 rounded-full bg-gray-300" />
        <div className="h-1 w-8 rounded-full bg-[#50FFAF]/40 ml-auto" />
      </div>
      <div className="flex flex-col items-center pt-2 space-y-1.5">
        <div className="h-1.5 w-20 rounded-full bg-gray-300" />
        <div className="h-1 w-14 rounded-full bg-gray-200" />
        <div className="h-4 w-12 rounded-full bg-[#50FFAF]/30 mt-1" />
      </div>
    </div>
  )
}

function DashboardPreview() {
  return (
    <div className="w-full flex gap-1.5">
      <div className="w-4 bg-gray-200 rounded" />
      <div className="flex-1 space-y-1">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 h-4 rounded bg-gray-200" />
          ))}
        </div>
        <div className="h-5 rounded bg-gray-100" />
      </div>
    </div>
  )
}

function SaaSPreview() {
  return (
    <div className="w-full space-y-1.5">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 h-5 rounded bg-gray-100 p-1">
            <div className="h-0.5 w-4 rounded-full bg-gray-300 mb-0.5" />
            <motion.div
              className="h-1 rounded-full bg-[#50FFAF]/50"
              animate={{ width: ["40%", "80%", "40%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {[0, 1].map((i) => (
          <div key={i} className="flex-1 h-5 rounded bg-gray-100 p-1 flex items-end gap-0.5">
            {[30, 50, 40].map((h, j) => (
              <motion.div
                key={j}
                className="w-1 rounded-t bg-[#50FFAF]/40"
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
          className="absolute w-2 h-2 rounded-full border border-[#50FFAF]/30"
          style={{ left: `${30 + i * 20}%`, top: `${35 + (i % 2) * 30}%` }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2 + i, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      <div className="z-10 px-2 py-1 rounded bg-gray-100 border border-gray-200">
        <motion.div
          className="h-1 w-12 rounded-full bg-[#50FFAF]/50"
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
      <div className="flex-1 rounded bg-gray-100 p-1.5 space-y-1">
        <div className="h-3 rounded bg-gray-200" />
        <div className="h-0.5 w-8 rounded-full bg-gray-300" />
        <motion.div
          className="h-1 w-6 rounded-full bg-[#50FFAF]/40"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className="flex-1 rounded bg-gray-100 p-1.5 space-y-1">
        <div className="h-3 rounded bg-gray-200" />
        <div className="h-0.5 w-6 rounded-full bg-gray-300" />
        <motion.div
          className="h-1 w-8 rounded-full bg-[#FF3B5C]/30"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
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
          <div key={i} className="flex-1 h-4 rounded bg-gray-100 p-1">
            <div className="h-0.5 w-4 rounded-full bg-gray-300 mb-0.5" />
            <motion.div
              className="h-0.5 w-6 rounded-full bg-[#50FFAF]/40"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
            />
          </div>
        ))}
      </div>
      <div className="h-8 rounded bg-gray-100 p-1 space-y-0.5">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-1">
            <div className="w-2 h-1 rounded bg-gray-300" />
            <div className="w-8 h-1 rounded bg-gray-200" />
            <div className="w-4 h-1 rounded bg-gray-300" />
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
          <div key={i} className="h-3 rounded bg-gray-100 p-0.5 flex items-center">
            <div className="h-0.5 w-8 rounded-full bg-gray-300" />
            <motion.div
              className="h-1 w-3 rounded-full bg-[#50FFAF]/40 ml-auto"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-0.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1 h-3 rounded bg-gray-100 p-0.5">
            <div className="w-2 h-2 rounded bg-gray-200" />
            <div className="h-0.5 w-6 rounded-full bg-gray-300" />
          </div>
        ))}
      </div>
    </div>
  )
}

function MobilePreview() {
  return (
    <div className="w-auto h-[80%] aspect-[9/19] rounded-md border border-gray-200 bg-white overflow-hidden flex flex-col">
      <div className="h-3 bg-gray-100 flex items-center justify-center">
        <div className="w-5 h-0.5 rounded-full bg-gray-300" />
      </div>
      <div className="flex-1 p-1 space-y-0.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded bg-gray-50 p-0.5 space-y-0.5">
            <div className="h-0.5 w-6 rounded-full bg-gray-200" />
            <div className="h-0.5 w-4 rounded-full bg-gray-100" />
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
