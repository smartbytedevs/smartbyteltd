"use client"

import { motion } from "motion/react"
import { SafeSlideUp } from "@/components/common/SafeMotion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { categories, articles } from "@/data/blog"
import { cn } from "@/lib/utils"
import { Code2, Palette, TrendingUp, Search, Bot, Zap, Shield, Briefcase, Newspaper } from "lucide-react"

const iconMap = {
  Code2, Palette, TrendingUp, Search, Bot, Zap, Shield, Briefcase, Newspaper,
}

export function FeaturedCategories() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(43,33,24,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(43,33,24,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Categories"
          title="Explore By Topic"
          description="Browse our articles across a wide range of categories covering everything digital."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon]
            const count = articles.filter((a) => a.categories.includes(cat.id)).length
            return (
              <SafeSlideUp key={cat.id} delay={i * 0.04}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "group relative rounded-2xl p-5 text-center cursor-pointer transition-all duration-300",
                    "bg-white/30 border border-border/30",
                    "hover:bg-white/4555 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                  )}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent-secondary/10 border border-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:from-accent/20 group-hover:to-accent-secondary/20 transition-all duration-300">
                    {Icon && <Icon className="w-5 h-5 text-accent" />}
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">{cat.label}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{count} article{count !== 1 ? "s" : ""}</p>
                </motion.div>
              </SafeSlideUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
