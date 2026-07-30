"use client"

import { motion } from "motion/react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { useFilters } from "./FilterContext"
import { categories } from "@/data/templates"
import {
  UtensilsCrossed,
  HeartPulse,
  GraduationCap,
  Building2,
  Briefcase,
  ShoppingCart,
  Sparkles,
  Home,
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap = {
  UtensilsCrossed,
  HeartPulse,
  GraduationCap,
  Building2,
  Briefcase,
  ShoppingCart,
  Sparkles,
  Home,
}

export function CategoriesShowcase() {
  const { filters, updateFilter } = useFilters()

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Categories"
          title={
            <>
              Explore Templates by
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                Industry
              </span>
            </>
          }
          description="Choose from our growing library of professionally designed templates, each tailored to your industry."
          align="center"
          maxWidth="640px"
        />

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon]
            const isActive = filters.industry === cat.id || filters.category === cat.id
            return (
              <motion.button
                key={cat.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => updateFilter("industry", isActive ? "all" : cat.id)}
                className={cn(
                  "group relative flex flex-col items-center justify-center gap-3 p-6 md:p-8 rounded-2xl transition-all duration-300",
                  "bg-white/[0.02] border border-white/[0.06]",
                  "hover:bg-white/[0.04] hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5",
                  isActive && "bg-accent/[0.04] border-accent/30 shadow-lg shadow-accent/10"
                )}
                aria-label={`Show ${cat.label} templates`}
                aria-pressed={isActive}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                  "bg-white/[0.04] border border-white/[0.08]",
                  "group-hover:bg-accent/10 group-hover:border-accent/20 group-hover:shadow-lg group-hover:shadow-accent/10",
                  isActive && "bg-accent/10 border-accent/20 shadow-lg shadow-accent/10"
                )}>
                  {Icon && <Icon className={cn(
                    "w-5 h-5 text-muted-foreground transition-colors duration-300",
                    "group-hover:text-accent",
                    isActive && "text-accent"
                  )} />}
                </div>
                <span className={cn(
                  "text-sm font-medium text-foreground transition-colors duration-300",
                  "group-hover:text-accent",
                  isActive && "text-accent"
                )}>
                  {cat.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
