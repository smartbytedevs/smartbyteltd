"use client"

import { SafeSlideUp, SafeReveal } from "@/components/common/SafeMotion"

export function AboutValues({ values }) {
  return (
    <div className="mt-20">
      <SafeSlideUp className="text-xs font-semibold tracking-label uppercase text-gray-400 mb-6 block">
        Our Values
      </SafeSlideUp>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {values.map((item, i) => {
          const Icon = item.icon
          const offset = i % 2 === 1 ? "sm:mt-8" : ""

          return (
            <SafeReveal
              key={item.id}
              delay={0.15 + i * 0.1}
              viewportMargin="-50px"
              className={`group relative overflow-hidden rounded-2xl p-6 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ${offset}`}
            >
              <div className="relative z-10">
                <div className="w-9 h-9 rounded-lg bg-[#8ba4ff]/10 border border-[#8ba4ff]/20 flex items-center justify-center mb-4">
                  <Icon className="w-4.5 h-4.5 text-[#8ba4ff]" />
                </div>

                <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </SafeReveal>
          )
        })}
      </div>
    </div>
  )
}
