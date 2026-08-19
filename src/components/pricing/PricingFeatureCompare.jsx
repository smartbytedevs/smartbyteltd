"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { Check, Minus } from "lucide-react"
import { featureCompare } from "./pricingData"
import { SafeSlideUp } from "@/components/common/SafeMotion"

const planLabels = ["Starter", "Business", "Software", "Custom"]

function FeatureRow({ row, index, isInView }) {
  const statusIcon = (val) => {
    if (val === true)
      return <Check className="w-3.5 h-3.5 text-[#50FFAF]" />
    if (val === "optional")
      return <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-label">Opt</span>
    if (val === "basic")
      return <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-label">Basic</span>
    if (val === "advanced")
      return <span className="text-[9px] font-semibold text-[#50FFAF] uppercase tracking-label">Adv</span>
    return <Minus className="w-3 h-3 text-gray-200" />
  }

  return (
    <motion.tr
      initial={false}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <td className="py-3 pr-4 lg:pr-6">
        <span className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-900 transition-colors duration-300 font-medium">
          {row.feature}
        </span>
      </td>
      {[row.starter, row.business, row.software, row.custom].map((val, i) => (
        <td key={i} className="py-3 text-center">
          <div className="flex justify-center">{statusIcon(val)}</div>
        </td>
      ))}
    </motion.tr>
  )
}

export function PricingFeatureCompare() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div ref={ref} className="mt-24 lg:mt-28">
      <SafeSlideUp viewportMargin="-60px">
        <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-3">
          Feature Comparison
        </h3>
      </SafeSlideUp>
      <SafeSlideUp delay={0.08} viewportMargin="-60px">
        <p className="text-sm text-gray-400 text-center mb-10 max-w-xl mx-auto">
          See exactly what&apos;s included in each plan
        </p>
      </SafeSlideUp>

      {/* Desktop table */}
      <div className="hidden lg:block">
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 pr-6">
                  <span className="text-[10px] font-semibold tracking-label uppercase text-gray-400">
                    Feature
                  </span>
                </th>
                {planLabels.map((label) => (
                  <th key={label} className="text-center py-4">
                    <span className="text-xs font-semibold tracking-nav text-gray-500">
                      {label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureCompare.map((row, i) => (
                <FeatureRow key={row.feature} row={row} index={i} isInView={isInView} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile / Tablet: cards */}
      <div className="lg:hidden space-y-2">
        {featureCompare.map((row, i) => {
          const values = [row.starter, row.business, row.software, row.custom]
          return (
            <motion.div
              key={row.feature}
              initial={false}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: i * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white"
            >
              <span className="flex-1 text-xs text-gray-500 font-medium">{row.feature}</span>
              <div className="flex items-center gap-3">
                {values.map((val, vi) => (
                  <div key={vi} className="flex flex-col items-center gap-0.5 w-8">
                    <span className="text-[8px] font-semibold tracking-label uppercase text-gray-300">
                      {planLabels[vi].slice(0, 3)}
                    </span>
                    <div className="flex justify-center">
                      {val === true ? (
                        <Check className="w-3 h-3 text-[#50FFAF]" />
                      ) : val === "optional" ? (
                        <span className="text-[8px] font-semibold text-gray-400">Opt</span>
                      ) : val === "basic" ? (
                        <span className="text-[8px] font-semibold text-gray-400">Bsc</span>
                      ) : val === "advanced" ? (
                        <span className="text-[8px] font-semibold text-[#50FFAF]">Adv</span>
                      ) : (
                        <Minus className="w-2.5 h-2.5 text-gray-200" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
