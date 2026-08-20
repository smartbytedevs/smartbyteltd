"use client"

import { motion } from "motion/react"
import { Calendar } from "lucide-react"
import { TemplateCarousel } from "./TemplateCarousel"
import { PremiumCTA } from "@/components/ui/PremiumCTA"
import { getFeaturedTemplates } from "@/lib/portfolio-data"

const templates = getFeaturedTemplates()

export function FeaturedTemplates() {
  return (
    <section
      id="featured-templates"
      className="relative py-[120px] sm:py-[160px] overflow-hidden bg-[#F7F7F8]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 lg:mb-16">
          {/* Left */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm font-semibold tracking-label uppercase text-[#8ba4ff] mb-5 block"
            >
              Ready to Launch
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-section-title font-bold text-gray-900"
            >
              Featured
              <br />
              Templates
            </motion.h2>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-[520px]"
            >
              <span className="text-gray-900 font-semibold">Beautiful websites. Ready today. Customized tomorrow.</span>
              <br />
              Choose from professionally crafted templates and launch your business in days instead of months.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6"
            >
              <PremiumCTA
                href="/templates"
                icon={Calendar}
                showArrow
                arrowMotion
              >
                Browse All Templates
              </PremiumCTA>
            </motion.div>
          </div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative pb-16"
        >
          <TemplateCarousel templates={templates} />
        </motion.div>
      </div>
    </section>
  )
}
