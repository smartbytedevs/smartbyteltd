"use client"

import { motion } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { industries } from "@/data/services"
import { cn } from "@/lib/utils"
import {
  UtensilsCrossed, HeartPulse, GraduationCap, Building2,
  HardHat, Home, Scale, Sparkles, Plane, Briefcase, Factory, Rocket,
} from "lucide-react"

const iconMap = {
  UtensilsCrossed, HeartPulse, GraduationCap, Building2,
  HardHat, Home, Scale, Sparkles, Plane, Briefcase, Factory, Rocket,
}

export function IndustriesWeServe() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(28,25,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,25,23,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Industries"
          title="We Build For Every Industry"
          description="From restaurants to manufacturing, we deliver tailored solutions across 12+ industries."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {industries.map((industry, i) => {
            const Icon = iconMap[industry.icon]
            return (
              <SafeSlideUp key={industry.id} delay={i * 0.04}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "group relative rounded-2xl p-6 text-center cursor-pointer transition-all duration-300",
                    "bg-white/30 border border-border/30",
                    "hover:bg-white/55 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                  )}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent-secondary/10 border border-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:from-accent/20 group-hover:to-accent-secondary/20 transition-all duration-300">
                    {Icon && <Icon className="w-5 h-5 text-accent" />}
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">{industry.label}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-tight line-clamp-2">{industry.description}</p>
                </motion.div>
              </SafeSlideUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
